import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CardService } from './card.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CardService', () => {
  let service: CardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CardService);
    httpMock = TestBed.inject(HttpTestingController);  // Inyectamos HttpTestingController
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería hacer una petición GET y devolver los datos', () => {
    //llamada al servicio
    service.obtenerDatos().subscribe(res => {
      expect(res).toEqual(['dato1', 'dato2']);
    });

    // Esperamos que se haga una solicitud HTTP GET a 'api/datos'
    // Después de que la solicitud HTTP es disparada, interceptamos la solicitud con httpMock.expectOne() 
    // para asegurarnos de que la solicitud que el servicio realizó es la correcta, es decir, que se hace a 'api/datos'
    const req = httpMock.expectOne('api/datos');
    expect(req.request.method).toBe('GET');  // Verificamos que sea un GET
 
    //Aquí simulamos la respuesta de la solicitud HTTP que el servicio hace. 
    // flush() le dice al HttpTestingController que debe emular una respuesta con esos datos como si vinieran de un servidor real
    // para la solicitud que se había hecho previamente (con httpMock.expectOne('api/datos')).
    // al hacer flush el observable (obtenerDatos()) que se había suscrito en el subscribe recibe esos datos como respuesta.

    req.flush(['dato1', 'dato2']);  // Respondemos con los datos simulados

    //el flujo es:
    // Se hace la llamada a obtenerDatos(), lo que dispararía la solicitud HTTP.
    // Se intercepta la solicitud con httpMock.expectOne('api/datos').
    //Luego, se simula que el servidor devuelve ['dato1', 'dato2'] con req.flush(['dato1', 'dato2']).
    //Finalmente, expec() valida que los datos que recibimos en el subscribe sean los que esperábamos (['dato1', 'dato2']).
  });

  afterEach(() => {
    httpMock.verify();  // Verifica que no queden solicitudes pendientes
  });
});
