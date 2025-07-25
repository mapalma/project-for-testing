import { TestBed } from '@angular/core/testing';

import { SearchApiService } from './search-api.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { mockCountry } from '../mocks/country.mock';

describe('SearchApiService', () => {
  let service: SearchApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(SearchApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should do a GET request to get countries by name', () => {
    service.getCountryByName('test').subscribe(res => {
      expect(res).toEqual(mockCountry);
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/name/test');
    expect(req.request.method).toBe('GET');

    req.flush(mockCountry);
  });

   afterEach(() => {
    httpMock.verify();  // Verifica que no queden solicitudes pendientes
  });
});
