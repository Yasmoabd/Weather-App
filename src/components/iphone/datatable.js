import { h, render, Component } from 'preact';


export default class Datatable extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let weatherType = this.props.selection;
        return(
            <div>
                <table>
						<tr>
							<td></td>
							<th scope = "col">Wind speed</th>
							<th scope = "col">Wind Strength</th>
						</tr>
						<tr>
							<th scope = "row">09:00 - 11:00</th>
							<td>7.5</td>
							<td>4.5</td>
						</tr>
			    </table>
            </div>
        );
    }
}