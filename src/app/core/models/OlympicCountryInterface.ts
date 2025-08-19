import {ParticipationInterface} from "./ParticipationInterface";

export interface OlympicCountryInterface {
  id: number;
  country: string;
  participations: ParticipationInterface[];
}
