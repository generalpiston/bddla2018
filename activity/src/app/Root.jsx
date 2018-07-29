import * as React from 'react';
import Web3 from 'web3';

import LotteryNotStarted from './LotteryNotStarted';
import LotteryOpen from './LotteryOpen';
import LotteryFinished from './LotteryFinished';
import LotteryClosed from './LotteryClosed';
import LoginWithMetamask from './LoginWithMetamask';

import ABI from './ABI';

const STATUS = ['NOT_STARTED', 'OPEN', 'ENDED', 'CLOSED'];

export default class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      status: STATUS[1],
      won: false,
      owner: false,
      web3: null
    };

    this.timer = setInterval(() => this.interval(), 1000);
  }

  render() {
    if (!this.state.loggedIn) {
      return <LoginWithMetamask />;
    }

    if (this.state.status === 'CLOSED') {
      return <LotteryClosed />;
    }

    if (this.state.status === 'NOT_STARTED') {
      return (
        <LotteryNotStarted
          owner={this.state.owner}
          start={() => this.start()}
        />
      );
    }

    if (this.state.status === 'ENDED') {
      return (
        <LotteryFinished
          owner={this.state.owner}
          won={this.state.won}
          claim={() => this.claim()}
        />
      );
    }

    return (
      <LotteryOpen
        owner={this.state.owner}
        buy={() => this.buy()}
        end={() => this.end()}
      />
    );
  }

  getWeb3() {
    return new Web3(window.web3.currentProvider);
  }

  getContract(account) {
    const web3 = this.getWeb3();
    return new web3.eth.Contract(
      ABI,
      '0x560bf30dd75092871cc25568c3bb28c03b77a990',
      {
        from: account
      }
    );
  }

  async getStatus() {
    const account = await this.getAccount();
    const contract = this.getContract(account);
    const status = await contract.methods.status().call();
    console.debug(status, typeof status, STATUS[status]);
    return STATUS[status];
  }

  async getOwner() {
    const account = await this.getAccount();
    const contract = this.getContract(account);
    return await contract.methods.owner().call();
  }

  async getWinner() {
    const account = await this.getAccount();
    const contract = this.getContract(account);
    const winningTicket = await contract.methods.winner().call();
    return await contract.methods.tickets(winningTicket).call();
  }

  async getAccount() {
    const web3 = this.getWeb3();
    return new Promise((resolve, reject) => {
      return web3.eth.getAccounts((err, accounts) => {
        if (err || accounts.length === 0) {
          return reject(err || new Error('No accounts'));
        }
        return resolve(accounts[0]);
      });
    });
  }

  async start() {
    const contract = this.getContract();
    const account = await this.getAccount();
    return contract.methods.open().send({ from: account });
  }

  async buy() {
    const contract = this.getContract();
    const account = await this.getAccount();
    const ticket = Math.random() * 100000;
    await contract.methods
      .buy(ticket)
      .send({ from: account, value: 1000000000000000 });
    return ticket;
  }

  async end() {
    const contract = this.getContract();
    const account = await this.getAccount();
    const ticket = Math.random() * 100000;
    const length = await contract.methods.ticketsBought().call();
    const winning = Math.floor(Math.random() * length);
    const winningNumber = await contract.methods.numbers(winning).call();
    await contract.methods.end(winningNumber).send({ from: account });
    return ticket;
  }

  async claim() {
    const contract = this.getContract();
    const account = await this.getAccount();
    return await contract.methods.claim().send({ from: account });
  }

  async won() {
    const winner = await this.getWinner();
    const account = await this.getAccount();
    return account.toLowerCase() == winner.toLowerCase();
  }

  async owner() {
    const owner = await this.getOwner();
    const account = await this.getAccount();
    return account.toLowerCase() === owner.toLowerCase();
  }

  async interval() {
    const metamaskEnabled = window.web3 !== null && window.web3 !== undefined;

    if (metamaskEnabled) {
      try {
        const status = await this.getStatus();

        this.setState({
          loggedIn: true,
          status: status,
          won: await this.won(),
          owner: await this.owner()
        });
      } catch (err) {
        this.setState({
          loggedIn: false,
          won: false,
          owner: false
        });
      }
    } else {
      this.setState({
        loggedIn: false,
        won: false,
        owner: false
      });
    }
  }
}
