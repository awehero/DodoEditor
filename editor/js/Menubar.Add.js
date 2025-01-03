import * as THREE from 'three';

import { UIPanel, UIRow } from './libs/ui.js';

import { AddObjectCommand } from './commands/AddObjectCommand.js';

function MenubarAdd( editor ) {

	const strings = editor.strings;

	const container = new UIPanel();
	container.setClass( 'menu' );

	const title = new UIPanel();
	title.setClass( 'title' );
	title.setTextContent( strings.getKey( 'menubar/add' ) );
	container.add( title );

	const options = new UIPanel();
	options.setClass( 'options' );
	container.add( options );

	// Group

	// let option = new UIRow();
	// option.setClass( 'option' );
	// option.setTextContent( strings.getKey( 'menubar/add/group' ) );
	// option.onClick( function () {

	// 	const mesh = new THREE.Group();
	// 	mesh.name = 'Group';

	// 	editor.execute( new AddObjectCommand( editor, mesh ) );

	// } );
	// options.add( option );

	// Mesh

	// submenu example
	// const meshSubmenuTitle = new UIRow().setTextContent( strings.getKey( 'menubar/add/mesh' ) ).addClass( 'option' ).addClass( 'submenu-title' );
	// meshSubmenuTitle.onMouseOver( function () {

	// 	const { top, right } = meshSubmenuTitle.dom.getBoundingClientRect();
	// 	const { paddingTop } = getComputedStyle( this.dom );
	// 	meshSubmenu.setLeft( right + 'px' );
	// 	meshSubmenu.setTop( top - parseFloat( paddingTop ) + 'px' );
	// 	meshSubmenu.setStyle( 'max-height', [ `calc( 100vh - ${top}px )` ] );
	// 	meshSubmenu.setDisplay( 'block' );

	// } );
	// meshSubmenuTitle.onMouseOut( function () {

	// 	meshSubmenu.setDisplay( 'none' );

	// } );
	// options.add( meshSubmenuTitle );

	// const meshSubmenu = new UIPanel().setPosition( 'fixed' ).addClass( 'options' ).setDisplay( 'none' );
	// meshSubmenuTitle.add( meshSubmenu );

	// Mesh / Box

	let option = new UIRow();
	option.setClass( 'option' );
	option.setId('addPlatform');
	option.setTextContent( strings.getKey( 'menubar/add/box' ) );
	option.onClick( function () {

		const geometry = new THREE.BoxGeometry( 1, 1, 1, 1, 1, 1 );
		const loader = new THREE.TextureLoader();
		loader.load( 'images/textures/bright.png', function ( texture ) {

			texture.colorSpace = THREE.SRGBColorSpace;
			const material = new THREE.MeshBasicMaterial( { map: texture } );
			const mesh = new THREE.Mesh( geometry, material );
			mesh.name = 'Box';
			mesh.userData.CustomTexture = [ 'images/textures/bright.png' ];
			mesh.userData.effects = {"use": "","drift": false,"jump": true,"jh": null,"js": null,"turn": null,"speed": null,"dx": null,"dy": null,"dz": null,"sl": null,"sr": null,"id": null,"mx": null,"my": null,"mz": null,"rx": null,"ry": null,"rz": null,"gx": null,"gy": null,"gz": null,"bou": null,"mass": null,"fr": null,"air": true,"topr": null,"k": false,"d": null,"eye": null,"fov": null,"tx": null,"ty": null,"tz": null,"cd": null,"cr": null,"msg": "","br": null,"bg": "","amb": "","dif": "","spe": "","gro": ""};

			editor.execute( new AddObjectCommand( editor, mesh ) );

		} );

	} );
	options.add( option );

	// Mesh / Capsule

	option = new UIRow();
	option.setClass( 'option' );
	option.setId('addEnding');
	option.setTextContent( strings.getKey( 'menubar/add/end' ) );
	option.onClick( function () {

		const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 );

		// const canvas = document.createElement( 'canvas' );
		// canvas.width = 16;
		// canvas.height = 16;
		// const context = canvas.getContext( '2d' );
		// context.fillStyle = 'rgba(36, 252, 3, 0.5)';
		// context.fillRect( 0, 0, canvas.width, canvas.height );

		// const texture = new THREE.CanvasTexture( canvas );
		// const material = new THREE.MeshBasicMaterial( {
		// 	map: texture,
		// 	transparent: true,
		// } );

		const material = new THREE.MeshBasicMaterial( {
			color: 0x24fc03,
			opacity: 0.5,
			transparent: true,
		} );

		const mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'End';
		mesh.userData.CustomTexture = [ 'hex', '24fc03', 0.5 ];
		mesh.userData.effects = {"use": "","drift": false,"jump": true,"jh": null,"js": null,"turn": null,"speed": null,"dx": null,"dy": null,"dz": null,"sl": null,"sr": null,"id": null,"mx": null,"my": null,"mz": null,"rx": null,"ry": null,"rz": null,"gx": null,"gy": null,"gz": null,"bou": null,"mass": null,"fr": null,"air": true,"topr": null,"k": false,"d": null,"eye": null,"fov": null,"tx": null,"ty": null,"tz": null,"cd": null,"cr": null,"msg": "","br": null,"bg": "","amb": "","dif": "","spe": "","gro": ""};

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// Mesh / Cylinder

	option = new UIRow();
	option.setClass( 'option' );
	option.setId('addCylinder');
	option.setTextContent( strings.getKey( 'menubar/add/cylinder' ) );
	option.onClick( function () {

		const geometry = new THREE.CylinderGeometry( .5, .5, 1, 16, 1, false, 0, Math.PI * 2 );

		// const canvas = document.createElement( 'canvas' );
		// canvas.width = 16;
		// canvas.height = 16;
		// const context = canvas.getContext( '2d' );
		// context.fillStyle = 'rgba(0, 0, 255, 0.8)';
		// context.fillRect( 0, 0, canvas.width, canvas.height );

		// const texture = new THREE.CanvasTexture( canvas );
		// const material = new THREE.MeshBasicMaterial( {
		// 	map: texture,
		// 	transparent: true,
		// } );

		const material = new THREE.MeshBasicMaterial( {
			color: 0x0000ff,
			opacity: 0.8,
			transparent: true,
		} );

		const mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'Cylinder';
		mesh.userData.CustomTexture = [ 'hex', '0000ff', 0.8 ];
		mesh.userData.effects = {"use": "","drift": false,"jump": true,"jh": null,"js": null,"turn": null,"speed": null,"dx": null,"dy": null,"dz": null,"sl": null,"sr": null,"id": null,"mx": null,"my": null,"mz": null,"rx": null,"ry": null,"rz": null,"gx": null,"gy": null,"gz": null,"bou": null,"mass": null,"fr": null,"air": true,"topr": null,"k": false,"d": null,"eye": null,"fov": null,"tx": null,"ty": null,"tz": null,"cd": null,"cr": null,"msg": "","br": null,"bg": "","amb": "","dif": "","spe": "","gro": ""};

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// Mesh / Sphere

	option = new UIRow();
	option.setClass( 'option' );
	option.setId('addSphere');
	option.setTextContent( strings.getKey( 'menubar/add/sphere' ) );
	option.onClick( function () {

		const geometry = new THREE.SphereGeometry( 1, 32, 16, 0, Math.PI * 2, 0, Math.PI );

		// const canvas = document.createElement( 'canvas' );
		// canvas.width = 16;
		// canvas.height = 16;
		// const context = canvas.getContext( '2d' );
		// context.fillStyle = 'rgba(0, 0, 255, 0.8)';
		// context.fillRect( 0, 0, canvas.width, canvas.height );

		// const texture = new THREE.CanvasTexture( canvas );
		// const material = new THREE.MeshBasicMaterial( { map: texture, transparent: true } );
		const material = new THREE.MeshBasicMaterial( {
			color: 0x0000ff,
			opacity: .8,
			transparent: true,
		} );

		const mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'Sphere';
		mesh.userData.CustomTexture = [ 'hex', '0000ff', 0.8 ];
		mesh.userData.effects = {"use": "","drift": false,"jump": true,"jh": null,"js": null,"turn": null,"speed": null,"dx": null,"dy": null,"dz": null,"sl": null,"sr": null,"id": null,"mx": null,"my": null,"mz": null,"rx": null,"ry": null,"rz": null,"gx": null,"gy": null,"gz": null,"bou": null,"mass": null,"fr": null,"air": true,"topr": null,"k": false,"d": null,"eye": null,"fov": null,"tx": null,"ty": null,"tz": null,"cd": null,"cr": null,"msg": "","br": null,"bg": "","amb": "","dif": "","spe": "","gro": ""};

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// cone

	option = new UIRow();
	option.setClass( 'option' );
	option.setId('addCone');
	option.setTextContent( strings.getKey( 'menubar/add/cone' ) );
	option.onClick( function () {

		const geometry = new THREE.ConeGeometry( .5, 1, 16 );
		const material = new THREE.MeshBasicMaterial( { color: 0xD52B2B } );
		const mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'Cone';
		mesh.userData.CustomTexture = [ 'hex', 'D52B2B', 1.0 ];
		mesh.userData.effects = {"use": "","drift": false,"jump": true,"jh": null,"js": null,"turn": null,"speed": null,"dx": null,"dy": null,"dz": null,"sl": null,"sr": null,"id": null,"mx": null,"my": null,"mz": null,"rx": null,"ry": null,"rz": null,"gx": null,"gy": null,"gz": null,"bou": null,"mass": null,"fr": null,"air": true,"topr": null,"k": false,"d": null,"eye": null,"fov": null,"tx": null,"ty": null,"tz": null,"cd": null,"cr": null,"msg": "","br": null,"bg": "","amb": "","dif": "","spe": "","gro": ""};

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// plane

	option = new UIRow();
	option.setClass( 'option' );
	option.setId('addPlane');
	option.setTextContent( strings.getKey( 'menubar/add/mesh/plane' ) );
	option.onClick( function () {

		const geometry = new THREE.PlaneGeometry( 1, 1, 1, 1 );
		const material = new THREE.MeshStandardMaterial();
		const mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'Plane';
		mesh.material.side = THREE.DoubleSide;
		mesh.position.y = -20;
		mesh.rotation.x = 1.57079633;
		mesh.scale.x = 1000;

		mesh.userData.CustomTexture = [ 'hex', '0000ff', 0.8 ];
		mesh.userData.effects = {"use": "","drift": false,"jump": true,"jh": null,"js": null,"turn": null,"speed": null,"dx": null,"dy": null,"dz": null,"sl": null,"sr": null,"id": null,"mx": null,"my": null,"mz": null,"rx": null,"ry": null,"rz": null,"gx": null,"gy": null,"gz": null,"bou": null,"mass": null,"fr": null,"air": true,"topr": null,"k": false,"d": null,"eye": null,"fov": null,"tx": null,"ty": null,"tz": null,"cd": null,"cr": null,"msg": "","br": null,"bg": "","amb": "","dif": "","spe": "","gro": ""};
		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	//monkey

	option = new UIRow();
	option.setClass( 'option' );
	option.setId('addMonkey');
	option.setTextContent( strings.getKey( 'menubar/add/monkey' ) );
	option.onClick( function () {

		const geometry = new THREE.OctahedronGeometry( 3, 1 );
		const material = new THREE.MeshStandardMaterial();
		const mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'Monkey';

		mesh.userData.CustomTexture = [ 'hex', '0000ff', 0.8 ];
		mesh.userData.effects = {"use": "","drift": false,"jump": true,"jh": null,"js": null,"turn": null,"speed": null,"dx": null,"dy": null,"dz": null,"sl": null,"sr": null,"id": null,"mx": null,"my": null,"mz": null,"rx": null,"ry": null,"rz": null,"gx": null,"gy": null,"gz": null,"bou": null,"mass": null,"fr": null,"air": true,"topr": null,"k": false,"d": null,"eye": null,"fov": null,"tx": null,"ty": null,"tz": null,"cd": null,"cr": null,"msg": "","br": null,"bg": "","amb": "","dif": "","spe": "","gro": ""};
		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// arrow

	option = new UIRow();
	option.setClass( 'option' );
	option.setId('addSpawn');
	option.setTextContent( strings.getKey( 'menubar/add/spawn' ) );
	option.onClick( function () {

		// make an arrow out of a cone
		const geometry = new THREE.ConeGeometry( .1, .3, 16 );
		const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
		const mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'Spawn';
		mesh.rotation.x = Math.PI / - 2;
		// mesh.geometry.type = "SpawnGeometry";

		mesh.userData.CustomTexture = [ 'hex', '0000ff', 0.8 ];
		mesh.userData.effects = {"use": "","drift": false,"jump": true,"jh": null,"js": null,"turn": null,"speed": null,"dx": null,"dy": null,"dz": null,"sl": null,"sr": null,"id": null,"mx": null,"my": null,"mz": null,"rx": null,"ry": null,"rz": null,"gx": null,"gy": null,"gz": null,"bou": null,"mass": null,"fr": null,"air": true,"topr": null,"k": false,"d": null,"eye": null,"fov": null,"tx": null,"ty": null,"tz": null,"cd": null,"cr": null,"msg": "","br": null,"bg": "","amb": "","dif": "","spe": "","gro": ""};
		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	return container;

}

export { MenubarAdd };
