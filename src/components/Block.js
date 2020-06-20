
/*

Job:
- Update a Block component
- Calls BoxComponent's API to position its children box components
- Calls InlineManager's API to position its children inline components
- Call creation and update functions of its background planes

*/

import { Object3D } from 'three/src/core/Object3D.js';

import BoxComponent from './core/BoxComponent.js';
import InlineManager from './core/InlineManager.js';
import MeshUIComponent from './core/MeshUIComponent.js';
import MaterialManager from './core/MaterialManager.js';

import Frame from '../content/Frame.js';
import deepDelete from '../utils/deepDelete.js';
import { mix } from '../utils/mix.js';

export default class Block extends mix.withBase( Object3D )(
    BoxComponent,
    InlineManager,
    MaterialManager,
    MeshUIComponent,
) {

    constructor( options ) {

        super( options );

        this.isBlock = true;

        //

        this.frameContainer = new Object3D();

        this.add( this.frameContainer );

        // Lastly set the options parameters to this object, which will trigger an update
        
        this.set( options );

    }

    ////////////
    //  UPDATE
    ////////////

    parseParams( resolve ) { resolve() }

    updateLayout() {

        // Get temporary dimension

        const WIDTH = this.getWidth();

        const HEIGHT = this.getHeight();

        if ( !WIDTH || !HEIGHT ) {
            console.warn('Block got no dimension from its parameters or from children parameters');
            return
        }

        // Position this element according to earlier parent computation.
        // Delegate to BoxComponent.

        this.setPosFromParentRecords();

        // Position inner elements according to dimensions and layout parameters.
        // Delegate to BoxComponent.

        if ( !this.children.find( child => child.isInline ) ) {

            this.computeChildrenPosition();

        } else {

            this.computeInlinesPosition();

        }
        
        // Cleanup previous depictions

        deepDelete( this.frameContainer );

        // Create new visible frame

        this.frame = new Frame(
            WIDTH,
            HEIGHT,
            this.getBorderRadius(),
            this.getBackgroundSize(),
            this.getBackgroundMaterial()
        );

        this.frame.renderOrder = this.getParentsNumber();

        const component = this;

        // This is for hiddenOverflow to work
        this.frame.onBeforeRender = function() {

            if ( component.updateClippingPlanes ) {

                component.updateClippingPlanes();

            }

        };

        this.frameContainer.add( this.frame );

        // We check if this block is the root component,
        // because most of the time the user wants to set the
        // root component's z position themselves
        if ( this.getUIParent() ) {

            this.position.z = this.getOffset();

        }

    }

    //

    updateInner() {

        // We check if this block is the root component,
        // because most of the time the user wants to set the
        // root component's z position themselves
        if ( this.getUIParent() ) {

            this.position.z = this.getOffset();

        }

        if ( this.frame ) this.updateBackgroundMaterial();
        
    }

}
