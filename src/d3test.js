import React from "react";
import * as d3 from "d3";

class D3Test extends React.Component {
    
    dragStart() {
        console.log("drag");
    }



    render() {

        return (<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 79.374998 79.375002">
            <rect width="50" height="50"></rect>
        </svg>)
	}
}

module.exports = {
    D3Test
}
