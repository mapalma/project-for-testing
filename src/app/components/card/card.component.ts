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
}
