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
import Settings from './settings';




export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		let lat = this.props.lat;
		let lon = this.props.lon;
		this.setState({ lat: lat});
		this.setState({ lon: lon});
		this.fetchWeatherData();
		this.state.temp = "";
		this.setState({ homeDisplay: true });
		this.setState({ settings: false });
		this.state.contextHeader = "Mountain Weather App";
		this.state.selection = ""; 
		this.setState({iconLinkDaily:["null","null","null","null","null","null","null"]});
		this.setState({dtemparr:["null","null","null","null","null","null","null"]});
		this.setState({dayArray:["null","null","null","null","null","null","null"]});
		this.handleDropdownChange = this.handleDropdownChange.bind(this);
		this.setState({selectedDay:0});
	}
  
	//gets the date selected from dropdown and find it in the date array in order to get the correct index
	handleDropdownChange(e) {
	  this.setState({ selectValue: e.target.value });
	  var i;
	  for(i=0;i<7;i++){
		  var stringDate = String(this.state.dayArray[i]);
		  if(stringDate===this.state.selectValue){
			  this.setState({selectedDay: i});
		  }
	  }
	  this.fetchWeatherData();
	}
	

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/onecall?lat="+this.state.lat+"&lon="+this.state.lon+"&units=metric&appid=652b23ab286647a7c9903391a74b4989";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
	}
	
	//following methods set the selection and change the header as well as setting home to false so other components can be rendered
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

	ShowSosData = () => {
		this.setState({selection: "sos"});
		this.setState({ homeDisplay: false });
		this.setState({contextHeader: "SOS"});
	}

	ShowSettings = () =>{
		this.setState({settings : true});
	}

	//returns a drop down with following seven days inside
	DaySelector = () => {
		var i;
		let myarr = [];
		for(i=0;i<7;i++){
			myarr.push(String(this.state.dayArray[i]));
		}
		return(
			<div>
				<select onChange={this.handleDropdownChange}>
					<option>{myarr[0]}</option>
					<option>{myarr[1]}</option>
					<option>{myarr[2]}</option>
					<option>{myarr[3]}</option>
					<option>{myarr[4]}</option>
					<option>{myarr[5]}</option>
					<option>{myarr[6]}</option>
				</select>
			</div>
		);
	}
	//returns the correct location depending on the latitude and lon
	getLocationHeader = () =>{
		console.log(this.state.lat)
		if(this.state.lat==57.0607){
			return ("Cairngorms, Scotland");
		}
		else if(this.state.lat==54.7028){
			return ("Pennines, England");
		}
		else if(this.state.lat==54.1533){
			return ("Mourne Mountains, Northern Ireland");
		}
		else{
			return("Snowdonia, Wales");
		}
	}

	// the main render method for the iphone component
	render() {

		if(this.state.settings){
			return(
				<div><Settings/></div>
			);
		}
		else{
		var icon = "http://openweathermap.org/img/wn/" + this.state.iconcode + "@2x.png";
		let DaySelector = this.DaySelector();
		let locationHeader = this.getLocationHeader();
		// add button conatiner
		return (
			<div class={ style.container }>
				<div class={style.iconbuttonSettings}><button onClick={ this.ShowSettings }><img src='../../assets/icons/settings.png'/></button></div>
				<div class={style.locationHeader}>{this.state.homeDisplay ?locationHeader: null}</div>
				<div>{this.state.homeDisplay ? DaySelector : null}</div>
				<div>{this.state.homeDisplay ? 
				<table class={style.homeT}>
					<tr>
						<td rowSpan="2"><img src={icon}/></td>
						<td>Visibility:</td>
						<td>Temp:</td>
					</tr>
					<tr>
						<td>{this.state.vis}%</td>
						<td>{this.state.temp}</td>
					</tr>
				</table> : <Title context={this.state.contextHeader}/>}
				</div>
				
				<div class = {style_iphone.container}>
					{this.state.homeDisplay ?
					<table class={style.buttontable}>
						<tr><td><Button clickFunction={ this.ShowWindData } message={"Wind"} /></td></tr>
						<tr><td><Button clickFunction={ this.ShowPrecipitationData } message={"Precipitation"} /></td></tr>
						<tr><td><Button clickFunction={ this.ShowTemperatureData } message={"Temperature"} /></td></tr>
						<tr><td><button class={style.iconbutton} onClick={ this.ShowSosData }><img src='../../assets/icons/emergency-call.png'/></button></td></tr>
					</table>
					 : <Datatable choice={this.state.selection} lat={this.state.lat} lon={this.state.lon}/> }
				</div>
				<div>
					{ this.state.homeDisplay ? 
					null : <button class={style.iconbutton} onClick={ this.ShowHome }><img src='../../assets/icons/home.png'/></button>}
				</div>
			</div>
		);
					}
	}

	parseResponse = (parsed_json) => {
    	var icon;
		var visibilty;
		var temparr = [];
		var dayarr = [];
		var selectedTemp;

		icon = parsed_json['daily'][this.state.selectedDay]['weather']['0']['icon'];
		visibilty = parsed_json['daily'][this.state.selectedDay]['clouds'];
		selectedTemp = parsed_json['daily'][this.state.selectedDay]['temp']['day'];
		var iconlinkarr = [];

		for(let i = 0;i<7;i++){
			var code = parsed_json['daily'][i]['weather']['0']['icon'];
			iconlinkarr.push("http://openweathermap.org/img/wn/"+code+"@2x.png");
			temparr.push(parsed_json['daily'][i]['temp']['day']);
			var date = new Date(parsed_json['daily'][i]['dt'] * 1000);
			dayarr.push(date);
		}


        this.setState({
            iconcode : icon,
			vis : visibilty,
			iconLinkDaily : iconlinkarr,
			dtemparr : temparr,
			dayArray : dayarr,
			temp : selectedTemp
        });    
    }
}



