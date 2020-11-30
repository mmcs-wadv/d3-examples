import * as d3 from 'd3'
export default class MoneyProgress{
    constructor() {
        this.arcGen = d3.arc().innerRadius(120).outerRadius(180).startAngle(0);
        this.div = document.createElement('div');
    }

    buildMoneyProgress(current, total, width, height){
        this.current = current;
        this.total = total;
        const graph = d3.select(this.div).append('svg')
            .attr("width", width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width/2}, ${height/2})`);
        const background = graph.append("path")
            .datum({endAngle: 2*Math.PI })
            .style("fill", "#FF0000")
            .attr("d", this.arcGen);
        this.upperground = graph.append("path")
            .datum({endAngle: this.progress() })
            .style("fill", "#00FF00")
            .attr("d", this.arcGen);
        this.dataText = graph.append("text")
            .text(`${current}/${total}`)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline','middle')
            .attr('transform','translate(0,24)' )
            .attr('font-size', '38px');
        const moneyText = graph.append("text")
            .text(`Money:`)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline','middle')
            .attr('transform','translate(0,-24)' )
            .attr('font-size', '38px');
        return this.div;
    }

    update(earned){
        this.current += earned;
/*        if (this.current >= this.total)
        {
            alert('yay!');
            return;
        }*/
        const that = this;
        this.upperground.transition().duration(750).attrTween('d', function (d){
            let compute = d3.interpolate(d.endAngle, that.progress());
            return function(t){
                d.endAngle = compute(t);
                that.dataText.text(`${that.current}/${that.total}`);
                return that.arcGen(d);
            }
        })
    }

    progress()
    {
        return this.current/this.total*2*Math.PI;
    }
}