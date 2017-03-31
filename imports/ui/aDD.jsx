import React from 'react';

const aDD = React.createClass({

var dataset = [
    { name: 'Male', percent: 55 },
    { name: 'Female', percent: 45 }
];


var w=300,h=300;

var radius=(w-20)/2;

var pie=d3.layout.pie()
        .value(function(d){return d.percent})
        .sort(null);

var arc=d3.svg.arc()
        .innerRadius(0)
        .outerRadius(radius);

var color = d3.scale.ordinal()
        .range([ '#e75244','#33bb9d']);

var svg=d3.select("#chart")
        .append("svg")
        .attr({
            width:w,
            height:h,
            class:'shadow'
        }).append('g')
        .attr('transform','translate('+(w/2)+','+(h/2)+')');

var path=svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr({
            d:arc,
            fill:function(d,i){
                return color(i);
            }
        })
        .style({
            'fill-opacity':.15,
            stroke: function(d,i){
                return color(i);
            },
            'stroke-width': '2px'
        });


var text=svg.selectAll('text')
        .data(pie(dataset))
        .enter()
        .append("text")
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d){
            return d.data.name+" ("+d.data.percent+"%)" ;
        })
        .style({
            fill:function(d,i){
                return color(i);
            },
            'font-size':'18px',

        });

    })

export default aDD;