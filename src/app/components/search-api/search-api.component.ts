import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, debounceTime, filter, of, switchMap, tap } from 'rxjs';
import { SearchApiService } from '../../services/search-api.service';
import { Country } from '../../models/country.model';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-search-api',
  standalone: true,
  imports: [ReactiveFormsModule, KeyValuePipe],
  templateUrl: './search-api.component.html',
  styleUrl: './search-api.component.scss'
})

export class SearchApiComponent {
  countries: Country[] = [];
  showNoResultsMsg = false;

  searchForm = inject(FormBuilder).group({
      name:['', Validators.minLength(3)]
  });

  constructor(private searchApiService: SearchApiService){}

  ngOnInit(): void {
    this.searchForm.get('name')?.valueChanges.pipe(
      debounceTime(500),
      filter((value): value is string => value !== null),
      tap((value) => {
        if (value.trim() === '' || value.length < 3) {
          this.countries = []; 
          this.showNoResultsMsg = false;
        }
      }),   
      filter((value) => value.length > 2),
      switchMap(value => this.searchApiService.getCountryByName(value).pipe(
         catchError(err => {
          return of([]); // Retorna un observable vacío para que no se cancele el flujo
        })
      ))
    ).subscribe(data => {
      if(data.length > 0){
        this.countries = [...data]
      } else  {
        this.countries = [];
        this.showNoResultsMsg = true;
      }
    });
  }

}
