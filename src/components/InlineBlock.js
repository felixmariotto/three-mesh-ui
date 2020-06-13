
import { Object3D } from 'three/src/core/Object3D.js';

import InlineComponent from './core/InlineComponent.js';
import BoxComponent from './core/BoxComponent.js';
import InlineManager from './core/InlineManager.js';
import MeshUIComponent from './core/MeshUIComponent.js';
import MaterialManager from './core/MaterialManager.js';

import Frame from '../content/Frame.js';
import DeepDelete from '../utils/DeepDelete.js';

/**
 * Job:
 * - computing its own size according to user measurements or content measurement
 * - creating an 'inlines' object with info, so that the parent component can organise it along with other inlines
 * 
 * Knows:
 * - Its measurements parameter
 * - Parent block
 */
export default class InlineBlock extends Object3D {

    constructor( options ) {

        super();

        Object.assign(
            this,
            InlineComponent(),
            BoxComponent(),
            InlineManager(),
            MaterialManager(),
            MeshUIComponent()
        );

        this.isInlineBlock = true;

        //

        this.frameContainer = new Object3D();

        this.add( this.frameContainer );

        this.set( options );

    }

    ///////////
    // UPDATES
    ///////////

    parseParams( resolve ) {

        // Get image dimensions

        if ( !this.width ) console.warn('inlineBlock has no width. Set to 0.3 by default');
        if ( !this.height ) console.warn('inlineBlock has no height. Set to 0.3 by default');

        const WIDTH = this.width || 0.3;
        const HEIGHT = this.height || 0.3;

        this.inlines = [{
            height: HEIGHT,
            width: WIDTH,
            anchor: 0,
            lineBreak: "possible"
        }];

        resolve();

    }

    //


    /**
     * Create text content
     * 
     * At this point, text.inlines should have been modified by the parent
     * component, to add xOffset and yOffset properties to each inlines.
     * This way, TextContent knows were to position each character.
     * 
     */
    updateLayout() {

        DeepDelete( this.frameContainer );

        if ( this.inlines ) {

            const options = this.inlines[0];

            this.frame = new Frame(
                options.width,
                options.height,
                this.getBorderRadius(),
                this.getBackgroundSize(),
                this.getBackgroundMaterial()
            );

            // basic translation to put the plane's left bottom corner at the center of its space
            this.position.set( options.width / 2, options.height / 2, 0 );

            // translation required by inlineManager to position this component inline
            this.position.x += options.offsetX;
            this.position.y += options.offsetY;

            this.frame.renderOrder = this.getParentsNumber();

            const component = this;

            this.frame.onBeforeRender = function() {

                if ( component.updateClippingPlanes ) {

                    component.updateClippingPlanes();

                }

            };

            this.frameContainer.add( this.frame );

        }

        // Position inner elements according to dimensions and layout parameters.
        // Delegate to BoxComponent.

        if ( !this.children.find( child => child.isInline ) ) {

            this.computeChildrenPosition();

        } else {

            this.computeInlinesPosition();

        }

        this.position.z = this.getOffset();

    }

    //

    updateInner() {

        this.position.z = this.getOffset();

    }

}
