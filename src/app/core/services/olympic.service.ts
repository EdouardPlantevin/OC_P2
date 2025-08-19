import {httpResource, HttpResourceRef} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {OlympicCountryInterface} from "../models/OlympicCountryInterface";
import {FormattedPieChartInterface} from "../models/FormattedPieChartInterface";
import {FormattedLineChartInterface} from "../models/FormattedLineChartInterface";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  // > Get Data
  private olympicUrl = './assets/mock/olympic.json';

  // HTTP ERROR STATUS
  // private olympicUrl = 'https://mock.httpstatus.io/404'

  olympicsResource: HttpResourceRef<OlympicCountryInterface[] | undefined> = httpResource<OlympicCountryInterface[]>(() => ({
    url: this.olympicUrl,
    method: 'GET',
  }));

  public getOlympicById(id: number): OlympicCountryInterface | undefined {
    const olympics: HttpResourceRef<OlympicCountryInterface[] | undefined> = this.olympicsResource;
    if (olympics.error()) {
      return undefined;
    }
    const olympic: OlympicCountryInterface | undefined = olympics.value()?.find(olympicCountry => olympicCountry.id == id);

    //On vérifie que tous les champs sont bien présent
    if (olympic?.country && olympic?.participations) {
      return olympic;
    }
    return undefined;
  }
  // < Get Data

}
