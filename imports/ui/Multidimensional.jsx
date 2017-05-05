import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';
import { createContainer } from 'meteor/react-meteor-data';

// JUST SOME RANDOM DATA TO CHECK SHOW HOW WE CAN EXPLOIT THE 4 DIMENSIONS OF THE BUBBLE CHART

export default class Multidimensional extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
      		data: 
            [["ID","Life Expectancy","Fertility Rate","Region","Population"],
            ["CAN",5,2,"North America",33739900],
            ["DEU",3,6,"Europe",81902307],
            ["DNK",8,7,"Europe",5523095],
      			["EGY",9,1,"Middle East",79716203],
      			["GBR",3,2,"Europe",61801570],
      			["IRN",4,8,"Middle East",73137148],
      			],
      		options: {
      			"title":"Correlations btw life expectancy, fertility rate and population of some world countries (2010)",
      			"hAxis": {"title":"Life Expectancy"},
      			"vAxis":{"title":"Fertility Rate"},
      			"bubble":{"textStyle":{"fontSize":11}},
            "sizeAxis": {minSize: 20,  maxSize: 50},
            //"theme": "maximized"
      		},
      	}
 	}

	render() {
    	return (
        <div>
    		  <Chart
    	      	chartType="BubbleChart"
    	      	width="100%"
    	      	data={this.state.data}
    	      	options={this.state.options}
      		/>
        </div>
    	);
  	}
}