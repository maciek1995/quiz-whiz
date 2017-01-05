class Game extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            game: JSON.parse(props.game)
        };
        this.updateGame = this.updateGame.bind(this)
    }

    componentDidMount() {
        this.setupSubscription();
    }

    render () {
        console.log(this.state)

        return (
            <div>
                {this.state.game.name}
                <div>
                    {"me: " + this.state.game.current_user.email}
                </div>
                <div>
                    {this.state.game.opponent ? this.state.game.opponent.email : ""}
                </div>
                <div>
                    {this.state.game.questions[0].text}<br/>
                    {"a: " + this.state.game.questions[0].answers.a}<br/>
                    {"b: " + this.state.game.questions[0].answers.b}<br/>
                    {"c: " + this.state.game.questions[0].answers.c}<br/>
                    {"d: " + this.state.game.questions[0].answers.d}<br/>
                </div>
            </div>
        )
    }

    updateGame(game){
        console.log(JSON.parse(game));
        this.setState({game: JSON.parse(game)})
    }

    setupSubscription() {
        App.comments = App.cable.subscriptions.create({
            channel: "GamesChannel",
            game_id: this.state.game.id
        },
            {
                current_user: this.state.game.current_user,
                game_id: this.state.game.id,
                connected: function() {
                    setTimeout(() => this.perform('appear',
                        {
                            game_id: this.game_id,
                            user: this.current_user
                        }
                    ), 1000);
                },
                received: function(game) {
                    console.log("asdfdsa");
                    this.updateGame(game);
                },
                updateGame: this.updateGame
            }

        );
    }
}
