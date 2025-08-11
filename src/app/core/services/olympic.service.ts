import {HttpClient, httpResource} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {OlympicCountry} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';

  constructor(private http: HttpClient) {}

  olympicsResource = httpResource<OlympicCountry[]>(() => ({
    url: this.olympicUrl,
    method: 'GET'
  }));
}
