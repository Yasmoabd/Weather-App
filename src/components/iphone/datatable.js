import { h, render, Component } from 'preact';
import $ from 'jquery';
import style from './style';
import Button from '../button';

export default class Datatable extends Component{
    constructor(props){
        super(props);
        this.fetchWeatherData();
        this.setState({windspeedarr:["null","null","null","null","null","null","null"]});
        this.setState({winddegarr:["null","null","null","null","null","null","null"]});
        this.setState({precCloudarr:["null","null","null","null","null","null","null"]});
        this.setState({precPoparr:["null","null","null","null","null","null","null"]});
        this.setState({minTemparr:["null","null","null","null","null","null","null"]});
        this.setState({maxTemparr:["null","null","null","null","null","null","null"]});
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
    }

    makeWindTable = () => {
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
                                <th scope = "row">Wind Speed</th>
                                <td>{this.state.windspeedarr[0]}</td>
                                <td>{this.state.windspeedarr[1]}</td>
                                <td>{this.state.windspeedarr[2]}</td>
                                <td>{this.state.windspeedarr[3]}</td>
                                <td>{this.state.windspeedarr[4]}</td>
                                <td>{this.state.windspeedarr[5]}</td>
                                <td>{this.state.windspeedarr[6]}</td>
                            </tr>
                            <tr>
                                <th scope = "row">Wind Degree</th>
                                <td>{this.state.winddegarr[0]}</td>
                                <td>{this.state.winddegarr[1]}</td>
                                <td>{this.state.winddegarr[2]}</td>
                                <td>{this.state.winddegarr[3]}</td>
                                <td>{this.state.winddegarr[4]}</td>
                                <td>{this.state.winddegarr[5]}</td>
                                <td>{this.state.winddegarr[6]}</td>
                            </tr>
                    </table>
                    
                </div>
        );
    }

    makePrecTable = () => {
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
                                <th scope = "row">Cloudiness, %</th>
                                <td>{this.state.precCloudarr[0]}</td>
                                <td>{this.state.precCloudarr[1]}</td>
                                <td>{this.state.precCloudarr[2]}</td>
                                <td>{this.state.precCloudarr[3]}</td>
                                <td>{this.state.precCloudarr[4]}</td>
                                <td>{this.state.precCloudarr[5]}</td>
                                <td>{this.state.precCloudarr[6]}</td>
                            </tr>
                            <tr>
                                <th scope = "row">Precipitation Chance</th>
                                <td>{this.state.precPoparr[0]}</td>
                                <td>{this.state.precPoparr[1]}</td>
                                <td>{this.state.precPoparr[2]}</td>
                                <td>{this.state.precPoparr[3]}</td>
                                <td>{this.state.precPoparr[4]}</td>
                                <td>{this.state.precPoparr[5]}</td>
                                <td>{this.state.precPoparr[6]}</td>
                            </tr>
                    </table>
                    
                </div>
        );
    }

    makeTempTable = () => {
        return(
            <div>
                    <table>
                            <tr>
                                <td></td>
                                <th scope = "col">Mon</th>
                                <th scope = "col">Tue</th>
                                <th scope = "col">Wed</th>
                                <th scope = "col">Thu</th>
                                <th scope = "col">Fri</th>
                                <th scope = "col">Sat</th>
                                <th scope = "col">Sun</th>
                            </tr>
                            <tr>
                                <th scope = "row">Max Temp</th>
                                <td>{this.state.maxTemparr[0]}</td>
                                <td>{this.state.maxTemparr[1]}</td>
                                <td>{this.state.maxTemparr[2]}</td>
                                <td>{this.state.maxTemparr[3]}</td>
                                <td>{this.state.maxTemparr[4]}</td>
                                <td>{this.state.maxTemparr[5]}</td>
                                <td>{this.state.maxTemparr[6]}</td>
                            </tr>
                            <tr>
                                <th scope = "row">Min Temp</th>
                                <td>{this.state.minTemparr[0]}</td>
                                <td>{this.state.minTemparr[1]}</td>
                                <td>{this.state.minTemparr[2]}</td>
                                <td>{this.state.minTemparr[3]}</td>
                                <td>{this.state.minTemparr[4]}</td>
                                <td>{this.state.minTemparr[5]}</td>
                                <td>{this.state.minTemparr[6]}</td>
                            </tr>
                    </table>
                    
                </div>
        );
    }

    makeDayTempTable = () =>{
        return(
            <div>
                <table>
                    <tr>
                        <td></td>
                        <th scope = "col">03:00-09:00</th>
                        <th scope = "col">09:00-16:00</th>
                        <th scope = "col">16:00-22:00</th>
                        <th scope = "col">22:00-03:00</th> 
                    </tr>
                    <tr>
                    <th scope = "row">Temp</th>
                    <td>{this.state.mornTemp}</td>
                    <td>{this.state.dayTemp}</td>
                    <td>{this.state.eveTemp}</td>
                    <td>{this.state.nightTemp}</td>
                    </tr>
                </table>
            </div>
        );
    }

    printdata = () =>{
        print();
    }
   
    render(){
        //add button which stes hour boolean, if true then show hor table
        let weatherType = this.props.choice;
        const windtable = this.makeWindTable();
        const precTable = this.makePrecTable();
        const tempTable = this.makeTempTable();
        const dayTempTable = this.makeDayTempTable();
        if(weatherType==="wind"){
            return(
                <div>
                    <div>{windtable}</div>
                    <div><Button clickFunction={ this.printdata } message={"download data"} /></div>
                </div>
            );
        }
        else if(weatherType==="temp"){
            return(
                <div>
                    <div>{dayTempTable}</div>
                    <div>{tempTable}</div>
                    <div><Button clickFunction={ this.printdata } message={"download data"} /></div>
                </div>
            );
        }
        else if(weatherType==="prec"){
            return(
                <div>
                    <div>{precTable}</div>
                    <div><Button clickFunction={ this.printdata } message={"download data"} /></div>
                </div>
            );
        }
    }
      
 
        parseResponse = (parsed_json) => {
        var i;
        var speedarr = [];
        var degarr = [];
        var cloudarr = [];
        var precarr = [];
        var minarr = [];
        var maxarr = [];
        var mor;
        var day;
        var eve;
        var night;
        mor = parsed_json['daily']['0']['temp']['morn'];
        day = parsed_json['daily']['0']['temp']['day'];
        eve = parsed_json['daily']['0']['temp']['eve'];
        night = parsed_json['daily']['0']['temp']['night'];
        for(i=0;i<7;i++){
            speedarr.push(parsed_json['daily'][i]['wind_speed']);
            degarr.push(parsed_json['daily'][i]['wind_deg']);
            cloudarr.push(parsed_json['daily'][i]['clouds']);
            precarr.push(parsed_json['daily'][i]['pop']);
            minarr.push(parsed_json['daily'][i]['temp']['min']);
            maxarr.push(parsed_json['daily'][i]['temp']['max']);
        }
        

        // set states for fields so they could be rendered later on
        this.setState({
            winddegarr : degarr,
            windspeedarr : speedarr,
            precCloudarr : cloudarr,
            precPoparr : precarr,
            maxTemparr : maxarr,
            minTemparr : minarr,
            mornTemp: mor,
            dayTemp : day,
            eveTemp : eve,
            nightTemp : night
        });      
    }
}