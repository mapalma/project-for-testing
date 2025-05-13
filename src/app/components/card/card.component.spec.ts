import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { of } from 'rxjs';
import { CardService } from '../../services/card.service';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let cardServiceMock: any;

  beforeEach(async () => {
    cardServiceMock = {
      obtenerDatos: jasmine.createSpy('obtenerDatos').and.returnValue(of(['dato1', 'dato2']))
    };

    await TestBed.configureTestingModule({
      imports: [CardComponent],
      providers: [{provide:CardService, useValue:cardServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should load data onInit', () => {
    expect(component.datos.length).toBe(2);
  })
});
