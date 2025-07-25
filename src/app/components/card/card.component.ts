import { Component } from '@angular/core';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  datos: any[] = [];
 
  constructor(private cardService: CardService){}

  ngOnInit() {
    this.cardService.obtenerDatos().subscribe((res) => {
      this.datos = res;
    });
  }

//   transformToNumber(value: any): Number{
//     return +value
//   }

//   validateStringNotEmpty(value: String) {
//   if (value.trim().length === 0) {
//     throw new Error('Invalid input - must not be empty.');
//   }
// }

//   validateNumber(num: any) {
//     if (isNaN(num)) {
//       throw new Error('Invalid number input.');
//     }
//   }

}
