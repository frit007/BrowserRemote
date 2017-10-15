const css = require('./remote/remote.scss');

import React from "react";
import { render } from "react-dom";
console.log("home");
// import { Home } from "./home";
import {CurvedSlider} from "./remote/curvedSlider/curvedSlider";
import {D3Test} from "./d3test";
import RightCircle from './remote/rightCircle/rightCircle'
// import * as socket from "socket.io";
var io = require("socket.io-client");
console.log(io);

var socket = io.connect("/remote");
// var socket= io();
// window.socket = socket;
// window.io = io;

// console.log("CurvedSlider",CurvedSlider);
// console.log("Home",Home);
// console.log("Got 1");
class App extends React.Component {
	render() {


		return (
			<div className="remoteContainer">
				<CurvedSlider/>
				
				<div className="play circle">
					
				</div>

				<RightCircle icon="fa-cog" className="options">
					<span className="center">
						Hello
					</span>
				</RightCircle>

				<RightCircle icon="fa-list" className="playlist">

				</RightCircle>

				<RightCircle icon="fa-university" className="services">

				</RightCircle>
	{/* 
						<div className="options rightCircle">
							<i className="fa fa-cog fa-4x center primaryText" aria-hidden="true"></i>
						</div>
						<div className="playlist rightCircle">
							<i className="fa fa-list fa-4x center primaryText" aria-hidden="true"></i> 
						</div>
						<div className="services rightCircle">
						</div> */}




					{/* <h1>App Header</h1>  */}
					{/* <D3Test/>  */}
					
				{/* <Home/>	 */}
			</div>
		)
	}

}

// console.log("Got 2");
var app = document.getElementById("app");
window.L = App;
// 

// console.log("Got 3");
// console.log(Lay);
// console.log(ReactDOM);
// console
// console.log(<Lay/>);
// app.innerHTML = "Does work";
render(<App/>, app);

console.log("Got 4");
