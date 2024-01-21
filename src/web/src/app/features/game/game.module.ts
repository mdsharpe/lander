import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from './game.routes';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [provideRouter(routes)],
})
export class GameModule {}
