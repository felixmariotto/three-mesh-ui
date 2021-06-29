
import { PlaneGeometry } from 'three';
import { Mesh } from 'three';
import { Vector2 } from 'three';
import { Shape } from 'three';

/**
 * Returns a basic plane mesh.
 */
export default class Frame extends Mesh {

    constructor( material ) {

        const geometry = new PlaneGeometry();

        super( geometry, material );

        this.castShadow = true;
        this.receiveShadow = true;

        this.name = "MeshUI-Frame";

    }

}
