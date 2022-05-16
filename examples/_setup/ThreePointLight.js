import { Object3D, PointLight, PointLightHelper } from 'three';

let pointLightContainer, pointLight, pointLightHelper;


export const exampleThreePointLight = function ( scene ) {

	pointLightContainer = new Object3D();
	pointLightContainer.rotation.z = 0.45;
	pointLightContainer.position.set(0,1.5,0);

	pointLight = new PointLight(0xffFF99,3);
	pointLight.position.set(1.45,0,0);
	pointLightContainer.add(pointLight)

	pointLightHelper = new PointLightHelper(pointLight,0.15,0xff0000);
	scene.add(pointLightHelper);
	scene.add(pointLightContainer);

	return { pointLightContainer, pointLight, pointLightHelper };

}

export const rollPointLightUpdate = function (){

	pointLightContainer.rotation.y += 1 / 60;

}

