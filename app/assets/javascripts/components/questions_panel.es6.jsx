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
                    <form action="" method="post" onSubmit={this.props.handleSubmit}>
                        <input type='hidden' name='authenticity_token' value={this.props.csrf}/>
                        <input type="radio" name="answer" value="a" id="answerA"
                               checked={this.props.selectedOption === "a"} onChange={this.props.handleOptionChange}/>
                        <label htmlFor="answerA">a) {question.answers['a']}</label><br/>
                        <input type="radio" name="answer" value="b" id="answerB"
                               checked={this.props.selectedOption === "b"} onChange={this.props.handleOptionChange}/>
                        <label htmlFor="answerB">b) {question.answers['b']}</label><br/>
                        <input type="radio" name="answer" value="c" id="answerC"
                               checked={this.props.selectedOption === "c"} onChange={this.props.handleOptionChange}/>
                        <label htmlFor="answerC">c) {question.answers['c']}</label><br/>
                        <input type="radio" name="answer" value="d" id="answerD"
                               checked={this.props.selectedOption === "d"} onChange={this.props.handleOptionChange}/>
                        <label htmlFor="answerD">d) {question.answers['d']}</label><br/>
                        <br/>
                        <button type="submit" className="btn btn-primary">Submit</button>
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
