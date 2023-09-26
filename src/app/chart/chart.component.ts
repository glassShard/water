import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BASEOPTION} from "./options";

interface RawData {
  dateTime: string;
  relay1: string;
  relay2: string;
  relay3: string;
  relay4: string;
  soil1: string;
  soil2: string;
  soil3: string;
  soil4: string;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  options: any;
  dataSource: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.refreshPage();
  }

  refreshPage() {
    this.getData();
    setTimeout(() => {
      this.refreshPage();
    }, 600000);
  }

  getData() {
    const params = new HttpParams()
      .set('n', 1012);
    const options = {params: params, withCredentials: true}
    this.http.get(environment.url + 'getLastNData.php', options).subscribe((data: any) => {
      if (data.success) {
        const reduced: Array<RawData> = data.data
          .reduce((acc: any, curr: any) => {
            const x = acc.find((elem: Array<any>) => elem[0].dateTime.startsWith(curr.dateTime.slice(0, 13)));
            if (x) {
              x.push(curr);
            } else {
              acc.push([curr]);
            }
            return acc;
          }, [])
          .map((hour: any) => {
            const count: any = {soil1: 0, soil2: 0, soil3: 0, soil4: 0};
            const sum: any = {soil1: 0, soil2: 0, soil3: 0, soil4: 0};
            return hour.reduce((acc: any, curr: any, index: number) => {
              for (const [key] of Object.entries(curr)) {
                if (!isNaN(+curr[key])) {
                  curr[key] = +curr[key];
                }
                if (['soil1', 'soil2', 'soil3', 'soil4'].includes(key)) {
                  if (curr[key] < 101) {
                    count[key] += 1;
                    sum[key] = sum[key] + +curr[key];
                  }
                }
                if (['relay1', 'relay2', 'relay3', 'relay4'].includes(key)) {
                  acc[key] += curr[key];
                }
                if (index === hour.length - 1) {
                  acc.dateTime = curr.dateTime.slice(5, 13);
                  acc.soil1 = Math.round(sum.soil1 / count.soil1);
                  acc.soil2 = Math.round(sum.soil2 / count.soil2);
                  acc.soil3 = Math.round(sum.soil3 / count.soil3);
                  acc.soil4 = Math.round(sum.soil4 / count.soil4);
                }
              }

              return acc;
            }, {dateTime: '', id: 0, soil1: 0, soil2: 0, soil3: 0, soil4: 0, relay1: 0, relay2: 0, relay3: 0, relay4: 0})
          });

        this.dataSource = reduced.reverse();
        console.log(this.dataSource);
      }
      this.drawChart();
    })
  }

  drawChart() {
    this.options = JSON.parse(JSON.stringify(BASEOPTION));
    this.options.legend = {
      data: ['Soil1', 'Soil2', 'Soil3', 'Soil4'],
      align: 'left'
    }
    this.options.xAxis = {
      type: 'category',
      maxInterval: 3600 * 1000 * 24,
      boundaryGap: false,
      axisLabel: {
        rotate: 45,
        fontSize: 14
      },
      data: this.dataSource.map((item: RawData) => item.dateTime)
    };
    //this.options.xAxis.data = this.dataSource.map((item: RawData) => item.dateTime);
    this.options.series = [
      {
        name: 'Soil1',
        type: 'line',
        data: this.dataSource.map((item: RawData) => item.soil1),
        color: '#81d501',
        lineStyle: {
          width: 6
        },
        symbolSize: 0,
          animationDelay: (idx: number) => idx * 50,
      },  {
        name: 'Soil2',
        type: 'line',
        data: this.dataSource.map((item: RawData) => item.soil2),
        color: '#02bafd',
        lineStyle: {
          width: 6
        },
        symbolSize: 0,
        animationDelay: (idx: number) => idx * 50,
      },{
        name: 'Soil3',
        type: 'line',
        data: this.dataSource.map((item: RawData) => item.soil3),
        color: '#f401fc',
        lineStyle: {
          width: 6
        },
        symbolSize: 0,
        animationDelay: (idx: number) => idx * 50,
      },{
        name: 'Soil4',
        type: 'line',
        data: this.dataSource.map((item: RawData) => item.soil4),
        color: '#fc8701',
        lineStyle: {
          width: 6
        },
        symbolSize: 0,
        animationDelay: (idx: number) => idx * 50,
      }

    ]
  }

}
