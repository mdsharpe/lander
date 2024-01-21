import {
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Bounds, Render, Runner } from 'matter-js';
import { GameState } from './game-state';

@Component({
    selector: 'app-game',
    standalone: true,
    imports: [],
    providers: [GameState],
    templateUrl: './game.component.html',
    styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
    constructor(private readonly _state: GameState) {}

    private _render: Render | null = null;

    @ViewChild('worldContainer', { static: true })
    private _worldContainer: ElementRef<HTMLElement> | null = null;

    public ngOnInit(): void {
        this._state.init().then(() => this.setUpRender());
    }

    @HostListener('window:resize', ['$event'])
    public onResize(evt: Event): void {
        this.fitToScreen();
    }

    private fitToScreen(): void {
        if (!this._render || !this._worldContainer) {
            return;
        }

        const container = this._worldContainer.nativeElement;
        this._render.canvas.width = container.clientWidth;
        this._render.canvas.height = container.clientHeight;
    }

    private setUpRender(): void {
        if (!this._worldContainer) {
            return;
        }

        const container = this._worldContainer.nativeElement;

        this._render = Render.create({
            element: container,
            engine: this._state.engine,
            options: {
                width: container.clientWidth,
                height: container.clientHeight,
                wireframes: false
            },
        });

        Render.run(this._render);

        var runner = Runner.create();
        Runner.run(runner, this._state.engine);
    }
}
