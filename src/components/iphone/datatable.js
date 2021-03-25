import { h, render, Component } from 'preact';
import $ from 'jquery';
import style from './style';
import Button from '../button';
import Advice from './advice';

export default class Datatable extends Component{
    constructor(props){
        super(props);
        this.setState({windspeedarr:["null","null","null","null","null","null","null"]});
        this.setState({winddegarr:["null","null","null","null","null","null","null"]});
        this.setState({precCloudarr:["null","null","null","null","null","null","null"]});
        this.setState({precPoparr:["null","null","null","null","null","null","null"]});
        this.setState({minTemparr:["null","null","null","null","null","null","null"]});
        this.setState({maxTemparr:["null","null","null","null","null","null","null"]});
        this.setState({advicePage : false});
        this.fetchWeatherData();
        
        this.setState({warning:""});
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
                    <table class={style.datatable}>
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
                    <table class={style.datatable}>
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
                    <table class={style.datatable}>
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
                <table class={style.datatable}>
                    <tr>
                        <td></td>
                        <th scope = "col">3AM-9AM</th>
                        <th scope = "col">9AM-4PM</th>
                        <th scope = "col">4PM-10PM</th>
                        <th scope = "col">10PM-3AM</th> 
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

    dayConverter = (index) =>{
        if(index==0){
            return "Mon ";
        }
        else if(index ==1){
            return "Tue ";
        }
        else if(index ==2){
            return "Wed ";
        }
        else if(index ==3){
            return "Thu ";
        }
        else if(index ==4){
            return "Fri ";
        }
        else if(index ==5){
            return "Sat ";
        }
        else{
            return "Sun ";
        }
    }

    windWarning = (choice,arr) =>{
        var warningList = [];
        var i;
        for(i = 0;i<7;i++){
            if(choice==="wind"){
                if(arr[i]>=10){
                    warningList.push(this.dayConverter(i));
                }
            }
            else if(choice==="prec"){
                if(arr[i]>75){
                    warningList.push(this.dayConverter(i));
                }
            }
            else{
                if(arr[i]<=-10){
                    warningList.push(this.dayConverter(i));
                }
            }
        }
        return warningList;
    }

    showAdvice = () =>{
        this.setState({advicePage: true});
    }
   
    render(){
        //add button which stes hour boolean, if true then show hor table
        let weatherType = this.props.choice;
        const windTable = this.makeWindTable();
        const precTable = this.makePrecTable();
        const tempTable = this.makeTempTable();
        const dayTempTable = this.makeDayTempTable();
        if(this.state.advicePage==false){
            if(weatherType==="wind"){
                return(
                    <div>
                        <div>{windTable}</div>
                        <h1>WARNING!!!</h1>
                        <h2>Strong Winds on {this.state.warning}</h2>
                        <div><button class={style.iconbutton} onClick={ this.printdata }><img src='../../assets/icons/do.png'/></button></div>
                        <div><Button clickFunction={ this.showAdvice } message={"Advice"}/></div>
                    </div>
                    );
                }
            else if(weatherType==="temp"){
                
                return(
                    <div>
                        <div>{tempTable}</div>
                        <h1>WARNING!!!</h1>
                        <h2>Very Cold on {this.state.warning}</h2>
                        <div><button class={style.iconbutton} onClick={ this.printdata }><img src='../../assets/icons/do.png'/></button></div>
                        <div><Button clickFunction={ this.showAdvice } message={"Advice"}/></div>
                    </div>
                );
                
            }
            else if(weatherType==="prec"){
                return(
                    <div>
                        <div>{precTable}</div>
                        <h1>WARNING!!!</h1>
                        <h2>Low Visibility on {this.state.warning}</h2>
                        <div><button class={style.iconbutton} onClick={ this.printdata }><img src='../../assets/icons/do.png'/></button></div>
                        <div><Button clickFunction={ this.showAdvice } message={"Advice"}/></div>
                    </div>
                );
            }
            else if (weatherType=="sos"){
                return(
                    <div>
                        <p>Emergency services : 999 [UK]</p>
                        <p>Emergency Assistance : 112 [UK]</p>
                    </div>
                );
            }
        }
        else{
            return(
                <div><Advice choice ={weatherType} warning={this.state.warning}/></div>
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
        
        var type = this.props.choice;
        if(type==="wind"){
            this.setState({warning:this.windWarning(type,this.state.windspeedarr)});
        }
        else if(type==="prec"){
            this.setState({warning:this.windWarning(type,this.state.precCloudarr)});
        }
        else{
            this.setState({warning:this.windWarning(type,this.state.minTemparr)});
        }
        console.log(this.state.warning);
    }
}