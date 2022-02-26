# three-mesh-ui

<a href="https://three-mesh-ui.herokuapp.com/#interactive_button">
  <img alt="buttons example" target="_blank" src="https://felixmariotto.s3.eu-west-3.amazonaws.com/three-mesh-ui-teasers/buttons_opti.gif" width="45%">
</a>

<a href="https://three-mesh-ui.herokuapp.com/#hidden_overflow">
  <img alt="tuto example" target="_blank" src="https://felixmariotto.s3.eu-west-3.amazonaws.com/three-mesh-ui-teasers/hidden_overflow_opti.gif" width="45%">
</a>

<a href="https://three-mesh-ui.herokuapp.com/#nested_blocks">
  <img alt="big text example" target="_blank" src="https://felixmariotto.s3.eu-west-3.amazonaws.com/three-mesh-ui-teasers/nested_layout_opti.gif" width="45%">
</a>

<a href="https://three-mesh-ui.herokuapp.com/#keyboard">
  <img alt="big text example" target="_blank" src="https://felixmariotto.s3.eu-west-3.amazonaws.com/three-mesh-ui-teasers/keyboard_opti.gif" width="45%">
</a>

## [Examples (live)](https://felixmariotto.github.io/three-mesh-ui/) &nbsp;|	&nbsp;[NPM](https://www.npmjs.com/package/three-mesh-ui)	&nbsp;|	&nbsp;[Documentation](https://github.com/felixmariotto/three-mesh-ui/wiki)	&nbsp;|	&nbsp;[Contributing](https://github.com/felixmariotto/three-mesh-ui/wiki/Roadmap-&-Contributions)

# What is it ?

**three-mesh-ui** is a small library for building VR user interfaces. The objects it creates are [three.object3Ds](https://github.com/mrdoob/three.js/blob/dev/src/core/Object3D.js), usable directly in a [three.js](https://threejs.org) scene like any other Object3D.    
        
**It is not a framework**, but a minimalist library to be used with the last version of three.js. It has no dependency but three.js.

# Why ?

In a normal three.js workflow, the common practice is to build user interfaces with HTML/CSS.

In immersive VR, it is impossible, therefore this library was created.

# Quick Start

## Try it now

Give it a try in [this jsFiddle](https://jsfiddle.net/felixmariotto/y81rf5t2/44/)

Using react-three-fiber ? Here is a [codesandbox](https://codesandbox.io/s/react-three-mesh-ui-forked-v7n0b?file=/src/index.js) to get started.

## Import
### JSM
**With NPM and ES6 :**   
In your console : `npm install three-mesh-ui`
```javascript
import ThreeMeshUI from 'three-mesh-ui'
```

**With NPM and CommonJS :**   
In your console : `npm install three-mesh-ui`
```javascript
const ThreeMeshUI = require('three-mesh-ui');
```

**With HTML &lt;script&gt; tag :**
```html
<script type="module">
    import * as THREE from 'https://cdn.skypack.dev/three@<version>';
    import * ThreeMeshUI from 'not-available-at-the-moment';
    // We currently didn't have a bundled jsm file :,( 
    // Please be welcome to contribute if this is something you use. :)
</script>
```


### JS
**With HTML &lt;script&gt; tag :**
```html
<!-- threejs is not anymore include in the three-mesh-ui bundle -->
<!-- you must then load the three dependency -->
<script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'></script>
<!-- before loading three-mesh-ui -->
<script src='https://unpkg.com/three-mesh-ui'></script>
```

*Although this would theorically allows you to build 'something', loading js libraries instead of using jsm, might restrict the global features you would have. This is true for both three and three-mesh-ui libraries.*


## Font files

In order to display some text with three-mesh-ui, you will need to provide font files.   
You can use the two files named `Roboto-msdf` in [this directory](https://github.com/felixmariotto/three-mesh-ui/tree/master/examples/assets), or [create your own font files](https://github.com/felixmariotto/three-mesh-ui/wiki/Creating-your-own-fonts)

## API

Here is an example of basic three-mesh-ui usage : 

```javascript
const container = new ThreeMeshUI.Block({
 width: 1.2,
 height: 0.7,
 padding: 0.2,
 fontFamily: './assets/Roboto-msdf.json',
 fontTexture: './assets/Roboto-msdf.png',
});

//

const text = new ThreeMeshUI.Text({
 content: "Some text to be displayed"
});

container.add( text );

// scene is a THREE.Scene (see three.js)
scene.add( container );

// This is typically done in the render loop :
ThreeMeshUI.update();
```

