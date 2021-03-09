import { h, render, Component } from 'preact';
import $ from 'jquery';

export default class Datatable extends Component{
    constructor(props){
        super(props);
        this.fetchWeatherData();
    }

    fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=94.037689&appid=4b59a3b6865564fefacb549fcbce29e2";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
    }

    render(){
        //add button which stes hour boolean, if true then show hor table
        let weatherType = this.props.choice;
        if(weatherType==="wind"){
            return(
                <div>
                    <table>
                            <tr>
                                <td></td>
                                <th scope = "col">Day 1</th>
                                <th scope = "col">Day 2</th>
                                <th scope = "col">Day 3</th>
                                <th scope = "col">Day 4</th>
                                <th scope = "col">Day 5</th>
                                <th scope = "col">Day 6</th>
                                <th scope = "col">Day 7</th>
                            </tr>
                            <tr>
                                <th scope = "row">{weatherType}</th>
                                <td>jndid</td>
                                <td>{this.state.pressure}</td>
                            </tr>
                    </table>
                    
                </div>
            );
        }
        else if(weatherType==="temp"){
            return(
                <div>
                    <h1>temp table</h1>
                </div>
            );
        }
        else if(weatherType==="prec"){
            return(
                <div>
                    <h1>prec table</h1>
                </div>
            );
        }
    }
      
            
            
    
    
        parseResponse = (parsed_json) => {
        var press = parsed_json['daily']['4']['dt'];

        // set states for fields so they could be rendered later on
        this.setState({
            pressure : press
        });      
    }
}

//1615438800  1
//1615525200  2
//1615698000  4