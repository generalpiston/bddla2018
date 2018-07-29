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
    /*
    Should return a web3 contract instance of the Lottery contract.
    */
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
    /*
    Retrieves the associated web3 account.
    Should return a promise that resolves to the active account.
    */
  }

  async start() {
    /*
    Starts the lottery. Should call the open function on the contract.
    */
  }

  async buy() {
    /*
    Buys a ticket. Should do the following:
    1. Generate a ticket number.
    2. Call the buy function on the contract with the number.
    */
  }

  async end() {
    /*
    Ends the lottery. Should do the following:
    1. Choosing a winning number.
    2. Call the end function on the contract with the winning number.
    */
  }

  async claim() {
    /*
    Should call the claim function on the contract.
    */
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
