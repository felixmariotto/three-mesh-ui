/**
 * Job:
 * - recording components required updates
 * - trigger those updates when 'update' is called
 *
 * This module is a bit special. It is, with FontLibrary, one of the only modules in the 'component'
 * directory not to be used in component composition (Object.assign).
 *
 * When MeshUIComponent is instanciated, it calls UpdateManager.register().
 *
 * Then when MeshUIComponent receives new attributes, it doesn't update the component right away.
 * Instead, it calls UpdateManager.requestUpdate(), so that the component is updated when the user
 * decides it (usually in the render loop).
 *
 * This is best for performance, because when a UI is created, thousands of componants can
 * potentially be instantiated. If they called updates function on their ancestors right away,
 * a given component could be updated thousands of times in one frame, which is very ineficient.
 *
 * Instead, redundant update request are moot, the component will update once when the use calls
 * update() in their render loop.
 */
declare class UpdateManager {
    static requestUpdate(component: any, updateParsing: any, updateLayout: any, updateInner: any): void;
    /** Register a passed component for later updates */
    static register(component: any): void;
    /** Unregister a component (when it's deleted for instance) */
    static disposeOf(component: any): void;
    /** Trigger all requested updates of registered components */
    static update(): void;
    /**
     * Calls parseParams update of all components from parent to children
     * @private
     */
    private static traverseParsing;
    /**
     * Calls updateLayout and updateInner functions of components that need an update
     * @private
     */
    private static traverseUpdates;
}
declare namespace UpdateManager {
    const components: any[];
    const requestedUpdates: {};
}
export default UpdateManager;
