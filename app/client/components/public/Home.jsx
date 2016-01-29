C.Home = React.createClass({
    render() {
        return (
            <div id="main">
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="text-center">VoteApp</h1>
                        <p className="text-center">A reactive voting app that makes all the difference</p>
                    </div>
                </div>
                <C.DemoChart />
            </div>
        )
    }
});