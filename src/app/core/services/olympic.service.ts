import {httpResource} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {OlympicCountry} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';

  olympicsResource = httpResource<OlympicCountry[]>(() => ({
    url: this.olympicUrl,
    method: 'GET'
  }));

  getOlympicById(id: number): OlympicCountry | undefined {
    const olympics = this.olympicsResource.value();
    return olympics?.find(olympicCountry => olympicCountry.id == id);
  }

}
