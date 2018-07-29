import * as React from 'react';

export default class FinishLottery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      claimed: false
    };
  }

  render() {
    if (this.props.owner) {
      return <div className="text-center">The lottery has finished.</div>;
    } else if (this.props.won) {
      return (
        <div className="text-center">
          <button onClick={() => this.claim()} type="button">
            Click Here To Claim Your Prize
          </button>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          The lottery has finished. You did not win.
        </div>
      );
    }
  }

  async claim() {
    await this.props.claim();
    this.setState({ claimed: true });
  }
}
