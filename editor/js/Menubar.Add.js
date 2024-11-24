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
	option.setTextContent( strings.getKey( 'menubar/add/box' ) );
	option.onClick( function () {

		const geometry = new THREE.BoxGeometry( 1, 1, 1, 1, 1, 1 );
		const mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
		mesh.name = 'Box';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// Mesh / Capsule

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/end' ) );
	option.onClick( function () {

		const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 );
		const material = new THREE.MeshStandardMaterial();
		const mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'End';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// Mesh / Cylinder

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/cylinder' ) );
	option.onClick( function () {

		const geometry = new THREE.CylinderGeometry( 1, 1, 1, 32, 1, false, 0, Math.PI * 2 );
		const mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
		mesh.name = 'Cylinder';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// Mesh / Sphere

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/sphere' ) );
	option.onClick( function () {

		const geometry = new THREE.SphereGeometry( 1, 32, 16, 0, Math.PI * 2, 0, Math.PI );
		const mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
		mesh.name = 'Sphere';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// cone

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/cone' ) );
	option.onClick( function () {

		const geometry = new THREE.ConeGeometry( .5, 1, 16 );
		const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
		const mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'Cone';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// plane

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/mesh/plane' ) );
	option.onClick( function () {

		const geometry = new THREE.PlaneGeometry( 1, 1, 1, 1 );
		const material = new THREE.MeshStandardMaterial();
		const mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'Plane';
		mesh.material.side = THREE.DoubleSide;

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// arrow

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/spawn' ) );
	option.onClick( function () {

		// make an arrow out of a cone
		const geometry = new THREE.ConeGeometry( .1, .3, 16 );
		const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
		const mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'Spawn (DO NOT RENAME)';
		mesh.rotation.x = Math.PI / -2;
		// mesh.geometry.type = "SpawnGeometry";

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	return container;

}

export { MenubarAdd };
