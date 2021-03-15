import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Films } from 'src/app/models/films';

/**
 * This component display all films filtered or sorted.
 */
@Component({
  selector: 'app-list-of-films-by-filter',
  templateUrl: './list-of-films-by-filter.component.html',
  styleUrls: ['./list-of-films-by-filter.component.scss'],
})
export class ListOfFilmsByFilterComponent {

  @Input() arrayOfFilteredFilmsToDisplay: Films[];

  constructor() { }

}
