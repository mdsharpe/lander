import { Routes } from '@angular/router';
import { HomeComponent } from './home';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'play',
        loadChildren: () =>
            import('./features/game/game.module').then((m) => m.GameModule),
    },
];
