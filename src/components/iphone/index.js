// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import Datatable from './datatable';
import Title from './title';




export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ homeDisplay: true });
		this.state.contextHeader = "Mountain Weather App";
		this.state.selection = ""; 
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=4b59a3b6865564fefacb549fcbce29e2";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ homeDisplay: false });
	}
	
	ShowWindData = () => {
		this.setState({ homeDisplay: false });
		this.setState({contextHeader: "Wind data"});
		this.setState({selection: "wind"});
	}
	ShowPrecipitationData = () => {
		this.setState({ homeDisplay: false });
		this.setState({contextHeader: "Precipitation data"});
		this.setState({selection: "prec"});
	}
	ShowTemperatureData = () => {
		this.setState({ homeDisplay: false });
		this.setState({contextHeader: "Temperature data"});
		this.setState({selection: "temp"});
	}

	ShowHome = () => {
		this.setState({ homeDisplay: true });
		this.setState({contextHeader : "Mountain Weather App"});
		this.setstate({temp : ""});
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			<div class={ style.container }>
				<Title context={this.state.contextHeader}/>
				<div>
					{this.state.homeDisplay ?
					<ul>
						<li><Button class={ style_iphone.button } clickFunction={ this.ShowWindData } message={"Wind"} /></li>
						<li><Button class={ style_iphone.button } clickFunction={ this.ShowPrecipitationData } message={"Precipitation"} /></li>
						<li><Button class={ style_iphone.button } clickFunction={ this.ShowTemperatureData } message={"Temperature"} /></li>
					</ul>
					 : <Datatable/>}
				</div>
				<div class={ style_iphone.hcontainer}>
					{ this.state.homeDisplay ? null : <Button class={ style_iphone.button } clickFunction={ this.ShowHome } message={"Home"}/ >  }
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions
		});      
	}
}



