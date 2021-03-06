import React from "react";

export default class Example1 extends React.Component {
    state = {
        count: 0,
    };

    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={this.click}>Click me</button>
            </div>
        );
    }

    click = () => {
        this.setState({ count: this.state.count + 1 });
    };
}
