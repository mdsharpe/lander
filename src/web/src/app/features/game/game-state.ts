import { Injectable, OnDestroy } from '@angular/core';
import { Bodies, Engine, World, Body, Svg, Vertices } from 'matter-js';

@Injectable()
export class GameState implements OnDestroy {
    public readonly engine = Engine.create();

    private _terrain: Body | null = null;

    public get terrain(): Body {
        if (!this._terrain) {
            throw new Error('Terrain has not been initialized');
        }

        return this._terrain;
    }

    public async init(): Promise<void> {
        await this.initTerrain();

        World.add(this.engine.world, this.terrain);
    }

    public ngOnDestroy(): void {}

    private async initTerrain(): Promise<void> {
        const svg = await this.loadSvg('assets/terrain.svg');

        var vertexSets = Array.from(svg.querySelectorAll('path')).map((path) =>
            Svg.pathToVertices(path, 15)
        );

        if (vertexSets.length !== 1) {
            throw new Error('Terrain SVG must contain exactly one path');
        }

        var vertices = vertexSets[0];

        this._terrain = Body.create({
            position: Vertices.centre(vertices),
            vertices: vertices,
            isStatic: true,
            render: {
                fillStyle: '#894036',
                lineWidth: 0,
            },
        });
    }

    private async loadSvg(url: string): Promise<Document> {
        const response = await fetch(url, { cache: 'no-store' });
        const raw = await response.text();
        return new window.DOMParser().parseFromString(raw, 'image/svg+xml');
    }
}
