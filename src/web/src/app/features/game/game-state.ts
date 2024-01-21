import { Injectable, OnDestroy } from '@angular/core';
import {
    Bodies,
    Composite,
    Engine,
    World,
    Body,
    Vertices,
    Svg,
} from 'matter-js';

@Injectable()
export class GameState implements OnDestroy {
    public readonly engine = Engine.create();

    private _terrain: any;

    public async init(): Promise<void> {
        this._terrain = await this.createTerrain();

        World.add(this.engine.world, this._terrain);
    }

    public ngOnDestroy(): void {}

    private async createTerrain(): Promise<Body> {
        const svg = await this.loadSvg('assets/terrain.svg');

        var vertexSets = Array.from(svg.querySelectorAll('path')).map((path) =>
            Svg.pathToVertices(path, 15)
        );

        var terrain = Bodies.fromVertices(
            0,
            0,
            vertexSets,
            {
                isStatic: true,
                render: {
                    fillStyle: '#894036',
                    lineWidth: 0
                },
            },
            true
        );

        Body.scale(terrain, 5, 5);

        Body.translate(terrain, {
            x: (terrain.bounds.max.x - terrain.bounds.min.x) / 2,
            y: (terrain.bounds.max.y - terrain.bounds.min.y) / 2,
        });

        return terrain;
    }

    private async loadSvg(url: string): Promise<Document> {
        const response = await fetch(url, { cache: 'no-store' });
        const raw = await response.text();
        return new window.DOMParser().parseFromString(raw, 'image/svg+xml');
    }
}
