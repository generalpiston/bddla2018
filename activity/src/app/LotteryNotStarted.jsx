import * as React from 'react';

export default class LotteryNotStarted extends React.Component {
  render() {
    if (this.props.owner) {
      return (
        <div className="text-center">
          <button onClick={() => this.start()} type="button">
            Click Me To Start
          </button>
        </div>
      );
    } else {
      return <div className="text-center">Lottery has not started yet</div>;
    }
  }

  async start() {
    await this.props.start();
    window.location.reload();
  }
}
