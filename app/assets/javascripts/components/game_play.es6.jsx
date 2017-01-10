class GamePlay extends React.Component {
    render() {
        return (
            <section className="row">
                <p>{this.props.sec}</p>
                <div className="col-xs-6" style={{paddingRight: 0, paddingLeft: 0}}>
                    <QuestionsPanel question={this.props.question}
                                    csrf={this.props.csrf}
                                    gameID={this.props.gameId}
                                    opponent={this.props.opponent}
                                    triggerAnswer={this.props.triggerAnswer}
                    />
                </div>

                <div className="col-xs-6" style={{paddingRight: 0, paddingLeft: 0}}>
                    <OpponentsProgress opponent={this.props.opponent}/>
                </div>
            </section>
        );
    }
}

