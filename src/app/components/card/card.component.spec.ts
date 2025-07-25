import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { of } from 'rxjs';
import { CardService } from '../../services/card.service';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let cardServiceMock: any;
  let mockDatos = ['dato1', 'dato2'];

  beforeEach(async () => {
    cardServiceMock = {
      obtenerDatos: jasmine.createSpy().and.returnValue(of(mockDatos))
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

  it('should load datos on ngOnInit', () => {
    component.ngOnInit();
    expect(component.datos.length).toBeGreaterThan(0);
    expect(component.datos[0]).toEqual(mockDatos[0]);
  });
  
});
