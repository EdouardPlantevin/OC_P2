import {httpResource} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {OlympicCountry} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  // > Get Data
  private olympicUrl = './assets/mock/olympic.json';

  olympicsResource = httpResource<OlympicCountry[]>(() => ({
    url: this.olympicUrl,
    method: 'GET'
  }));

  getOlympicById(id: number): OlympicCountry | undefined {
    const olympics = this.olympicsResource.value();
    return olympics?.find(olympicCountry => olympicCountry.id == id);
  }
  // < Get Data

  // > Fonction
  getFormattedOlympicCountriesPieChart(olympicsCountry: OlympicCountry[]) {
    // On crée un tableau intermédiaire avec les pays et leur total de médailles
    let olympicsFormatted = olympicsCountry.map(olympic => {
      return {
        countryName: olympic.country,
        totalMedals: olympic.participations.reduce((total, participation) => total + participation.medalsCount, 0),
        countryId: olympic.id
      };
    });

    //On trie par totalMedals décroissant
    olympicsFormatted.sort((a, b) => b.totalMedals - a.totalMedals);

    // On sépare en deux tableaux
    return {
      countryName: olympicsFormatted.map(item => item.countryName),
      totalMedals: olympicsFormatted.map(item => item.totalMedals),
      countryId: olympicsFormatted.map(item => item.countryId)
    };
  }

  getFormattedOlympicCountriesLineChart(olympicsCountry?: OlympicCountry) {

    if (!olympicsCountry) return { year: [], totalMedals: [] };

    let olympicsFormatted = olympicsCountry.participations.map(olympic => {
      return {
        year: olympic.year.toString(),
        medalsCountByYear: olympic.medalsCount
      };
    });

    // On sépare en deux tableaux
    return {
      year: olympicsFormatted.map(item => item.year),
      totalMedals: olympicsFormatted.map(item => item.medalsCountByYear)
    };

  }
  // < Fonction

}
