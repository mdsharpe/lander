import { Routes } from '@angular/router';
import { HomeComponent } from './home';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
    },
    {
        path: 'play',
        pathMatch: 'full',
        loadComponent: () =>
            import('./features/game/game.component').then(
                (mod) => mod.GameComponent
            ),
    },
];
