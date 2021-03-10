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
		this.fetchWeatherData();
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ homeDisplay: true });
		this.state.contextHeader = "Mountain Weather App";
		this.state.selection = ""; 
		this.setState({ iconnode: "" });
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=94.037689&appid=652b23ab286647a7c9903391a74b4989";
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
		this.setState({selection: "wind"});
		this.setState({ homeDisplay: false });
		this.setState({contextHeader: "Wind data"});

	}
	ShowPrecipitationData = () => {
		this.setState({selection: "prec"});
		this.setState({ homeDisplay: false });
		this.setState({contextHeader: "Precipitation data"});
	}
	ShowTemperatureData = () => {
		this.setState({selection: "temp"});
		this.setState({ homeDisplay: false });
		this.setState({contextHeader: "Temperature data"});
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
		var icon = "http://openweathermap.org/img/wn/" + this.state.iconcode + "@2x.png";
		
		// display all weather data
		// add tabel where image spand tw rows and have td of visibilty level
		// add button conatiner
		return (
			<div class={ style.container }>
				<Title context={this.state.contextHeader}/>
				<div>{this.state.homeDisplay ? <img src={icon}/> : null}</div> 
	
				<div class = {style_iphone.container}>
					{this.state.homeDisplay ?
					<ul class={style.buttonlist}>
						<li><Button class={ style_iphone.mbutton } clickFunction={ this.ShowWindData } message={"Wind"} /></li>
						<li><Button class={ style_iphone.mbutton } clickFunction={ this.ShowPrecipitationData } message={"Precipitation"} /></li>
						<li><Button class={ style_iphone.mbutton } clickFunction={ this.ShowTemperatureData } message={"Temperature"} /></li>
					</ul>
					 : <Datatable choice={this.state.selection}/> }
				</div>
				<div class={ style_iphone.hcontainer}>
					{ this.state.homeDisplay ? null : <Button class={ style_iphone.button } clickFunction={ this.ShowHome } message={"Home"}/ >  }
				</div>
			</div>
		);
	}

parseResponse = (parsed_json) => {
        var icon;
		icon = parsed_json['daily']['0']['weather']['0']['icon']
        
		console.log(icon)
        // set states for fields so they could be rendered later on
        this.setState({
            iconcode : icon
        });      
    }
}



