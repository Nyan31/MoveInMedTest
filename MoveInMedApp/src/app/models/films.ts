import { People } from './people';
import { Planets } from './planets';
import { Species } from './species';
import { Starships } from './starships';
import { Vehicles } from './vehicles';

export class Films {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  characters: People[];
  planets: Planets[];
  starships: Starships[];
  vehicles: Vehicles[];
  species: Species[];
  created: Date;
  edited: Date;
  url: string;
}
