class OnlineUsersList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            available_users: props.available_users
        };

        this.setupSubscription = this.setupSubscription.bind(this);
        this.updateUsersList = this.updateUsersList.bind(this);
        this.renderAvailableUsers = this.renderAvailableUsers.bind(this);
    }

    componentDidMount() {
        this.setupSubscription();
    }

    render () {
        return <div>
            {this.renderAvailableUsers()}
        </div>;
    }

    renderAvailableUsers() {
        return this.state.available_users.map((user, index) => {
            if(user.id !== this.props.currentUser.id){
                return(
                    <div key={user.id}>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                        <a href={`/games/invite?user_id=${user.id}`} data-method="post" className="btn btn-default">Invite</a>
                    </div>
                )
            }
        }).filter(n => n);
    }

    updateUsersList(data){
        let userIndex = this.state.available_users.findIndex((user) => {
            return user.id === data.id
        });
        if(data.id == this.props.currentUser.id){
            return;
        }else if((-1) !== userIndex){
            this.setState({
                available_users: this.state.available_users.filter((_, i) => i !== userIndex)
            })
        }else{
            this.setState({
                available_users: this.state.available_users.concat([data])
            })
        }
    }

    setupSubscription() {
        App.comments = App.cable.subscriptions.create(
            {
                channel: "AvailableUsersChannel"
            },
            {
                connected: function () {
                    setTimeout(() => this.perform('appear', {}), 1000);
                },
                received: function(data) {
                    this.updateUsersList(data);
                },
                disconnected: function () {
                    this.perform('uninstall', {})
                },
                updateUsersList: this.updateUsersList
            }
        );
    }
}
