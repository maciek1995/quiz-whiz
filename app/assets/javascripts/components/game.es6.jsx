class Game extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            game: props.game,
            current_user: props.current_user,
            questions: props.questions
        };

        this.updateGame = this.updateGame.bind(this)
    }

    componentDidMount() {
        this.setupSubscription();
    }

    render () {
        return (
            <div>

            </div>
        )
    }

    updateGame(data){
        console.log(JSON.parse(data));
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
                received: function(data) {
                    this.updateGame(data);
    },
                updateGame: this.updateGame
            }

        );
    }
}
