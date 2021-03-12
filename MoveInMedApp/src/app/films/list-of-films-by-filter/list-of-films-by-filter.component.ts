import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Films } from 'src/app/models/films';

@Component({
  selector: 'app-list-of-films-by-filter',
  templateUrl: './list-of-films-by-filter.component.html',
  styleUrls: ['./list-of-films-by-filter.component.scss'],
})
export class ListOfFilmsByFilterComponent implements OnInit {

  @Input() arrayOfFilteredFilmsToDisplay: Films[];

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
  }

}
