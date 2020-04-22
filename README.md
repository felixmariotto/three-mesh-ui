# Three-Mesh-UI
Three-Mesh-UI helps in easily adding user interface in a Three.js scene, in order to make better VR experiences

## overview

The module would procude objects of these classes :

**ComponentMap:**
This is in module scope, and holds a map of the non-animated objects using the same materials.
When an update is executed, the module keeps track of the updates, and when it's finished, it merges the geometries which can be merged all at once, then add what must be added to the scene.

**MeshUIComponent:**
This is the base class, containing what will be common to all the component of the library :

*Properties:*
- fontFamily: font that is found for creating text shape AND positioning in height and so forth
- fontSize: font size in world units
- fontMaterial: material, one instance is shared between all the components that use it, since all these components will be merged. If a component uses this material but another one when hover or when click, then a different instance of the material is used
- children
- parent
- threeElement
- type

*Methods:*
- getFontFamily: look for the fontFamily property, and if does not exist, find it in parent(s)
- getFontSize: idem
- getFontMaterial: idem
- appendChild
- removeChild

**Layout:**
This is a frame class, that can interlock on into another.
Is is a very simple class, that does not know anything about what is inside.

