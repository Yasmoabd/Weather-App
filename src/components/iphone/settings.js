import { h, render, Component } from 'preact';
import $ from 'jquery';
import style from './style';
import Button from '../button';
import Iphone from './index';

export default class Settings extends Component{
    constructor(props){
        super(props);
        this.setState({Home: false});
        this.setState({setloc: false});
        this.setState({latitude: 33.441792});
        this.setState({longditude: -94.037689});
        this.setState({error: false});
    }

    setlocation = () =>{
        var lat = document.getElementById('lat').value
        var lon = document.getElementById('lon').value
        
        if(lat === "" || lon==="" || lat<-90 || lat>90 || lon<-180 || lon>80){
            this.setState({error: true});
            return;
        }
        this.setState({
            latitude : lat,
            longditude : lon,
            setloc : true,
            error: false
        })
    }

    ShowHome = () =>{
        if(this.state.error==false){
            this.setState({Home:true});
        }
    }


    render(){
        if(this.state.Home==false){
            return(
                <div class = {style.container}>
                    <h1>Settings</h1>
                    <h3>Set location:</h3>
                    <label for="fname">Latitude -90 to 90:</label>
                    <input type="text" id="lat" name="fname"></input><br/><br/>
                    <label for="lname">Longditude -180 to 80:</label>
                    <input type="text" id="lon" name="lname"></input><br/><br/>
                    <button onClick={ this.setlocation }>set location</button>
                    <div>{this.state.setloc ? <p>Location set succesfully</p> : null}</div>
                    <div>{this.state.error ? <p>Location invalid</p> : null}</div>
                    <div><button class={style.iconbutton} onClick={ this.ShowHome }><img src='../../assets/icons/home.png'/></button></div>
                    
                </div>
            );
        }
        else{
            return(
                <div><Iphone lat={this.state.latitude} lon={this.state.longditude}/></div>
            );
        }
        
    }
}

