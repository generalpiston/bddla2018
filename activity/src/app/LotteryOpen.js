import * as React from 'react';

export default class LotteryOpen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticket: null
    };
  }

  render() {
    if (this.props.owner) {
      return (
        <div className="text-center">
          <button onClick={() => this.end()} type="button">
            Click Me To End The Lottery
          </button>
        </div>
      );
    } else if (this.state.ticket) {
      return <div className="text-center">{this.state.ticket}</div>;
    } else {
      return (
        <div className="text-center">
          <button onClick={() => this.buy()} type="button">
            Click Me To Buy
          </button>
        </div>
      );
    }
  }

  async buy() {
    const ticket = await this.props.buy();
    this.setState({ ticket });
  }

  async end() {
    const ticket = await this.props.end();
    window.location.reload();
  }
}
