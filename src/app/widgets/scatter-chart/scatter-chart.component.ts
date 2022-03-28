import { Component, Input, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType, ScatterDataPoint } from 'chart.js';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.css']
})
export class ScatterChartComponent implements OnInit {
  @Input() data:ScatterDataPoint[]=[]
  @Input() type:ChartType='scatter';
  labels:number[]=[];
  _analyseData:ChartDataset[]=[];

  _chartOptions:ChartOptions = {
    responsive:true
  }
  constructor() { }

  ngOnInit(): void {
    if(this.type === "line"){
      this._analyseData.push({
        type:this.type,
        data:this.data,
        label:'Observations',
        stepped:true,
        borderColor:"#4caf50",
        backgroundColor:"#4caf50"
      })
    }else if(this.type === "scatter"){
      this._analyseData.push({
        type:this.type,
        data:this.data,
        label:'Observations',
        pointRadius:5,
        backgroundColor:"#4caf50"
      })
    }
    
  }

}
