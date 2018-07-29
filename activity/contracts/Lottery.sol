pragma solidity ^0.4.24;

contract Lottery {
  enum Status { NotStarted, Open, Ended, Closed }

  Status public status;
  address public owner;
  uint public winner;
  mapping(uint => address) public tickets;
  uint[] public numbers;
  uint256 public ticketsBought;
  uint256 public amount;

  uint betSize = 1000000000000000; // 0.001 ETH

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  modifier notOwner() {
    require(msg.sender != owner);
    _;
  }

  modifier onlyWinner() {
    require(msg.sender == tickets[winner]);
    _;
  }

  modifier isNotStarted() {
    require(status == Status.NotStarted);
    _;
  }

  modifier isOpen() {
    require(status == Status.Open);
    _;
  }

  modifier isEnded() {
    require(status == Status.Ended);
    _;
  }

  constructor() public {
    owner = msg.sender;
    status = Status.NotStarted;
  }

  function open() public onlyOwner isNotStarted {
    status = Status.Open;
  }

  function buy(uint num) public notOwner isOpen payable {
    require(num >= 0 && num < 100000);
    require(tickets[num] == address(0));
    require(msg.value == betSize);
    numbers.push(num);
    ticketsBought += 1;
    tickets[num] = msg.sender;
    amount += msg.value;
  }

  function end(uint num) public onlyOwner isOpen {
    require(tickets[num] != address(0));
    winner = num;
    status = Status.Ended;
  }

  function claim() public onlyWinner isEnded {
    msg.sender.transfer(amount);
    status = Status.Closed;
  }
}