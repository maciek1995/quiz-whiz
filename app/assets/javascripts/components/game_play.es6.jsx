class GamePlay extends React.Component {
    render() {
        return (
            <section className="row">
                <p>{this.props.sec}</p>
                <div className="col-xs-6" style={{paddingRight: 0, paddingLeft: 0}}>
                    <QuestionsPanel />
                </div>

                <div className="col-xs-6" style={{paddingRight: 0, paddingLeft: 0}}>
                    <OpponentsProgress opponent={this.props.currentUser}/>
                </div>
            </section>
        );
    }
}

