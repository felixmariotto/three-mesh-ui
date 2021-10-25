
import { Plane } from 'three';
import { Vector3 } from 'three';

import FontLibrary from './FontLibrary.js';
import UpdateManager from './UpdateManager.js';

import DEFAULTS from '../../utils/Defaults.js';

/**

Job:
- Set this component attributes and call updates accordingly
- Getting this component attribute, from itself or from its parents
- Managing this component's states

This is the core module of three-mesh-ui. Every component is composed with it.
It owns the principal public methods of a component : set, setupState and setState.

@template {!Constructor<import('three').Object3D>} T
@param {T} Base

*/
export default function MeshUIComponent( Base ) {

	return class MeshUIComponent extends Base {

        states = {};
        /** @type {string | undefined} */
        currentState = undefined;
        isUI = true;
        autoLayout = true;

        /////////////
        /// GETTERS
        /////////////

        getClippingPlanes() {

            const planes = [];

            if ( this.parent && this.parent.isUI ) {

                if ( this.isBlock && this.parent.getHiddenOverflow() ) {

                    const yLimit = ( this.parent.getHeight() / 2 ) - ( this.parent.padding || 0 );
                    const xLimit = ( this.parent.getWidth() / 2 ) - ( this.parent.padding || 0 );

                    const newPlanes = [
                        new Plane( new Vector3( 0, 1, 0 ), yLimit ),
                        new Plane( new Vector3( 0, -1, 0 ), yLimit ),
                        new Plane( new Vector3( 1, 0, 0 ), xLimit ),
                        new Plane( new Vector3( -1, 0, 0 ), xLimit )
                    ];

                    newPlanes.forEach( plane => {

                        plane.applyMatrix4( this.parent.matrixWorld );

                    });

                    planes.push( ...newPlanes );

                }

                if ( this.parent.parent && this.parent.parent.isUI ) {

                    planes.push( ...this.parent.getClippingPlanes() );

                }

            }

            return planes;

        }

        //

        getUIChildren() {

            return this.children.filter( (child)=> {

                return child.isUI

            });

        }

        //

        getUIParent() {

            if ( this.parent && this.parent.isUI ) {

                return this.parent

            } 

            return null

            

        }

        /** Get the highest parent of this component (the parent that has no parent on top of it) */
        getHighestParent() {

            if ( !this.getUIParent() ) {

                return this

            } 

            return this.parent.getHighestParent();

            

        }

        /**
         * look for a property in this object, and if does not find it, find in parents or return default value
         * @private
         */
        _getProperty( propName ) {

            if ( this[ propName ] === undefined && this.getUIParent() ) {

                return this.parent._getProperty( propName )

            } else if ( this[ propName ] ) {

                return this[ propName ]

            } 

            return DEFAULTS[ propName ]

            ;

        }

        //

        getFontSize() {
            return this._getProperty( 'fontSize' );
        }

        getFontTexture() {
            return this._getProperty( 'fontTexture' );
        }

        getFontFamily() {
            return this._getProperty( 'fontFamily' );
        }

        getBreakOn() {
            return this._getProperty( 'breakOn' );
        }

        getTextType() {
            return this._getProperty( 'textType' );
        }

        getFontColor() {
            return this._getProperty( 'fontColor' );
        }

        getFontOpacity() {
            return this._getProperty( 'fontOpacity' );
        }

        getBorderRadius() {
            return this._getProperty( 'borderRadius' );
        }

        getBorderWidth() {
            return this._getProperty( 'borderWidth' );
        }

        getBorderColor() {
            return this._getProperty( 'borderColor' );
        }

        /// SPECIALS

        /** return the first parent with a 'threeOBJ' property */
        getContainer() {

            if ( !this.threeOBJ && this.parent ) {

                return this.parent.getContainer();

            } else if ( this.threeOBJ ) {

                return this

            } 

            return DEFAULTS.container

            

        }

        /** Get the number of UI parents above this elements (0 if no parent) */
        getParentsNumber( i ) {

            i = i || 0;

            if ( this.getUIParent() ) {

                return this.parent.getParentsNumber( i + 1 )

            } 

            return i

            ;

        }

        ////////////////////////////////////
        /// GETTERS WITH NO PARENTS LOOKUP
        ////////////////////////////////////

        getBackgroundOpacity() {
            return ( !this.backgroundOpacity && this.backgroundOpacity !== 0 ) ?
                DEFAULTS.backgroundOpacity : this.backgroundOpacity;
        }

        getBackgroundColor() {
            return this.backgroundColor || DEFAULTS.backgroundColor;
        }

        getBackgroundTexture() {
            return this.backgroundTexture || DEFAULTS.backgroundTexture;
        }

        getAlignContent() {
            return this.alignContent || DEFAULTS.alignContent;
        }

        getContentDirection() {
            return this.contentDirection || DEFAULTS.contentDirection;
        }

        getJustifyContent() {
            return this.justifyContent || DEFAULTS.justifyContent;
        }

        getInterLine() {
            return (this.interLine === undefined) ? DEFAULTS.interLine : this.interLine;
        }

        getOffset() {
            return (this.offset === undefined) ? DEFAULTS.offset : this.offset;
        }

        getBackgroundSize() {
            return (this.backgroundSize === undefined) ? DEFAULTS.backgroundSize : this.backgroundSize;
        }

        getHiddenOverflow() {
            return (this.hiddenOverflow === undefined) ? DEFAULTS.hiddenOverflow : this.hiddenOverflow;
        }

        ///////////////
        ///  UPDATE
        ///////////////

        /**
         * When the user calls component.add, it registers for updates,
         * then call THREE.Object3D.add.
         */
        add() {

            for ( const id of Object.keys(arguments) ) {

                // An inline component relies on its parent for positioning
                if ( arguments[id].isInline ) this.update( null, true );

            }

            return super.add( ...arguments );

        }

        /**
         * When the user calls component.remove, it registers for updates,
         * then call THREE.Object3D.remove.
         */
        remove() {

            for ( const id of Object.keys(arguments) ) {

                // An inline component relies on its parent for positioning
                if ( arguments[id].isInline ) this.update( null, true );

            }

            return super.remove( ...arguments );

        }

        //

        update( updateParsing, updateLayout, updateInner ) {

            UpdateManager.requestUpdate( this, updateParsing, updateLayout, updateInner );

        }

        onAfterUpdate() {}

        /**
         * Called by FontLibrary when the font requested for the current component is ready.
         * Trigger an update for the component whose font is now available.
         * @private - "package protected"
         */
        _updateFontFamily( font ) {

            this.fontFamily = font;
            
            this.traverse( (child)=> {

                if ( child.isUI ) child.update( true, true, false );

            });

            this.getHighestParent().update( false, true, false );

        }

        /** @private - "package protected" */
        _updateFontTexture( texture ) {

            this.fontTexture = texture;

            this.getHighestParent().update( false, true, false );

        }

        /**
         * Set this component's passed parameters.
         * If necessary, take special actions.
         * Update this component unless otherwise specified.
         */
        set( options ) {

            let parsingNeedsUpdate, layoutNeedsUpdate, innerNeedsUpdate;

            // Register to the update manager, so that it knows when to update

            UpdateManager.register( this );

            // Abort if no option passed

            if ( !options || JSON.stringify(options) === JSON.stringify({}) ) return

            // Set this component parameters according to options, and trigger updates accordingly
            // The benefit of having two types of updates, is to put everthing that takes time
            // in one batch, and the rest in the other. This way, efficient animation is possible with
            // attribute from the light batch.

            for ( const prop of Object.keys(options) ) {

                switch ( prop ) {
                        
                // TODO List all the following props as fields on this class, so that they are picked up by intellisense.

                case "content" :
                case "fontSize" :
                    if ( this.isText ) parsingNeedsUpdate = true;
                    layoutNeedsUpdate = true;
                    this[ prop ] = options[ prop ];
                    break;

                case "width" :
                case "height" :
                case "padding" :
                    if ( this.isInlineBlock ) parsingNeedsUpdate = true;
                    layoutNeedsUpdate = true;
                    this[ prop ] = options[ prop ];
                    break;

                case "fontSize" :
                case "interLine" :
                case "margin" :
                case "contentDirection" :
                case "justifyContent" :
                case "alignContent" :
                case "textType" :
                case "src" :
                    layoutNeedsUpdate = true;
                    this[ prop ] = options[ prop ];
                    break;

                case "fontColor" :
                case "fontOpacity" :
                case "offset" :
                case "backgroundColor" :
                case "backgroundOpacity" :
                case "backgroundTexture" :
                case "backgroundSize" :
                case "borderRadius" :
                case "borderWidth" :
                case "borderColor" :
                    innerNeedsUpdate = true;
                    this[ prop ] = options[ prop ];
                    break;

                case "hiddenOverflow" :
                    this[ prop ] = options[ prop ];
                    break

                }

            }

            // special cases, this.update() must be called only when some files finished loading

            if ( options.fontFamily ) {
                FontLibrary.setFontFamily( this, options.fontFamily );
                layoutNeedsUpdate = false;
            }

            if ( options.fontTexture ) {
                FontLibrary.setFontTexture( this, options.fontTexture );
                layoutNeedsUpdate = false;
            }
            
            // Call component update

            this.update( parsingNeedsUpdate, layoutNeedsUpdate, innerNeedsUpdate );

            if ( layoutNeedsUpdate ) this.getHighestParent().update( false, true, false );

        }

        /////////////////////
        // STATES MANAGEMENT
        /////////////////////

        /** Store a new state in this component, with linked attributes */
        setupState( options ) {

            this.states[ options.state ] = {
                attributes: options.attributes,
                onSet: options.onSet
            };

        }

        /** Set the attributes of a stored state of this component */
        setState( state ) {

            const savedState = this.states[ state ];
            
            if ( !savedState ) {
                console.warn(`state "${ state }" does not exist within this component`);
                return
            }

            if ( state === this.currentState ) return

            this.currentState = state;

            if ( savedState.onSet ) savedState.onSet();

            if ( savedState.attributes ) this.set( savedState.attributes );

        }

        /** Get completely rid of this component and its children, also unregister it for updates */
        clear() {

            this.traverse( (obj)=> {

                UpdateManager.disposeOf( obj );

                if ( obj.material ) obj.material.dispose();

                if ( obj.geometry ) obj.geometry.dispose();

            });

        }
	};

}
