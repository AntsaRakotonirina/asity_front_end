import { Component, Input, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ScatterDataPoint } from 'chart.js';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.css']
})
export class ScatterChartComponent implements OnInit {
  @Input() data:ScatterDataPoint[]=[]
  labels:number[]=[];
  _analyseData:ChartDataset[]=[];

  _chartOptions:ChartOptions = {
    responsive:true
  }
  constructor() { }

  ngOnInit(): void {
    this._analyseData.push({
      type:'scatter',
      data:this.data,
      label:'Observations',
      pointRadius: 5,
      backgroundColor:"#4caf50"
    })
  }

}
