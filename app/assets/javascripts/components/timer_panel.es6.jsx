class TimerPanel extends React.Component {
  render () {
    return (
        <div className="row game-play__timer-wrapper">
                <span className="game-play__timer-wrapper__timer" >{this.props.sec}</span>
        </div>
    );
  }
}

