import {httpResource} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {OlympicCountry} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  // > Get Data
  private olympicUrl = './assets/mock/olympic.json';

  // HTTP ERROR STATUS
  // private olympicUrl = 'https://mock.httpstatus.io/404'

  olympicsResource = httpResource<OlympicCountry[]>(() => ({
    url: this.olympicUrl,
    method: 'GET',
  }));

  getOlympicById(id: number): OlympicCountry | undefined {
    const olympics = this.olympicsResource;
    if (olympics.error()) {
      return undefined;
    }
    const olympic = olympics.value()?.find(olympicCountry => olympicCountry.id == id);

    //On vérifie que tous les champs sont bien présent
    if (olympic?.country && olympic?.participations) {
      return olympic;
    }
    return undefined;
  }
  // < Get Data

  // > Fonction
  async getFormattedOlympicCountriesPieChart(olympicsCountry: OlympicCountry[]) {

    // On simule un délai de 0.5 secondes
    await new Promise(resolve => setTimeout(resolve, 500));
    // On crée un tableau intermédiaire avec les pays et leur total de médailles
    let olympicsFormatted = olympicsCountry.filter(olympic => olympic.country).map(olympic => {
      return {
        countryName: olympic.country,
        totalMedals: olympic.participations?.reduce((total, participation) => total + participation.medalsCount, 0),
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

  async getFormattedOlympicCountriesLineChart(olympicsCountry?: OlympicCountry) {

    await new Promise(resolve => setTimeout(resolve, 500));

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
