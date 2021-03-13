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
		this.setState({iconLinkDaily:["null","null","null","null","null","null","null"]});
		
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
		
		// add button conatiner
		return (
			<div class={ style.container }>
				<div>{this.state.homeDisplay ? 
				<table class={style.homeT}>
					<tr>
						<td rowSpan="2"><img src={icon}/></td>
						<td>Visibility:</td>
					</tr>
					<tr>
						<td>{this.state.vis}%</td>
					</tr>
				</table> : <Title context={this.state.contextHeader}/>}
				</div>
				
				<div class = {style_iphone.container}>
					{this.state.homeDisplay ?
					<table class={style.buttontable}>
						<tr><td><Button clickFunction={ this.ShowWindData } message={"Wind"} /></td></tr>
						<tr><td><Button clickFunction={ this.ShowPrecipitationData } message={"Precipitation"} /></td></tr>
						<tr><td><Button clickFunction={ this.ShowTemperatureData } message={"Temperature"} /></td></tr>
					</table>
					 : <Datatable choice={this.state.selection}/> }
				</div>
				<div>
					{ this.state.homeDisplay ? 
					<table class={style.iconTable}>
						<tr>
							<td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td><td>Sun</td>
						</tr>
						<tr>
							<td><img src={this.state.iconLinkDaily[0]}/></td>
							<td><img src={this.state.iconLinkDaily[1]}/></td>
							<td><img src={this.state.iconLinkDaily[2]}/></td>
							<td><img src={this.state.iconLinkDaily[3]}/></td>
							<td><img src={this.state.iconLinkDaily[4]}/></td>
							<td><img src={this.state.iconLinkDaily[5]}/></td>
							<td><img src={this.state.iconLinkDaily[6]}/></td>
						</tr>
					</table> : <Button class={ style_iphone.button } clickFunction={ this.ShowHome } message={"Home"}/ >  }
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
    	var icon;
		var visibilty;
		
		icon = parsed_json['daily']['0']['weather']['0']['icon'];
		visibilty = parsed_json['daily']['0']['clouds'];
		var iconlinkarr = [];

		for(let i = 0;i<7;i++){
			var code = parsed_json['daily'][i]['weather']['0']['icon'];
			iconlinkarr.push("http://openweathermap.org/img/wn/"+code+"@2x.png");
		}


        this.setState({
            iconcode : icon,
			vis : visibilty,
			iconLinkDaily : iconlinkarr
        });      
    }
}



