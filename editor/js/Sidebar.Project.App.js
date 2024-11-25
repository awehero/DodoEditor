import * as THREE from 'three';

import { zipSync, strToU8 } from 'three/addons/libs/fflate.module.js';

import { UIButton, UICheckbox, UIPanel, UIInput, UIRow, UIText } from './libs/ui.js';

function SidebarProjectApp( editor ) {

	const config = editor.config;
	const signals = editor.signals;
	const strings = editor.strings;

	const save = editor.utils.save;

	const container = new UIPanel();
	container.setId( 'app' );

	const headerRow = new UIRow();
	// headerRow.add( new UIText( strings.getKey( 'sidebar/project/app' ).toUpperCase() ) );
	// container.add( headerRow );

	// Title

	const titleRow = new UIRow();
	const title = new UIInput( config.getKey( 'project/title' ) ).setLeft( '100px' ).setWidth( '150px' ).onChange( function () {

		config.setKey( 'project/title', this.getValue() );

	} );

	titleRow.add( new UIText( strings.getKey( 'sidebar/project/app/title' ) ).setClass( 'Label' ) );
	titleRow.add( title );

	container.add( titleRow );

	// Editable

	const editableRow = new UIRow();
	const editable = new UICheckbox( config.getKey( 'project/editable' ) ).setLeft( '100px' ).onChange( function () {

		config.setKey( 'project/editable', this.getValue() );

	} );

	// editableRow.add( new UIText( strings.getKey( 'sidebar/project/app/editable' ) ).setClass( 'Label' ) );
	// editableRow.add( editable );

	// container.add( editableRow );

	// Play/Stop

	let isPlaying = false;

	const playButton = new UIButton( strings.getKey( 'sidebar/project/app/play' ) );
	playButton.setWidth( '170px' );
	playButton.setMarginLeft( '120px' );
	playButton.setMarginBottom( '10px' );
	playButton.onClick( function () {

		if ( isPlaying === false ) {

			isPlaying = true;
			playButton.setTextContent( strings.getKey( 'sidebar/project/app/stop' ) );
			signals.startPlayer.dispatch();

		} else {

			isPlaying = false;
			playButton.setTextContent( strings.getKey( 'sidebar/project/app/play' ) );
			signals.stopPlayer.dispatch();

		}

	} );

	container.add( playButton );

	// Get URL
	const urlButton = new UIButton( strings.getKey( 'sidebar/project/app/url' ) );
	urlButton.setWidth( '170px' );
	urlButton.setMarginLeft( '120px' );
	urlButton.setMarginBottom( '10px' );
	urlButton.onClick( function () {
                    var dataString = "";
                    editor.scene.children.forEach(function(object) {
                        if (!!object.scale.x || object.geometry.type == "PlaneGeometry") {
                        var objectType;
                                        if (object instanceof THREE.Mesh) {
                                            if (object.geometry instanceof THREE.PlaneGeometry) {
                                                objectType = "A";
                                            } else if (object.geometry instanceof THREE.BoxGeometry) {
                                                objectType = "B";
                                            } else if (object.geometry instanceof THREE.ConeGeometry) {
                                                objectType = "C";
                                            } else if (object.geometry instanceof THREE.SphereGeometry) {
                                                objectType = "D";
                                            } else if (object.geometry instanceof THREE.CylinderGeometry) {
                                                objectType = "E";
                                            } else if (object.geometry instanceof THREE.IcosahedronGeometry) {
                                                objectType = "F";
                                            } else if (object.geometry instanceof THREE.OctahedronGeometry) {
                                                objectType = "G";
                                            }
                                        } else {
                                            objectType = "G";
                                        }
                                       var objectNameStart = object.name ? object.name : "none";
                                        let inputString = objectNameStart;
                                        const replacements = [
                                            { search: ",t=", replace: ",turn=" },
                                            { search: ", t=", replace: ", turn=" },
                                            { search: "\\[t=", replace: "[turn=" },
                                            { search: ",s=", replace: ",speed=" },
                                            { search: ", s=", replace: ", speed=" },
                                            { search: "\\[s=", replace: "[speed=" },
                                            { search: ",j=", replace: ",jump=" },
                                            { search: ", j=", replace: ", jump=" },
                                            { search: "\\[j=", replace: "[jump=" },
                                            { search: "mat=#", replace: "m=" },
                                            { search: "mat=", replace: "m=" },
                                            { search: "bg=#", replace: "bg=" },
                                            { search: "amb=#", replace: "amb=" },
                                            { search: "dif=#", replace: "dif=" },
                                            { search: "spe=#", replace: "spe=" },
                                            { search: "gro=#", replace: "gro=" },
                                            { search: " ", replace: "" },
                                            { search: "\\[", replace: "" },
                                            { search: "\\]", replace: "" },
                                            { search: ",", replace: "?" }
                                        ];
                                        replacements.forEach(pair => {
                                            inputString = inputString.replace(new RegExp(pair.search, 'g'), pair.replace);
                                        });
                                        var objectName = inputString;
                                        var position = object.position;
                                        var roundedPosition = {
                                            x: Math.round(position.x * 1000) / -10,
                                            y: Math.round(position.z * 1000) / 10,
                                            z: Math.round(position.y * 1000) / 10
                                        };
                                        var rotation = object.rotation;
                                        if (object.geometry.type == "PlaneGeometry") {
                                            var roundedRotation = {
                                                x: 0,
                                                y: 0,
                                                z: 0
                                            };
                                        } else {
                                            var roundedRotation = {
                                                x: Math.round(rotation.x * 1000) / -1000,
                                                y: Math.round(rotation.z * 1000) / 1000,
                                                z: Math.round(rotation.y * 1000) / 1000
                                            };
                                        }
                                        var scale = object.scale;
                                        if (object.geometry.type == "PlaneGeometry") {
                                             var roundedScale = {
                                                  x: Math.round(scale.x * 1000) / 20,
                                                  y: Math.round(scale.y * 1000) / 20,
                                                  z: Math.round(scale.z * 1000) / 20
                                             };
                                        } else {
                                             var roundedScale = {
                                                  x: Math.round(scale.x * 1000) / 20,
                                                  y: Math.round(scale.z * 1000) / 20,
                                                  z: Math.round(scale.y * 1000) / 20
                                             };
                                        }
                                        var objectData = objectType + (roundedPosition.x) + "$" + (roundedPosition.y) + "$" + (roundedPosition.z) + "$" + Math.round(roundedRotation.x * 100) + "$" + Math.round(roundedRotation.y * 100) + "$" + Math.round(roundedRotation.z * 100) + "$" + (roundedScale.x) + "$" + (roundedScale.y) + "$" + (roundedScale.z) + "$" + objectName;
                                        dataString += objectData;
                        }
                    });
                    dataString = replaceMsgWithASCII(dataString);
                    dataString = "https://icedodo.onionfist.com/creative/?CompilerVersion=v9&CompilerOutput=" + dataString;
                    const replacementsTwo = [
                        { search: "\\.0\\?", replace: "?" },
                        { search: "\\.0\\$", replace: "$" },
                        { search: "\\.0A", replace: "A" },
                        { search: "\\.0B", replace: "B" },
                        { search: "\\.0C", replace: "C" },
                        { search: "\\.0D", replace: "D" },
                        { search: "\\.0E", replace: "E" },
                        { search: "\\.0F", replace: "F" },
                        { search: "\\.0G", replace: "G" },
                        { search: "none", replace: "_" },
                    ];
                    
                    replacementsTwo.forEach(pair => {
                        dataString = dataString.replace(new RegExp(pair.search, 'g'), pair.replace);
                    });
                    return dataString;
                }
                function replaceMsgWithASCII(input) {
                        return input.replace(/msg=\{([^}]*)\}/g, (match, p1) => {
                            const asciiValues = Array.from(p1).map(char => char.charCodeAt(0));
                            const asciiString = asciiValues.join(':');
                            return `msg=${asciiString}`;
                        });
                }
	} );

	container.add( urlButton );
	
	// Publish

	const publishButton = new UIButton( strings.getKey( 'sidebar/project/app/publish' ) );
	publishButton.setWidth( '170px' );
	publishButton.setMarginLeft( '120px' );
	publishButton.setMarginBottom( '10px' );
	publishButton.onClick( function () {

		const toZip = {};

		//

		let output = editor.toJSON();
		output.metadata.type = 'App';
		delete output.history;

		output = JSON.stringify( output, null, '\t' );
		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

		toZip[ 'app.json' ] = strToU8( output );

		//

		const title = config.getKey( 'project/title' );

		const manager = new THREE.LoadingManager( function () {

			const zipped = zipSync( toZip, { level: 9 } );

			const blob = new Blob( [ zipped.buffer ], { type: 'application/zip' } );

			save( blob, ( title !== '' ? title : 'untitled' ) + '.zip' );

		} );

		const loader = new THREE.FileLoader( manager );
		loader.load( 'js/libs/app/index.html', function ( content ) {

			content = content.replace( '<!-- title -->', title );

			let editButton = '';

			if ( config.getKey( 'project/editable' ) ) {

				editButton = [
					'			let button = document.createElement( \'a\' );',
					'			button.href = \'https://threejs.org/editor/#file=\' + location.href.split( \'/\' ).slice( 0, - 1 ).join( \'/\' ) + \'/app.json\';',
					'			button.style.cssText = \'position: absolute; bottom: 20px; right: 20px; padding: 10px 16px; color: #fff; border: 1px solid #fff; border-radius: 20px; text-decoration: none;\';',
					'			button.target = \'_blank\';',
					'			button.textContent = \'EDIT\';',
					'			document.body.appendChild( button );',
				].join( '\n' );

			}

			content = content.replace( '\t\t\t/* edit button */', editButton );

			toZip[ 'index.html' ] = strToU8( content );

		} );
		loader.load( 'js/libs/app.js', function ( content ) {

			toZip[ 'js/app.js' ] = strToU8( content );

		} );
		loader.load( '../build/three.module.js', function ( content ) {

			toZip[ 'js/three.module.js' ] = strToU8( content );

		} );

	} );
	container.add( publishButton );

	// Signals

	signals.editorCleared.add( function () {

		title.setValue( '' );
		config.setKey( 'project/title', '' );

	} );

	return container;

}

export { SidebarProjectApp };
