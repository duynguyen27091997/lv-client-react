import React, {Component} from 'react';
import Variables from "./Variables";

class Tool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            total :1
        }
    }
    handleCreateNewVal(){
        this.setState({
            total :this.state.total + 1
        })
    }
    render() {
        let list = [];
        for (let i=1;i<=this.state.total;i++)
            list.push(<Variables createNew={_=>this.handleCreateNewVal()} key={i}/>);
        return (
            <div>
                <h5>NHÁP</h5>
                {list}
            </div>
        );
    }
}

export default Tool;