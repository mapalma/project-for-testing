import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchApiComponent } from './search-api.component';
import { Country } from '../../models/country.model';
import { of } from 'rxjs';
import { SearchApiService } from '../../services/search-api.service';
import { mockCountry } from '../../mocks/country.mock';

describe('SearchApiComponent', () => {
  let component: SearchApiComponent;
  let fixture: ComponentFixture<SearchApiComponent>;
  let searchApiServiceMock: any;


  beforeEach(async () => {
    searchApiServiceMock = {
      getCountryByName: jasmine.createSpy().and.returnValue(of(mockCountry))
    };

    await TestBed.configureTestingModule({
      imports: [SearchApiComponent],
      providers:[{provide:SearchApiService, useValue:searchApiServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service when input value is longer than 3 characters', fakeAsync(() => {
    component.searchForm.get('name')?.setValue('test');
    tick(500);
    fixture.detectChanges();
    expect(searchApiServiceMock.getCountryByName).toHaveBeenCalledWith('test');
    expect(component.countries.length).toBe(1);
  }));

   it('should not call service when input value is shorter than 3 characters', fakeAsync(() => {
    component.searchForm.get('name')?.setValue('te');
    tick(500);
    fixture.detectChanges();
    expect(searchApiServiceMock.getCountryByName).not.toHaveBeenCalled();
    expect(component.countries.length).toBe(0);
  }));

  it('should call service when input value is longer than 3 characters but get no results', fakeAsync(() => {
    
    searchApiServiceMock.getCountryByName.and.returnValue(of([]));
    
    component.searchForm.get('name')?.setValue('test');
    tick(500);
    fixture.detectChanges();

    expect(searchApiServiceMock.getCountryByName).toHaveBeenCalledWith('test');
    expect(component.countries.length).toBe(0);
  }));



});
