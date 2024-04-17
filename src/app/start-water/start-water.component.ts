import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-start-water',
  templateUrl: './start-water.component.html',
  styleUrls: ['./start-water.component.css']
})
export class StartWaterComponent implements OnInit {
  relays = [1, 2, 3, 4];
  // @ts-ignore
  data: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const interval: Array<string> = this.getInterval();
    const formData = new FormData();
    formData.append('from', interval[0]);
    formData.append('to', interval[1]);
    this.http.post(environment.url + 'getTimeIntervalData.php', formData).subscribe((data: any) => {
      this.processData(data);
    })
  }

  getInterval(): Array<string> {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    return [this.formatDate(yesterday), this.formatDate(now)];
  }

  processData(data: any) {
    if (data.success && data.data.length) {
      const obj = data.data
        .reduce((acc: any, curr: any) => {
          acc.relay1 += +curr.relay1;
          acc.relay2 += +curr.relay2;
          acc.relay3 += +curr.relay3;
          acc.relay4 += +curr.relay4;

          return acc;
        }, {relay1: 0, relay2: 0, relay3: 0, relay4: 0});
      console.log(obj);
      this.data = {
        relay1: this.createVerboseTime(obj.relay1),
        relay2: this.createVerboseTime(obj.relay2),
        relay3: this.createVerboseTime(obj.relay3),
        relay4: this.createVerboseTime(obj.relay4),
      };
    }
  }

  createVerboseTime(sec: number) {
    const s = sec % 60;
    const min = Math.floor(sec / 60);
    const hour = Math.floor(min / 24);
    const m = min % 24;

    return `${this.padZero(hour)}:${this.padZero(m)}:${this.padZero(s)}`;
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  }

  padZero(num: number) {
    return (num < 10 ? '0' : '') + num;
  }

  onBtn(method: 'ON' | 'OFF', relay: number) {
    const formData = new FormData();
    formData.append('sensor_id', relay.toString());
    formData.append('method', method);
    this.http.post(environment.url + 'water.php', formData).subscribe((data: any) => {
      if (data.success) {
        alert('message sent');
      } else {
        alert(data.message);
      }
    })
  }

}
