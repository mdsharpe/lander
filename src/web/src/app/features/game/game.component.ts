import {
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Bounds, Events, Render, Runner, Vector } from 'matter-js';
import { GameState } from './game-state';

@Component({
    selector: 'app-game',
    standalone: true,
    imports: [],
    providers: [GameState],
    templateUrl: './game.component.html',
    styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit, OnDestroy {
    constructor(private readonly _state: GameState) {}

    private _render: Render | null = null;
    private _onBeforeTick: (() => void) | null = null;

    @ViewChild('worldContainer', { static: true })
    private _worldContainer: ElementRef<HTMLElement> | null = null;

    public ngOnInit(): void {
        this._state
            .init()
            .then(() => this.setUpRender())
            .then(() => this.fitToScreen());
    }

    public ngOnDestroy(): void {}

    @HostListener('window:resize', ['$event'])
    public onResize(evt: Event): void {
        console.log('resize');
        this.fitToScreen();
    }

    private fitToScreen(): void {
        if (!this._render || !this._worldContainer) {
            return;
        }

        const container = this._worldContainer.nativeElement;
        this._render.canvas.width = container.clientWidth;
        this._render.canvas.height = container.clientHeight;
        this._render.options.width = container.clientWidth;
        this._render.options.height = container.clientHeight;
        this._render.bounds.max.x = container.clientWidth;
        this._render.bounds.max.y = container.clientHeight;

        // Render.setPixelRatio(this._render, 1);
        
        Render.lookAt(
            this._render,
            this._state.terrain,
            {
                x: 0,
                y: 0
            },
            true
        )
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
                wireframes: false,
                hasBounds: true,
                pixelRatio: 1
            },
            bounds: this._state.terrain.bounds,
        });

        Render.run(this._render);

        var runner = Runner.create();

        this._onBeforeTick = () => {
            this.recenter();
        };

        Events.on(this._state.engine, 'beforeTick', this._onBeforeTick);

        Runner.run(runner, this._state.engine);
    }

    private recenter(): void {
    }
}
