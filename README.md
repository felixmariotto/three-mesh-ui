# Three-Mesh-UI
Three-Mesh-UI helps in easily adding user interface in a Three.js scene, in order to make better VR experiences

## overview

**MeshUIComponent:**
This is the base class, containing what will be common to all the component of the library :

*Properties:*
- fontFamily: font that is found for creating text shape AND positioning in height and so forth
- fontSize: font size in world units
- fontMaterial: material, one instance is shared between all the components that use it, since all these components will be merged. If a component uses this material but another one when hover or when click, then a different instance of the material is used
- children
- parent
- type
- id: automatically generated

*Methods:*
- getFontFamily: look for the fontFamily property, and if does not exist, find it in parent(s)
- getFontSize: idem
- getFontMaterial: idem
- appendChild
- removeChild
- setFont: for the user to give the url of the font they want for this component and its children
- \_updateFont: called by FontLibrary to update the element whose font just loaded

**Layout:**
This is a frame class, that can interlock on into another.
Is is a very simple class, that does not know anything about what is inside.

