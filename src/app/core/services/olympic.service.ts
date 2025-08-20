import {HttpClient, HttpResourceRef} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {OlympicCountryInterface} from "../models/OlympicCountryInterface";
import {BehaviorSubject, catchError, map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  // > Get Data
  private olympicUrl = './assets/mock/olympic.json';

  // HTTP ERROR STATUS
  // private olympicUrl = 'https://mock.httpstatus.io/404'

  private olympics$: BehaviorSubject<OlympicCountryInterface[]> = new BehaviorSubject<OlympicCountryInterface[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<OlympicCountryInterface[]> {
    return this.http.get<OlympicCountryInterface[]>(this.olympicUrl).pipe(
      tap((value: OlympicCountryInterface[]) => this.olympics$.next(value)),
      catchError((error, caught) => {
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  public getOlympics(): Observable<OlympicCountryInterface[]> {
    return this.olympics$.asObservable();
  }

  public getOlympicById(id: number): Observable<OlympicCountryInterface | undefined> {
    return this.olympics$.asObservable().pipe(map((countries: OlympicCountryInterface[]) => {
      return countries.find(country => country.id == id);
    }))
  }
  // < Get Data

}
