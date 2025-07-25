import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { SearchApiComponent } from './components/search-api/search-api.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
    path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'cards',
        component: CardComponent,
        title: 'Cards'
    },
     {
        path: 'search',
        component: SearchApiComponent,
        title:'Search'
    },
];
