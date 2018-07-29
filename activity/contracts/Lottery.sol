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
    /*
      Should set the status of the contract to Open.
    */
  }

  function buy(uint num) public notOwner isOpen payable {
    /*
      Should do the following:
      1. Make sure the number fits within a uint.
      2. Make sure the number is not taken.
      3. Make sure the bet size is appropriate.
      4. Add the number to the list of available numbers.
      5. Mark the number as taken.
      6. Increase the number of tickets bought.
      7. Increase the total amount the contract is holding in value.
    */
  }

  function end(uint num) public onlyOwner isOpen {
    /*
      Should do the following:
      1. Make sure the number was actually taken.
      2. Set the winning number
      3. Set the status to End.
    */
  }

  function claim() public onlyWinner isEnded {
    /*
      Should do the following:
      1. Transfer the contract amount to the sender.
      2. Set the status to Closed.
    */
  }
}