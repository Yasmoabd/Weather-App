// import preact
import { h, render, Component } from 'preact';
import style from './style';
import $ from 'jquery';
// import the Button component
import Button from '../button';
import Title from './title';

export default class Advice extends Component{
    constructor(props){
        super(props);
        this.fetchWeatherData(); // fetch weather data 
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

    makeWindAdvice = () => { //this method provides the general advice table for strong winds
        return(
            <div>
                <table class ={style.adviceTable}>
                    <p>Hiking in strong winds are of high risk due to several reasons including: </p>
                    <ol>
                        <li>You may be thrown of balance when hiking in areas of high exposure</li>
                        <li>It is more difficult to walk against strong wind which can tire you a lot easier</li>
                        <li>Strong winds can make you feel colder than normal which can result in wind chill</li>
                    </ol>

                    <b><h4>Recommended Resources :</h4></b>
                    <ul>
                        <li><b>Layers - </b> It is important to have extra layers to help with strong winds. In strong winds, you will feel much colder hence it's best to carry extra light layers.</li>
                        <li><b>Physical Map and Protective Cover - </b> When hiking in high mountain ranges, phone signal is very rare. Therefore, it's best to carry a physical map for access. The protective cover will ensure that the map won't get destroyed in extreme weather conditions.</li>
                        <li><b>Compass - </b> Strong winds can result in sudden disorientation. A reliable compass will prevent this and keep you in the right direction. </li>
                        <li><b>Handheld Anemometer - </b> This is complete optional but useful tool. It is a handheld wind meter that can provide specific information about wind strength to keep you aware on whether it's safe to complete your hike. </li>
                        <li><b>Hiking Poles - </b> These will support you and keep you balanced especially in strong winds. Best equipment for stability</li>
                        <li><b>Hiking Boots - </b> It is especially important to have the perfect hiking shoes. Make sure you wear hiking boots that are comfortable and can keep you balanced in strong winds. </li>
                    </ul>
                    <h3>Mountain Emergency Services available in case of emergencies</h3>
                    </table>
            </div>
        )
        }

    makePrecAdvice = () => { //this method provides the general advice for low visibility
        return(
            <div>
           <table class ={style.adviceTable}>
                    <p>Low Visibility is one of the worst-case hiking scenario and weather conditions can change quickly in high mountains.</p>
        
                    <b><h4>How to deal with low invisibility :</h4></b>
                    <ol>
                        <li><b>Appropriate Equipment - </b> It is important to have the right tools to help guide you in expected weather condtions. These tools can include: compass, waterproof map and reliable GPS.</li>
                        <li><b>Keep track of your position- </b> If you have a rough idea of your surroundings as you progress your journey, it would be a lot more useful when picturing your current location.</li>
                        <li><b>Be aware of nearby hazards- </b> Hazards are a lot harder to notice in low visibility. It is better to acknowledge them beforehand to avoid dangerous situations.  </li>
                        <li><b>Plan of action for weather changes - </b> It is helpful to know what to do in sudden weather changes to avoid unnecessary panic.</li>
                        <li><b>Trust your a compass- </b> It may be advisable to have more than one compass, incase one is inaccurate. In poor visibilty, a compass is all you can ideally count on. </li>
                        <li><b>Use a GPS- </b> A GPS can pinpoint your exact location when you're unaware of where you are. However, don't completely rely on a GPS due to the technical inconveniences.</li>
                        <li><b>Wait - </b> If you/re completely lost, you may wish to wait till there is better visibility to have a better idea about your location.</li>
                        <li><b>Don't Panic!</b></li>
                    </ol>
                    <h3>Mountain Emergency Services available in case of emergencies</h3>
                    </table>
        </div>
        )
        }

    makeTempAdvice = () => { //this method provides the general advice for low temperatures
        return(
            <div>
           <table class ={style.adviceTable}>
                    <p>Mountain hiking in cold weather is just as enjoyable when you have the right equipment and preparation. Low temperatures are very much expected in high mountain ranges so it's important to be prepared. </p>

                    <b>Some tips to prepare for low temperatures include: wear layers, avoid tight clothing, avoid cotton, keep batteries warm, apply sunscreen, cover all skin, pack warm drinks and add heat (e.g. hand warmers).</b>

                    <b><h4>Potential Cold-Related Issues to look out for: </h4></b>
                    <table class ={style.tempTable}>    
                    {/* creates a table for the health issues concerning cold weather */}
                            <th>Issue</th>
                            <th>Definition</th>
                            <th>Signs</th>
                            <th>Treatment</th>
                        
                        <tr>
                        <td><b>Frostbite</b></td> 
                        <td>Freezing of tissue that can be found commonly on fingers, toes and ears.</td>
                        <td>
                            Skin is cold, waxy or pale.
                            Tingling, numbness or pain on affected area.
                            After thawing, blisters can form.
                        </td>
                        <td>Keep affected area warm. Do not rub area under hot water - could cause further damage. If treatment leads to blistering,seek medical attention.</td>
                        </tr>
                        <tr>
                        <td><b>Hypothermia </b> </td>
                        <td>Result of body temperature dropping below normal</td>
                        <td>Shivering, changed co-ordination (stumbling), change in mental state(confusion)</td>
                        <td>Change hiker's enviroment - get indoors. Keep them warm and provide them with nutrients to stay energised.</td>
                        </tr>
                    </table>
                    <p>Be sure to stay warm, keep energised and try notice symptoms as early as possible to avoid further inconvenience.</p>
                    <h3>Mountain Emergency Services available in case of emergencies</h3>
                    </table>
            </div>
        )
        }

    infoURL = () => {
        // this method returns the URL link that provides a website for more information on mountain hiking
        return(
            location.href = 'https://www.mountainwarehouse.com/expert-advice/beginners-guide-to-hiking'
        )
    }

    equipmentURL = () => {
        // this method provides the URL link for a website where users can search for equipment to potentially purchase
        return(
            location.href = 'https://www.mountainwarehouse.com/outdoor/outdoor-equipment/'
        )
    }

    render(){
        var warning = this.props.warning;
        // imports the variable warning from Datatable component
        var choice = this.props.choice;
        // imports variable choice from Datatable component
       
        const windAdvice = this.makeWindAdvice();
        const precAdvice = this.makePrecAdvice();
        const tempAdvice = this.makeTempAdvice();
        if(choice === "wind"){ 
            // returns the page for when user seeks advice regarding strong winds under the 'Wind' section
            return(
            <div>
                <div><h5>There are strong winds on <em>{warning}</em></h5></div>
                {/* states which days there are strong winds using variable 'warning' */}
                <div>{windAdvice}</div>
                {/* returns makeWindAdvice function */}
                {/* create table to print Buttons linking to the URLs */}
					<table class={style.buttontable}>
						<th><Button clickFunction = {this.infoURL} message={"More Info"} /></th>
                        <th><Button clickFunction = {this.equipmentURL} message ={'Equipment'}/></th>
                    </table>
            </div>
            )
        }

        else if (choice == "prec"){ 
            // returns page for when user clicks on Precipitation Advice to seek advice regarding low visibility
            return(
                <div>
                    <div><h5>There is low visibility on {warning}</h5></div>
                    {/* states which days there are low visibility using variable 'warning' */}
                    <div>{precAdvice}</div>
                    {/* returns makePrecAdvice function */}
                    <table class={style.buttontable}>
						<th><Button clickFunction = {this.infoURL} message={"More Info"} /></th>
                        <th><Button clickFunction = {this.equipmentURL} message ={'Equipment'}/></th>
                    </table>
                </div>
            )
        }

        else if (choice == "temp"){
            // returns page for when user seeks advice on cold weather 
            return(
                <div>
                    <div><h5>The temperature is low on {warning}</h5></div>
                      {/* states which days there are low temperatures using variable 'warning' */}
                    <div>{tempAdvice}</div>
                    {/* returns maketempAdvice function */}
                    <table class={style.buttontable}>
						<th><Button clickFunction = {this.infoURL} message={"More Info"} /></th>
                        <th><Button clickFunction = {this.equipmentURL} message ={'Equipment'}/></th>
                    </table>
                </div>
            )
        }

        else{
            return(
                <div>
                    <div>{choice}</div>
                </div>
            )
        }
    }
}