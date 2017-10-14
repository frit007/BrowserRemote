import React from "react";
import * as d3 from "d3";
import $ from "jquery";
import SVGInline from "react-svg-inline";
import sliderSvg from "./curvedSlider.svg";

window.d3 = d3;
// window.jQuery = jQuery;
window.$ = $;
window.dataSet = {};
require('./curvedSlider.scss');

class CurvedSlider extends React.Component {
    
    dragStart() {
        console.log("drag");
    }

    componentDidMount() {
        var path = d3.select("#curved-volume-slider");

        var drag = d3.drag()
            .on("drag", dragged);

        var svg = d3.select("#curved-volume");

        var circle = d3.select("#volume-group");
        circle.call(drag);

        var maskPath = document.getElementById("volume-bar-mask-path");
        
        // The scale here is based on an old height, but it matches pretty well
        var volumeLevelScale = d3.scaleLinear()
            .domain([73.25800323486328,6.604943752288818])
            .rangeRound([0, 3]);
            
        var volumeHeightToPercentage = d3.scaleLinear()
            .range([0,100])
            .domain([62.26,7.4]);

        var xRange = [

        ]

        var xFromPercentage = d3.scaleLinear()
            .domain([0,50,66,76,85,93,95,100])
            .range([19.8,5,5.9,7.67,9.5,13,16,19.8])


        function updateVolumeIcon(percentage) {
            // show all volume bars and the hide then unwanted ones
            var scaledValue = volumeLevelScale(volumeHeightToPercentage.invert(percentage));
            $(".volume-icon path").attr('opacity', 1);
            for (var i = scaledValue+1; i < 4; i++) {
                $("#volume-bar-"+i).attr('opacity', 0);
                // console.log(i);
            }
            updateSelectedVolumeBar(percentage);
            setIconPosition(percentage);
        }

        var percentageToMask = d3.scaleLinear()
            .domain([66,3])
            .range([0,100])
            ;
        

        function updateSelectedVolumeBar(percentage) {
            var scaledValue = percentageToMask.invert(percentage);
            // console.log(percentage, scaledValue);
            var boxPath = "M-2.93 "+scaledValue+"h33V69H-2z";
            maskPath.setAttribute("d", boxPath);
        }

        updateVolumeIcon(30);

        function setIconPosition(percentage) {
            var height = volumeHeightToPercentage.invert(percentage);
            
            // var circleRadius = 32.48858658;
            // var circleRadius = 34;
            var circleRadius = 34.8;
            
            var centeredHeight = circleRadius - height ;
            var width = Math.sqrt(Math.abs(Math.pow(circleRadius,2) - Math.pow(centeredHeight, 2)));
            width-=5.5
            // console.log("width: ", width);
            // console.log("centeredHeight: ", centeredHeight);
            width = circleRadius - width;

            // var p = closestPoint(path.node(), [width, height]);

            // console.log();

            // console.log(percentage);
            // console.log(p, original, [width, height]);
            d3.select(circle._groups[0][0])
                .attr("transform", "translate(" + (width-5) + "," + (height-33) + ")")
                // .attr("transform", "translate(" + (p[0]-5) + "," + (p[1]-33) + ")")
        }

        function dragged(d) {
            var m = d3.mouse(svg.node()),
            p = closestPoint(path.node(), m);
            var percentage = volumeHeightToPercentage(p[1]);
            updateVolumeIcon(percentage);
        }

        function closestPoint(pathNode, point) {
            var pathLength = pathNode.getTotalLength(),
                precision = 8,
                best,
                bestLength,
                bestDistance = Infinity;

            // linear scan for coarse approximation
            for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
                if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
                best = scan, bestLength = scanLength, bestDistance = scanDistance;
                }
            }

            // binary search for precise estimate
            precision /= 2;
            while (precision > 0.5) {
                var before,
                    after,
                    beforeLength,
                    afterLength,
                    beforeDistance,
                    afterDistance;
                if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
                best = before, bestLength = beforeLength, bestDistance = beforeDistance;
                } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
                best = after, bestLength = afterLength, bestDistance = afterDistance;
                } else {
                precision /= 2;
                }
            }

            best = [best.x, best.y];
            best.distance = Math.sqrt(bestDistance);
            return best;

            function distance2(p) {
                var dx = p.x - point[0],
                    dy = p.y - point[1];
                return dx * dx + dy * dy;
            }
        }
    }

    render() {
        return (
            <SVGInline svg={sliderSvg}/>
        )
	}
}

module.exports = {
    CurvedSlider
}



