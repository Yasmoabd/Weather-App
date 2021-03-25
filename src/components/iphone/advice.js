// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import this.state.warning from './datatable'
// import the Button component
import Button from '../button';
import Datatable from './datatable';
import Title from './title';

export default class Advice extends Component{
    constructor(props){
        super(props);
        this.fetchWeatherData();
        this.state.selection = "";
    }

    fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=94.037689&units=metric&appid=652b23ab286647a7c9903391a74b4989";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
        // this.setState({ homeDisplay: false });
    }
    // var weatherType = this.props.choice
    windAdvice = () => {
        if (weatherType == "wind") {
            <div>
                <h1>Weather Advice for Strong Winds</h1>
                <h2>There are strong winds on {this.state.warning}</h2>
            </div>
        }
    }

    precAdvice = () => {
        if (weatherType == "prec"){
            <div>
            <h1>Weather Advice for Low Visibility</h1>
            <h2>There is low visibility on {this.state.warning}</h2>
        </div>
        }
    }

    tempAdvice = () => {
        if (weatherType == "temp"){
            <div>
            <h1>Weather Advice for Strong Winds</h1>
            <h2>The temperature is high on {this.state.warning}</h2>
        </div>
        }
    }
    render(){
        var warning = this.props.warning;
        var choice = this.props.choice;
        return(
            <div><h1>Advice page</h1>
            <p>{warning}</p>
            <p>{choice}</p>
            </div>
            
        );
    }
}