import { Injectable, OnDestroy } from '@angular/core';
import { Bodies, Composite, Engine, World, Body } from 'matter-js';

@Injectable()
export class GameState implements OnDestroy {
    public readonly engine = Engine.create();

    private _terrain: any;

    public init(): void {
        this._terrain = this.createTerrain();

        World.add(this.engine.world, this._terrain);

        var boxA = Bodies.rectangle(400, 200, 80, 80);
        var boxB = Bodies.rectangle(450, 50, 80, 80);
        var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

        // add all of the bodies to the world
        Composite.add(this.engine.world, [boxA, boxB, ground]);
    }

    public ngOnDestroy(): void {}

    private createTerrain(): Body {
        return Bodies.fromVertices(
            0,
            0,
            [
                [
                    { x: 0, y: 0 },
                    { x: 100, y: 100 },
                    { x: 0, y: 100 },
                ],
            ],
            {
                isStatic: true,
                frictionStatic: 1,
            }
        );
    }
}
