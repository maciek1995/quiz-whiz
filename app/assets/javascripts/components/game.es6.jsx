class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game: props.game,
            currentUser: props.currentUser,
            opponent: null,
            // currentQuestionIndex: null,
            answered: false,
            seconds: 10,
            gameStarted: false,
            selectedOption: null
        };

        this.updateGame = this.updateGame.bind(this);
        this.shouldStartGame = this.shouldStartGame.bind(this);
        this.shouldTriggerNextQuestion = this.shouldTriggerNextQuestion.bind(this);
        this.triggerNextQuestion = this.triggerNextQuestion.bind(this);
        this.triggerAnswer = this.triggerAnswer.bind(this);
        this.checkIfTimeFinished = this.checkIfTimeFinished.bind(this);

        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.gameFinished = this.gameFinished.bind(this);
    }

    componentDidMount() {
        this.setupSubscription();
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div className="container">

                <form role='form' action={"/games/" + this.state.game.id + "/abort"} method="post">
                    <input type='hidden' name='authenticity_token' value={this.props.authenticity_token}/>
                    <button type="submit" className="btn btn-danger" onClick={this._abort}>Abort</button>
                </form>
                <ProfilesBoard currentUser={this.state.currentUser} opponent={this.state.opponent}/>
                <GamePlay currentUser={this.state.currentUser}
                          opponent={this.state.opponent}
                          question={this.props.questions[this.state.game.current_question_index]}
                          sec={this.state.seconds}
                          csrf={this.props.authenticity_token}
                          gameId={this.state.game.id}
                          gameStarted={this.state.gameStarted}
                          triggerAnswer={this.triggerAnswer}
                          handleOptionChange={this.handleOptionChange}
                          handleSubmit={this.handleSubmit}
                          selectedOption={this.state.selectedOption}
                />
                { this.state.game.status === 'aborted' &&
                <AbortedModal/>
                }
                { this.state.game.status === 'finished' &&
                <AbortedModal/>
                }
            </div>
        )
    }

    updateGame(data) {
      console.log(data);
        data = JSON.parse(data);
        let oldIndex = this.state.game.current_question_index
        this.gameFinished(data.game_status)
        let newGame = Object.assign({}, this.state.game, {status: data.game_status, current_question_index: data.current_question_index});
        let opponent = data.users.find((user)=> {
            return user.id !== this.state.currentUser.id;
        });

        this.setState({
            game: newGame,
            opponent: opponent
        }, function () {
            this.shouldStartGame();
            this.shouldTriggerNextQuestion(oldIndex);
        });

    }

    gameFinished(newStatus){
      if(this.state.game.status == 'current' && newStatus != 'current'){
        console.log('finished');
        clearInterval(this.interval)
      }
    }

    setupSubscription() {
        App.comments = App.cable.subscriptions.create({
                channel: "GamesChannel",
                game_id: this.state.game.id
            },
            {
                currentUser: this.state.game.currentUser,
                game_id: this.state.game.id,
                connected: function () {
                    setTimeout(() => this.perform('appear',
                        {
                            game_id: this.game_id,
                            user: this.currentUser
                        }
                    ), 1000);
                },
                received: function (data) {
                    this.updateGame(data);
                },
                disconnected: function () {
                    this.perform('uninstall',
                        {
                            game_id: this.game_id,
                        }
                    )
                },
                updateGame: this.updateGame
            }
        );
    }

    shouldStartGame() {
        if (!this.state.gameStarted && this.state.game.status == "current") {
            this.setState({gameStarted: true},
                ()=> {
                    this.interval = setInterval(function () {
                        this.setState({seconds: this.state.seconds - 1}, () => this.checkIfTimeFinished())

                    }.bind(this), 1000);
                }
            )
        }
    }

    shouldTriggerNextQuestion(oldIndex) {
      if (this.state.game.status !== 'current') return;
      if (this.state.game.current_question_index != oldIndex){
        this.triggerNextQuestion();
      }

        // let opponent_answer = this.state.opponent.answer;
        // if (opponent_answer && opponent_answer.question_id === this.props.questions[this.state.game.current_question_index].id && this.state.answered) {
        //     if (this.state.game.current_question_index === this.props.questions.length - 1) {
        //         this._finishGame();
        //     } else {
        //         this.triggerNextQuestion();
        //     }
        // }
    }

    _finishGame() {
        var url = '/games/' + this.state.game.id + '/finish';

        $.ajax({
            method: "POST",
            url: url,
        });
    }

    triggerAnswer() {
        this.setState({
            answered: true
        });
    }

    triggerNextQuestion() {
        this.setState({seconds: 10, answered: false, selectedOption: null});
        // this.setState({currentQuestionIndex: this.state.currentQuestionIndex + 1, seconds: 10, answered: false, selectedOption: null});
    }

    checkIfTimeFinished() {
        if (this.state.seconds == 0 && this.state.game.status == "current") {
            let authenticity_token = this.props.authenticity_token;
            let question_index = this.state.game.current_question_index;
            let game_id = this.state.game.id;
            let self = this;
            let path = "http://localhost:3000/user_game/" + game_id;

            let score = 0;
            console.log(this.state.selectedOption);
            console.log(this.props.questions[this.state.game.current_question_index].correct_answer);
            if (!this.state.answered && this.state.selectedOption === this.props.questions[this.state.game.current_question_index].correct_answer) {
                score += 10;
            }
            $.ajax({
              method: "PUT",
              url: path,
              data: {
                authenticity_token: authenticity_token,
                question_index: question_index,
                game_id: game_id,
                score: score
              }
            }).done(function () {
                self.triggerAnswer()
            })
        }
    }


    handleOptionChange(event) {
        this.setState({
            selectedOption: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        if(!this.state.answered && this.state.seconds > 0){
          let score = 0;
          console.log(this.state.selectedOption);
          console.log(this.props.questions[this.state.game.current_question_index].correct_answer);
          if (this.state.selectedOption === this.props.questions[this.state.game.current_question_index].correct_answer) {
              score += 10;
          }
          let csrf = this.props.authenticity_token;
          let path = "http://localhost:3000/user_game/" + this.props.gameID;
          let self = this;

          $.ajax({
              method: "PUT",
              url: path,
              data: {
                  authenticity_token: csrf,
                  question_index: this.state.game.current_question_index,
                  game_id: this.state.game.id,
                  score: score
              }
          }).done(function () {
              self.triggerAnswer()
          });
        }
    }
}
