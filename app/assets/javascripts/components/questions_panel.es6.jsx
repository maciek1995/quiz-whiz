class QuestionsPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: null
        };

        this._handleOptionChange = this._handleOptionChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);

        console.log(props);
    }

    _renderQuestion(question) {
        if (question) {
            return (
                <fieldset>
                    <p>{question.text}</p>
                    <form action="" method="post" onSubmit={this._handleSubmit}>
                        <input type='hidden' name='authenticity_token' value={this.props.csrf}/>
                        <input type="radio" name="answer" value="a" id="answerA"
                               checked={this.state.selectedOption === "a"} onChange={this._handleOptionChange}/>
                        <label htmlFor="answerA">{question.answers['a']}</label><br/>
                        <input type="radio" name="answer" value="b" id="answerB"
                               checked={this.state.selectedOption === "b"} onChange={this._handleOptionChange}/>
                        <label htmlFor="answerB">{question.answers['b']}</label><br/>
                        <input type="radio" name="answer" value="c" id="answerC"
                               checked={this.state.selectedOption === "c"} onChange={this._handleOptionChange}/>
                        <label htmlFor="answerC">{question.answers['c']}</label><br/>
                        <input type="radio" name="answer" value="d" id="answerD"
                               checked={this.state.selectedOption === "d"} onChange={this._handleOptionChange}/>
                        <label htmlFor="answerD">{question.answers['d']}</label><br/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </fieldset>
            );
        } else {
            return <p>Waiting for game to be started</p>
        }
    }

    _handleOptionChange(event) {
        this.setState({
            selectedOption: event.target.value
        })
    }

    _handleSubmit(event) {
        event.preventDefault();
        let score = 0;
        console.log(this.state.selectedOption);
        console.log(this.props.question.correct_answer);
        if (this.state.selectedOption === this.props.question.correct_answer) {
            score += 10;
        }
        let csrf = this.props.csrf;
        let path = "http://localhost:3000/user_game/" + this.props.gameID;
        let self = this;

        $.ajax({
            method: "PUT",
            url: path,
            data: {
                authenticity_token: csrf,
                question_id: this.props.question.id,
                game_id: this.props.gameID,
                score: score
            }
        }).done(function () {
            self.props.triggerAnswer();
        });
    }

    render() {
        let {question} = this.props;
        return (
            <article>
                {this._renderQuestion(question)}
            </article>
        );
    }
}

