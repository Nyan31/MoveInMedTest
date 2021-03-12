import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListOfFilmsByFilterComponent } from './list-of-films-by-filter.component';

describe('ListOfFilmsByFilterComponent', () => {
  let component: ListOfFilmsByFilterComponent;
  let fixture: ComponentFixture<ListOfFilmsByFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfFilmsByFilterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfFilmsByFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
