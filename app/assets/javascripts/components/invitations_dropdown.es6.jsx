class InvitationsDropdown extends React.Component {

    constructor(props) {
        super(props);
    }

    _renderInvitations(invitations) {
        return invitations.map((invitation, index)=>{
            return (
                <div key={index}>
                    <p>{invitation.user.username}</p>
                    <a href={`/games/${invitation.game_id}/accept_invitation`} data-method="post" className="btn btn-default">Accept Invitation</a>
                    <a href={`/games/${invitation.game_id}/decline_invitation`} data-method="post" className="btn btn-default">Decline Invitation</a>
                </div>
            )
        });
    }

    render () {
        let {invitatons} = this.props;
        let invitationsList = this._renderInvitations(this.props.invitations);

        return (
            <ul>
                {invitationsList}
            </ul>
        );
    }
}
