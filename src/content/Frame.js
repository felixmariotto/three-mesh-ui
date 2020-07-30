
import { ShapeBufferGeometry } from 'three';
import { Mesh } from 'three';
import { Vector2 } from 'three';
import { Shape } from 'three';

/**
 * Job: Create and return a plane mesh according to dimensions and style parameters
 * 
 * Knows: Dimension and style of the plane to create
 */
export default class Frame extends Mesh {

    constructor( width, height, borderRadius, backgroundSize, material ) {

        const shape = new RoundedRectShape( width, height, borderRadius );

        const geometry = new ShapeBufferGeometry( shape );

        super( geometry, material );

        this.castShadow = true;
        this.receiveShadow = true;
        
        this.name = "MeshUI-Frame";

        this.width = width;
        this.height = height;

        this.updateUVs( backgroundSize ); // cover, contain, or stretch

    }

    /**
     * Call the right function to update the geometry UVs depending on the backgroundSize param
     * @private
     */
    updateUVs( backgroundSize ) {

        switch( backgroundSize ) {

        case 'stretch' :
            this.mapStretchUVs();
            break

        case 'contain' :
            if (!this.mapFitUVs( backgroundSize ))
                this.mapStretchUVs();
            break

        case 'cover' :
            if (!this.mapFitUVs( backgroundSize ))
                this.mapStretchUVs();
            break

        default :
            console.warn(`'${ backgroundSize }' is an unknown value for the backgroundSize attribute`)

        }

        this.geometry.attributes.uv.needsUpdate = true;

    }

    /**
     * Update the UVs of the geometry so that the
     * left-most point will be u = 0 and the right-most
     * point will be u = 1. Same for V direction.
     * @private
     */
    mapStretchUVs() {

        const uvAttribute = this.geometry.attributes.uv;
        const posAttribute = this.geometry.attributes.position;

        const dummyVec = new Vector2();
        const offset = new Vector2( this.width / 2, this.height / 2 );
            
        for ( let i = 0; i < posAttribute.count; i ++ ) {
                
            dummyVec.x = posAttribute.getX( i );
            dummyVec.y = posAttribute.getY( i );

            dummyVec.add( offset );

            // Stretch the texture to make it size like the geometry
            dummyVec.x /= this.width;
            dummyVec.y /= this.height;

            uvAttribute.setXY( i, dummyVec.x, dummyVec.y );

        }

    }

    /**
     * Update the UVs of the passed geometry so that the passed texture
     * is not deformed and is fit to the geometry's border.
     * Depending on the backgroundSize parameter, the texture will
     * overflow in the smallest axis of the geometry and fit the widest,
     * or the reverse.
     * @private
     */
    mapFitUVs( backgroundSize ) {

        const texture = this.material.uniforms.u_texture ?
            this.material.uniforms.u_texture.value :
            null;

        if (!texture) return false

        const imageHeight = texture.image.height;
        const imageWidth = texture.image.width;

        // get the dimension of the texture that fit the Y direction of the geometry
        const yFitDimensions = new Vector2(
            (this.height * imageWidth) / imageHeight,
            this.height
        );

        // get the dimension of the texture that fit the X direction of the geometry
        const xFitDimensions = new Vector2(
            this.width,
            (this.width * imageHeight) / imageWidth
        );

        // Depending on the backgroundSize attribute, we keep either yFitDimensions or xFitDimensions

        let fitDimensions;

        if ( backgroundSize === "contain" ) {

            fitDimensions = xFitDimensions.length() < yFitDimensions.length() ? xFitDimensions : yFitDimensions;
        
        } else {

            fitDimensions = xFitDimensions.length() > yFitDimensions.length() ? xFitDimensions : yFitDimensions;

        }

        // Update UVs

        const uvAttribute = this.geometry.attributes.uv;
        const posAttribute = this.geometry.attributes.position;

        const dummyVec = new Vector2();
        const offset = new Vector2( this.width / 2, this.height / 2 );
            
        for ( let i = 0; i < posAttribute.count; i ++ ) {
                
            dummyVec.x = posAttribute.getX( i );
            dummyVec.y = posAttribute.getY( i );

            dummyVec.add( offset );

            // resize the texture so it does not stretch
            dummyVec.x /= fitDimensions.x;
            dummyVec.y /= fitDimensions.y;

            // center the texture
            dummyVec.x -= (( this.width / fitDimensions.x ) / 2) - 0.5;
            dummyVec.y -= (( this.height / fitDimensions.y ) / 2) - 0.5;

            uvAttribute.setXY( i, dummyVec.x, dummyVec.y );

        }

        return true

    }

}

/** A THREE.Shape of rounded rectangle */
class RoundedRectShape extends Shape {

    constructor( width, height, radius ) {

        super();

        const x = - width / 2 ;
        const y = - height / 2 ;

        this.moveTo( x, y + radius );
        this.lineTo( x, y + height - radius );
        this.quadraticCurveTo( x, y + height, x + radius, y + height );
        this.lineTo( x + width - radius, y + height );
        this.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
        this.lineTo( x + width, y + radius );
        this.quadraticCurveTo( x + width, y, x + width - radius, y );
        this.lineTo( x + radius, y );
        this.quadraticCurveTo( x, y, x, y + radius );

    }

}
