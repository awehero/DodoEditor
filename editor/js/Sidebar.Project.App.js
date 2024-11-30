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

			const mapfile = getLinkOrMapfile( 'mapfile' );
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

	// Get URL and mapfile

	const urlButton = new UIButton( strings.getKey( 'sidebar/project/app/url' ) );
	urlButton.setWidth( '170px' );
	urlButton.setMarginLeft( '120px' );
	urlButton.setMarginBottom( '10px' );
	urlButton.onClick( function () {

		getLinkOrMapfile( 'url' );

	} );
	function getLinkOrMapfile( which ) {

		var dataString = '';
		editor.scene.children.forEach( function ( object ) {

			if ( !! object.scale.x || object.geometry.type == 'PlaneGeometry' ) {

                        	var objectType;
				if ( object.name != 'Spawn' ) {

					if ( object instanceof THREE.Mesh ) {

						if ( object.geometry instanceof THREE.PlaneGeometry ) {

							objectType = 'A';

						} else if ( object.geometry instanceof THREE.BoxGeometry ) {

							objectType = 'B';

						} else if ( object.geometry instanceof THREE.ConeGeometry ) {

							objectType = 'C';

						} else if ( object.geometry instanceof THREE.CapsuleGeometry ) {

							objectType = 'D';

						} else if ( object.geometry instanceof THREE.CylinderGeometry ) {

							objectType = 'E';

						} else if ( object.geometry instanceof THREE.SphereGeometry ) {

							objectType = 'F';

						} else if ( object.geometry instanceof THREE.OctahedronGeometry ) {

							objectType = 'G';

						}

					} else {

					    objectType = 'G';

					}

				}

				var objectNameStart = object.name.includes( '[' ) ? object.name : '_';
				let inputString = objectNameStart;
				const replacements = [ //This whole section might not be needed in the future, keep for now
				    { search: ',t=', replace: ',turn=' },
				    { search: ', t=', replace: ', turn=' },
				    { search: '\\[t=', replace: '[turn=' },
				    { search: ',s=', replace: ',speed=' },
				    { search: ', s=', replace: ', speed=' },
				    { search: '\\[s=', replace: '[speed=' },
				    { search: ',j=', replace: ',jump=' },
				    { search: ', j=', replace: ', jump=' },
				    { search: '\\[j=', replace: '[jump=' },
				    { search: 'mat=#', replace: 'm=' },
				    { search: 'mat=', replace: 'm=' },
				    { search: 'bg=#', replace: 'bg=' },
				    { search: 'amb=#', replace: 'amb=' },
				    { search: 'dif=#', replace: 'dif=' },
				    { search: 'spe=#', replace: 'spe=' },
				    { search: 'gro=#', replace: 'gro=' },
				    { search: ' ', replace: '' },
				    { search: '\\[', replace: '' },
				    { search: '\\]', replace: '' },
				    { search: ',', replace: '?' }
				];
				replacements.forEach( pair => {

					inputString = inputString.replace( new RegExp( pair.search, 'g' ), pair.replace );

				} );
				if ( ! inputString.includes( 'm=' ) ) {

					let matAdd = '';
					console.log( object.name );
					switch ( object.userData.CustomTexture[ 0 ] ) {

						case './images/textures/bright.png':
				        		matAdd = 'm=0';
				        		break;
						case './images/textures/pm1.png':
							matAdd = 'm=1';
							break;
						case './images/textures/pm2.png':
							matAdd = 'm=2';
							break;
						case 'hex':
							matAdd = 'm=' + object.userData.CustomTexture[ 1 ];
							if ( object.userData.CustomTexture[ 2 ] != 1 ) {

								matAdd = matAdd + '?' + object.userData.CustomTexture[ 2 ].toLowerCase();

							}

							break;
						default:
							matAdd = 'm=0';
							break;

					}

					if ( inputString == '_' ) {

						inputString = matAdd;

					} else {

						inputString = inputString + '?' + matAdd;

					}

				}

				var objectName = inputString;
				var position = object.position;
				var roundedPosition = {
				    x: Math.round( position.x * 1000 ) / - 10,
				    y: Math.round( position.z * 1000 ) / 10,
				    z: Math.round( position.y * 1000 ) / 10
				};
				var rotation = object.rotation;
				if ( object.geometry.type == 'PlaneGeometry' ) {

				    var roundedRotation = {
						x: 0,
						y: 0,
						z: 0
				    };

				} else {

				    var roundedRotation = {
						x: Math.round( rotation.x * 1000 ) / - 1000,
						y: Math.round( rotation.z * 1000 ) / 1000,
						z: Math.round( rotation.y * 1000 ) / 1000
				    };

				}

				var scale = object.scale;
				if ( object.geometry.type == 'PlaneGeometry' ) {

				     var roundedScale = {
					  x: Math.round( scale.x * 1000 ) / 10,
					  y: Math.round( scale.y * 1000 ) / 10,
					  z: Math.round( scale.z * 1000 ) / 10
				     };

				} else {

				     var roundedScale = {
					  x: Math.round( scale.x * 1000 ) / 10,
					  y: Math.round( scale.z * 1000 ) / 10,
					  z: Math.round( scale.y * 1000 ) / 10
				     };

				}

				var objectData = objectType + ( roundedPosition.x ) + '$' + ( roundedPosition.y ) + '$' + ( roundedPosition.z ) + '$' + Math.round( roundedRotation.x * 100 ) + '$' + Math.round( roundedRotation.y * 100 ) + '$' + Math.round( roundedRotation.z * 100 ) + '$' + ( roundedScale.x ) + '$' + ( roundedScale.y ) + '$' + ( roundedScale.z ) + '$' + objectName;
				dataString += objectData;

			}

		} );
		dataString = replaceMsgWithASCII( dataString );
		dataString = 'https://icedodo.onionfist.com/creative/?CompilerVersion=v9&CompilerOutput=' + dataString;
		const replacementsTwo = [
			{ search: '\\.0\\?', replace: '?' },
			{ search: '\\.0\\$', replace: '$' },
			{ search: '\\.0A', replace: 'A' },
			{ search: '\\.0B', replace: 'B' },
			{ search: '\\.0C', replace: 'C' },
			{ search: '\\.0D', replace: 'D' },
			{ search: '\\.0E', replace: 'E' },
			{ search: '\\.0F', replace: 'F' },
			{ search: '\\.0G', replace: 'G' },
			{ search: 'none', replace: '_' },
			{ search: 'Box', replace: '_' },
			{ search: 'End', replace: '_' },
			{ search: 'Cylinder', replace: '_' },
			{ search: 'Sphere', replace: '_' },
			{ search: 'Plane', replace: '_' },
			{ search: 'Monkey', replace: '_' },
			{ search: 'Cone', replace: '_' },
			{ search: 'Spawn', replace: '_' },
		];

		replacementsTwo.forEach( pair => {

			dataString = dataString.replace( new RegExp( pair.search, 'g' ), pair.replace );

		} );
		if ( which == 'url' ) {

			navigator.clipboard.writeText( dataString );
			console.log( dataString );
			alert( 'Link copied to clipboard! Your map is ' + dataString.length + ' characters long!' );

		} else {

		  const hostname = 'icedodo-api.onionfist.com';
		  const path = '/api/compile_long_map_url.js?longUrl=';

		  const dollarIndex = dataString.indexOf( '$' );
		  if ( dollarIndex !== - 1 ) {

		    let endIndex = dollarIndex - 1;
		    while ( endIndex >= 0 && ! /[A-G]/.test( dataString[ endIndex ] ) ) {

		      endIndex --;

				}

		    if ( endIndex >= 0 ) {

		      dataString = dataString.substring( endIndex );

				}

			}

		  try {

		    fetch( `https://${hostname}${path}${dataString}` )
		    .then( response => response.text() )
		    .then( mapfile => {

		      console.log( mapfile );
		      return mapfile;

					} )
		    .catch( error => {

		      console.error( 'Error fetching the map file:', error );

					} );
		    //mapfile = text.replace(/;/g, ';\n');
		    //localStorage.setItem('mapfile') = mapfile; THIS CAN SAVE THE MAPFILE INTO LOCAL STORAGE IF YOU WANT TO USE IT THAT WAY INSTEAD

			} catch ( error ) {

		    console.error( 'Error fetching data:', error );

			}

		}

		function replaceMsgWithASCII( input ) {

			return input.replace( /msg=\{([^}]*)\}/g, ( match, p1 ) => {

				const asciiValues = Array.from( p1 ).map( char => char.charCodeAt( 0 ) );
				const asciiString = asciiValues.join( ':' );
				return `msg=${asciiString}`;

			} );

		}

	}

	container.add( urlButton );

	// Load URL

	const loadURLButton = new UIButton( strings.getKey( 'sidebar/project/app/loadurl' ) );
	loadURLButton.setWidth( '170px' );
	loadURLButton.setMarginLeft( '120px' );
	loadURLButton.setMarginBottom( '10px' );
	loadURLButton.onClick( function () {
		let input = prompt("Paste your map link here:");
		if (input) return;
		var warning = prompt("Are you sure you want to load a map? This will delete everything! (y/n)");
		if (warning == "" || (warning.toLowerCase() != 'y')) {return;}
		var deleteNumber = editor.scene.children.length;
		for (let i = 0; i < deleteNumber; i++) {
				editor.scene.remove(editor.scene.children[0]);
		}
		input = input.replace(/msg=([\d:]+)/g, (match, p1) => {
			const asciiValues = p1.split(':');
			const characters = asciiValues.map(ascii => String.fromCharCode(parseInt(ascii, 10)));
			const originalString = characters.join('');
			return `msg=${originalString}`;
		});
		let dollarIndex = input.indexOf('$');
		if (dollarIndex !== -1) {
				let endIndex = dollarIndex - 1;
				while (endIndex >= 0 && !/[A-G]/.test(input[endIndex])) {
					endIndex--;
				}
				if (endIndex >= 0) {
				input = input.substring(endIndex);
				}
		}
		const index = input.indexOf('&');
		if (index !== -1) {
				input = input.substring(0, index);
		}
		const objectDataArray = input.split(/(?=[A-Z])/);
		function loadObject(type, posX, posY, posZ, rotX, rotY, rotZ, sizeX, sizeY, sizeZ, effects) {
			switch (type) {
				case 'A':
					
					break;
				case 'B':
					
					break;
				case 'C':
					
					break;
				case 'D':
					
					break;
				case 'E':
					
					break;
				case 'F':
					
					break;
				case 'G':
					
					break;
				default:
                                        console.error('Unknown object type:', type);
			}
		}
		objectDataArray.forEach(objData => {
			const type = objData.charAt(0);
			const rest = objData.slice(1);
			const [posX, posY, posZ, rotX, rotY, rotZ, sizeX, sizeY, sizeZ, effects] = rest.split("$");
			let object = loadObject(type, posX, posY, posZ, rotX, rotY, rotZ, sizeX, sizeY, sizeZ, effects);
		}
		if (object) {
			editor.scene.add(object);
		}
		});
	});

	container.add( loadURLButton );

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
