import { h, render, Component } from 'preact';
import $ from 'jquery';
import style from './style';
import Button from '../button';
import Iphone from './index';
//57.0607° N, 3.6066° W cairgnomrs
//54.7028° N, 2.4867° W pennines
//54.1533° N, 6.0663° W mourne mounts
//53.0932° N, 3.8017° W snowdonia
export default class Settings extends Component{
    constructor(props){
        super(props);
        this.setState({Home: false});
        this.setState({setloc: false});
        this.setState({latitude: 53.0932});
        this.setState({longditude: 3.8017});
    }

    handleDropdownChanges = (e) => {
        let val = e.target.value;
        this.setlats(val);
    }

    setlats = (val) =>{
        if(val==="1"){
			this.setState({latitude: 57.0607});
            this.setState({longditude: 3.6066});
		}
		else if(val==="2"){
			this.setState({latitude:54.7028});
            this.setState({longditude: 2.4867});
		}
		else if(val==="3"){
			this.setState({latitude: 54.1533});
            this.setState({longditude: -26.037689});
		}
		else{
			this.setState({latitude: 53.0932});
            this.setState({longditude: 3.8017});
		}
        console.log(val);
    }

    ShowHome = () =>{
        this.setState({Home:true})
    }

    setlocation = () =>{
        this.setState({setloc:true})
    }


    render(){
        if(this.state.Home==false){
            return(
                <div class = {style.container}>
                    <h1>Settings</h1>
                    <h3>Set location:</h3>
                    <select onChange={this.handleDropdownChanges}>
                    <option value="4" selected>Choose location </option>
					<option value="1">Cairngorms, Scotland</option>
                    <option value="2">Pennines, England</option>
                    <option value="3">Mourne Mountains, Northern Ireland</option>
                    <option value="4">Snowdonia, Wales</option>
                    </select>
                    <button onClick={ this.setlocation }>set location</button>
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

