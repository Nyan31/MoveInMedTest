import { Films } from "./films";
import { Planets } from "./planets";
import { Species } from "./species";
import { Starships } from "./starships";
import { Vehicles } from "./vehicles";

export class People {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: Planets;
  films: Films[];
  species: Species[];
  vehicles: Vehicles[];
  starships: Starships[];
  created: Date;
  edited: Date;
  url: string;
}
