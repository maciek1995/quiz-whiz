class GamePlay extends React.Component {
    render() {
        return (
            <section className="row">
                    <div className="col-xs-6">
                        <QuestionsPanel question={this.props.question}
                                        csrf={this.props.csrf}
                                        gameID={this.props.gameId}
                                        opponent={this.props.opponent}
                                        triggerAnswer={this.props.triggerAnswer}
                                        handleOptionChange={this.props.handleOptionChange}
                                        handleSubmit={this.props.handleSubmit}
                                        selectedOption={this.props.selectedOption}
                                        gameStarted={this.props.gameStarted}
                        />
                    </div>

                    <div className="col-xs-6">
                        <OpponentsProgress
                            opponent={this.props.opponent}
                            gameStarted={this.props.gameStarted}
                            currentQuestionIndex={this.props.currentQuestionIndex}
                        />
                    </div>
            </section>
        );
    }
}
