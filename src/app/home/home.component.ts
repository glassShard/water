import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

interface Data {
  date: string;
  soils: Array<Soil>;
  relays: Array<Relay>;
}

interface Soil {
  name: string;
  soilValue: number;
}

interface Relay {
  name: string;
  relayMinutes: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: Data | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.refreshPage();
  }

  refreshPage() {
    this.getData(1);
    setTimeout(() => {
      this.refreshPage();
    }, 120000);
  }

  getData(n: number) {
    const params = new HttpParams()
      .set('n', n);
    const options = {params: params, withCredentials: true}
    this.http.get(environment.url + 'getLastNData.php', options).subscribe((data: any) => {
      if (data.success) {
        const d = data.data[0];
        this.data = {
          date: d.dateTime,
          soils: [
            {name: 'soil1', soilValue: +d.soil1},
            {name: 'soil2', soilValue: +d.soil2},
            {name: 'soil3', soilValue: +d.soil3},
            {name: 'soil4', soilValue: +d.soil4}
          ],
          relays: [
            {name: 'relay1', relayMinutes: +d.relay1},
            {name: 'relay2', relayMinutes: +d.relay2},
            {name: 'relay3', relayMinutes: +d.relay3},
            {name: 'relay4', relayMinutes: +d.relay4},
          ]
        };
        console.log(this.data);
      }
    })
  }
}
