class QuestionsPanel extends React.Component {

    _renderQuestion(question, gameStarted) {
        if (question && gameStarted) {
            return (
                <fieldset>
                    <div className="row">
                        <div className="col-xs-12 questions-panel">
                            <p className="questions-panel__question">{question.text}</p>
                        </div>
                    </div>
                    <form className="questions-form" action="" method="post" onSubmit={this.props.handleSubmit}>
                        <input type='hidden' name='authenticity_token' value={this.props.csrf}/>
                        <div>
                            <label htmlFor="answerA">
                                <input type="radio" name="answer" value="a" id="answerA" hidden
                                       checked={this.props.selectedOption === "a"} onChange={this.props.handleOptionChange}/>
                                <span>{question.answers['a']}</span>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="answerB">
                                <input type="radio" name="answer" value="b" id="answerB" hidden
                                       checked={this.props.selectedOption === "b"} onChange={this.props.handleOptionChange}/>
                                <span>{question.answers['b']}</span>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="answerC">
                                <input type="radio" name="answer" value="c" id="answerC" hidden
                                       checked={this.props.selectedOption === "c"} onChange={this.props.handleOptionChange}/>
                                <span>{question.answers['c']}</span>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="answerD">
                                <input type="radio" name="answer" value="d" id="answerD" hidden
                                       checked={this.props.selectedOption === "d"} onChange={this.props.handleOptionChange}/>
                                <span>{question.answers['d']}</span>
                            </label>
                        </div>
                        <button type="submit" className="btn submit-button">Submit</button>
                    </form>
                </fieldset>
            );
        } else {
            return(
                <p></p>
            );

        }
    }



    render() {
        let {question, gameStarted} = this.props;
        return (
            <article>
                {this._renderQuestion(question, gameStarted)}
            </article>
        );
    }
}
