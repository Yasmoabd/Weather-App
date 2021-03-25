import { h, render, Component } from 'preact';

export default class Title extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let contextHeader = this.props.context;
        return(
            <div>
                <h3>{contextHeader}</h3>
            </div>
        );
        
    }
}
