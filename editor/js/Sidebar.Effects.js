import * as THREE from 'three';

import { UIPanel, UIRow, UIInput, UIColor, UISelect, UIText, UINumber } from './libs/ui.js';

function SidebarEffects( editor ) {

	const strings = editor.strings;

	const signals = editor.signals;

	const container = new UIPanel();
	container.setId( 'effects' );
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );
	container.setDisplay( 'none' );

	// use

	const objectUseRow = new UIRow();
	const objectUse = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'use' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d?$/.test( value ) ) {

	            this.setValue( value.slice( 0, 1 ) ); // 1 digit limit

			}

		} )
	    .onChange( update );

	objectUseRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/use' ) ).setClass( 'Label' )
	);
	objectUseRow.add( objectUse );
	container.add( objectUseRow );

	// drift

	const objectDriftRow = new UIRow();
	const objectDrift = new UISelect()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'drift' )
	    .setOptions( { off: 'Off', on: 'On' } )
	    .setValue( 'off' ) // Default to 'off'
	    .onChange( update );

	objectDriftRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/drift' ) ).setClass( 'Label' )
	);
	objectDriftRow.add( objectDrift );
	container.add( objectDriftRow );

	// jump

	const objectJumpRow = new UIRow();
	const objectJump = new UISelect()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'jump' )
	    .setOptions( { off: 'Off', on: 'On' } )
	    .setValue( 'off' ) // Default to 'off'
	    .onChange( update );

	objectJumpRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/jump' ) ).setClass( 'Label' )
	);
	objectJumpRow.add( objectJump );
	container.add( objectJumpRow );

	// jh

	const objectJhRow = new UIRow();
	const objectJh = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'jh' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectJhRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/jh' ) ).setClass( 'Label' )
	);
	objectJhRow.add( objectJh );
	container.add( objectJhRow );

	// js

	const objectJsRow = new UIRow();
	const objectJs = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'js' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectJsRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/js' ) ).setClass( 'Label' )
	);
	objectJsRow.add( objectJs );
	container.add( objectJsRow );

	// turn

	const objectTurnRow = new UIRow();
	const objectTurn = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'turn' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectTurnRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/turn' ) ).setClass( 'Label' )
	);
	objectTurnRow.add( objectTurn );
	container.add( objectTurnRow );

	// speed

	const objectSpeedRow = new UIRow();
	const objectSpeed = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'speed' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectSpeedRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/speed' ) ).setClass( 'Label' )
	);
	objectSpeedRow.add( objectSpeed );
	container.add( objectSpeedRow );

	// dx

	const objectDxRow = new UIRow();
	const objectDx = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'dx' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectDxRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/dx' ) ).setClass( 'Label' )
	);
	objectDxRow.add( objectDx );
	container.add( objectDxRow );

	// dy

	const objectDyRow = new UIRow();
	const objectDy = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'dy' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectDyRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/dy' ) ).setClass( 'Label' )
	);
	objectDyRow.add( objectDy );
	container.add( objectDyRow );

	// dz

	const objectDzRow = new UIRow();
	const objectDz = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'dz' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectDzRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/dz' ) ).setClass( 'Label' )
	);
	objectDzRow.add( objectDz );
	container.add( objectDzRow );


	// sl

	const objectSlRow = new UIRow();
	const objectSl = new UISelect()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'sl' )
	    .setValue( '' )
	    .setOptions( { off: 'Off', on: 'On' } )
	    .setValue( 'off' ) // Default to 'off'
	    .onChange( update );

	objectSlRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/sl' ) ).setClass( 'Label' )
	);
	objectSlRow.add( objectSl );
	container.add( objectSlRow );


	// sr

	const objectSrRow = new UIRow();
	const objectSr = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'sr' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectSrRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/sr' ) ).setClass( 'Label' )
	);
	objectSrRow.add( objectSr );
	container.add( objectSrRow );

	// id

	const objectIdRow = new UIRow();
	const objectId = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'id' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d?$/.test( value ) ) {

	            this.setValue( value.slice( 0, 3 ) ); // 3 digit limit

			}

		} )
	    .onChange( update );

	objectIdRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/id' ) ).setClass( 'Label' )
	);
	objectIdRow.add( objectId );
	container.add( objectIdRow );

	// mx

	const objectMxRow = new UIRow();
	const objectMx = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'mx' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectMxRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/mx' ) ).setClass( 'Label' )
	);
	objectMxRow.add( objectMx );
	container.add( objectMxRow );

	// my

	const objectMyRow = new UIRow();
	const objectMy = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'my' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectMyRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/my' ) ).setClass( 'Label' )
	);
	objectMyRow.add( objectMy );
	container.add( objectMyRow );

	// mz

	const objectMzRow = new UIRow();
	const objectMz = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'mz' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectMzRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/mz' ) ).setClass( 'Label' )
	);
	objectMzRow.add( objectMz );
	container.add( objectMzRow );

	// rx

	const objectRxRow = new UIRow();
	const objectRx = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'rx' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectRxRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/rx' ) ).setClass( 'Label' )
	);
	objectRxRow.add( objectRx );
	container.add( objectRxRow );

	// ry

	const objectRyRow = new UIRow();
	const objectRy = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'ry' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectRyRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/ry' ) ).setClass( 'Label' )
	);
	objectRyRow.add( objectRy );
	container.add( objectRyRow );

	// rz

	const objectRzRow = new UIRow();
	const objectRz = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'rz' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectRzRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/rz' ) ).setClass( 'Label' )
	);
	objectRzRow.add( objectRz );
	container.add( objectRzRow );

	// gx

	const objectGxRow = new UIRow();
	const objectGx = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'gx' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectGxRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/gx' ) ).setClass( 'Label' )
	);
	objectGxRow.add( objectGx );
	container.add( objectGxRow );

	// gy

	const objectGyRow = new UIRow();
	const objectGy = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'gy' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectGyRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/gy' ) ).setClass( 'Label' )
	);
	objectGyRow.add( objectGy );
	container.add( objectGyRow );

	// gz

	const objectGzRow = new UIRow();
	const objectGz = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'gz' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectGzRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/gz' ) ).setClass( 'Label' )
	);
	objectGzRow.add( objectGz );
	container.add( objectGzRow );

	// bou

	const objectBouRow = new UIRow();
	const objectBou = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'bou' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectBouRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/bou' ) ).setClass( 'Label' )
	);
	objectBouRow.add( objectBou );
	container.add( objectBouRow );

	// mass

	const objectMassRow = new UIRow();
	const objectMass = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'mass' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectMassRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/mass' ) ).setClass( 'Label' )
	);
	objectMassRow.add( objectMass );
	container.add( objectMassRow );

	// fr

	const objectFrRow = new UIRow();
	const objectFr = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'fr' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectFrRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/fr' ) ).setClass( 'Label' )
	);
	objectFrRow.add( objectFr );
	container.add( objectFrRow );

	// air

	const objectAirRow = new UIRow();
	const objectAir = new UISelect()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'air' )
	    .setOptions( { on: 'On', off: 'Off' } )
	    .setValue( 'off' ) // Default value is "on"
	    .onChange( update );

	objectAirRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/air' ) ).setClass( 'Label' )
	);
	objectAirRow.add( objectAir );
	container.add( objectAirRow );

	// topr

	const objectToprRow = new UIRow();
	const objectTopr = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'topr' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectToprRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/topr' ) ).setClass( 'Label' )
	);
	objectToprRow.add( objectTopr );
	container.add( objectToprRow );

	// k

	const objectKRow = new UIRow();
	const objectK = new UISelect()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'k' )
	    .setOptions( { on: 'On', off: 'Off' } )
	    .setValue( 'off' ) // Default value is "off"
	    .onChange( update );

	objectKRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/k' ) ).setClass( 'Label' )
	);
	objectKRow.add( objectK );
	container.add( objectKRow );

	// d

	const objectDRow = new UIRow();
	const objectD = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'd' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectDRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/d' ) ).setClass( 'Label' )
	);
	objectDRow.add( objectD );
	container.add( objectDRow );

	// eye

	const objectEyeRow = new UIRow();
	const objectEye = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'eye' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectEyeRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/eye' ) ).setClass( 'Label' )
	);
	objectEyeRow.add( objectEye );
	container.add( objectEyeRow );

	// fov

	const objectFovRow = new UIRow();
	const objectFov = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'fov' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectFovRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/fov' ) ).setClass( 'Label' )
	);
	objectFovRow.add( objectFov );
	container.add( objectFovRow );

	// tx

	const objectTxRow = new UIRow();
	const objectTx = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'tx' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectTxRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/tx' ) ).setClass( 'Label' )
	);
	objectTxRow.add( objectTx );
	container.add( objectTxRow );

	// ty

	const objectTyRow = new UIRow();
	const objectTy = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'ty' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectTyRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/ty' ) ).setClass( 'Label' )
	);
	objectTyRow.add( objectTy );
	container.add( objectTyRow );

	// tz

	const objectTzRow = new UIRow();
	const objectTz = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'tz' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectTzRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/tz' ) ).setClass( 'Label' )
	);
	objectTzRow.add( objectTz );
	container.add( objectTzRow );

	// cd

	const objectCdRow = new UIRow();
	const objectCd = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'cd' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectCdRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/cd' ) ).setClass( 'Label' )
	);
	objectCdRow.add( objectCd );
	container.add( objectCdRow );

	// cr

	const objectCrRow = new UIRow();
	const objectCr = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'cr' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectCrRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/cr' ) ).setClass( 'Label' )
	);
	objectCrRow.add( objectCr );
	container.add( objectCrRow );

	// msg

	const objectMsgRow = new UIRow();
	const objectMsg = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'msg' )
	    .setValue( '' )
	    .onChange( update );

	objectMsgRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/msg' ) ).setClass( 'Label' )
	);
	objectMsgRow.add( objectMsg );
	container.add( objectMsgRow );

	// br

	const objectBrRow = new UIRow();
	const objectBr = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'br' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( ! /^\d*$/.test( value ) ) {

	            this.setValue( value.replace( /\D/g, '' ) ); // Allow only digits

			}

		} )
	    .onChange( update );

	objectBrRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/br' ) ).setClass( 'Label' )
	);
	objectBrRow.add( objectBr );
	container.add( objectBrRow );

	// bg

	const objectBgRow = new UIRow();
	const objectBg = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'bg' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( value.length > 6 ) {

	            this.setValue( value.slice( 0, 6 ) ); // Enforce 6-character limit

			}

		} )
	    .onChange( update );

	objectBgRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/bg' ) ).setClass( 'Label' )
	);
	objectBgRow.add( objectBg );
	container.add( objectBgRow );

	// amb

	const objectAmbRow = new UIRow();
	const objectAmb = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'amb' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( value.length > 6 ) {

	            this.setValue( value.slice( 0, 6 ) ); // Enforce 6-character limit

			}

		} )
	    .onChange( update );

	objectAmbRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/amb' ) ).setClass( 'Label' )
	);
	objectAmbRow.add( objectAmb );
	container.add( objectAmbRow );


	// dif

	const objectDifRow = new UIRow();
	const objectDif = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'dif' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( value.length > 6 ) {

	            this.setValue( value.slice( 0, 6 ) ); // Enforce 6-character limit

			}

		} )
	    .onChange( update );

	objectDifRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/dif' ) ).setClass( 'Label' )
	);
	objectDifRow.add( objectDif );
	container.add( objectDifRow );

	// spe

	const objectSpeRow = new UIRow();
	const objectSpe = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'spe' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( value.length > 6 ) {

	            this.setValue( value.slice( 0, 6 ) ); // Enforce 6-character limit

			}

		} )
	    .onChange( update );

	objectSpeRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/spe' ) ).setClass( 'Label' )
	);
	objectSpeRow.add( objectSpe );
	container.add( objectSpeRow );

	// gro

	const objectGroRow = new UIRow();
	const objectGro = new UIInput()
	    .setWidth( '150px' )
	    .setFontSize( '12px' )
	    .setId( 'gro' )
	    .setValue( '' )
	    .onInput( function () {

	        const value = this.getValue();
	        if ( value.length > 6 ) {

	            this.setValue( value.slice( 0, 6 ) ); // Enforce 6-character limit

			}

		} )
	    .onChange( update );

	objectGroRow.add(
	    new UIText( strings.getKey( 'sidebar/effects/gro' ) ).setClass( 'Label' )
	);
	objectGroRow.add( objectGro );
	container.add( objectGroRow );

	function update() {
		if (editor.scene.children.length != 0) {
			updateUI(editor.selected);
		}
		if (editor.selected.uuid == lastObjectId) {
			editor.selected.userData.effects = {
				use: objectUse.getValue(),
				drift: objectDrift.getValue() === 'on',
				jump: objectJump.getValue() === 'on',
				jh: parseFloat( objectJh.getValue() ),
				js: parseFloat( objectJs.getValue() ),
				turn: parseFloat( objectTurn.getValue() ),
				speed: parseFloat( objectSpeed.getValue() ),
				dx: parseFloat( objectDx.getValue() ),
				dy: parseFloat( objectDy.getValue() ),
				dz: parseFloat( objectDz.getValue() ),
				sl: parseFloat( objectSl.getValue() ),
				sr: parseFloat( objectSr.getValue() ),
				id: objectId.getValue(),
				mx: parseFloat( objectMx.getValue() ),
				my: parseFloat( objectMy.getValue() ),
				mz: parseFloat( objectMz.getValue() ),
				rx: parseFloat( objectRx.getValue() ),
				ry: parseFloat( objectRy.getValue() ),
				rz: parseFloat( objectRz.getValue() ),
				gx: parseFloat( objectGx.getValue() ),
				gy: parseFloat( objectGy.getValue() ),
				gz: parseFloat( objectGz.getValue() ),
				bou: parseFloat( objectBou.getValue() ),
				mass: parseFloat( objectMass.getValue() ),
				fr: parseFloat( objectFr.getValue() ),
				air: objectAir.getValue() === 'on',
				topr: parseFloat( objectTopr.getValue() ),
				k: objectK.getValue() === 'on',
				d: parseFloat( objectD.getValue() ),
				eye: parseFloat( objectEye.getValue() ),
				fov: parseFloat( objectFov.getValue() ),
				tx: parseFloat( objectTx.getValue() ),
				ty: parseFloat( objectTy.getValue() ),
				tz: parseFloat( objectTz.getValue() ),
				cd: parseFloat( objectCd.getValue() ),
				cr: parseFloat( objectCr.getValue() ),
				msg: objectMsg.getValue(),
				br: parseFloat( objectBr.getValue() ),
				bg: objectBg.getValue(),
				amb: objectAmb.getValue(),
				dif: objectDif.getValue(),
				spe: objectSpe.getValue(),
				gro: objectGro.getValue(),
			};
			editor.storage.set( editor.toJSON() );
	
			editor.signals.savingFinished.dispatch();
		}
		lastObjectId = editor.selected.uuid;

	}

	function updateRows( object ) {

		const properties = {
			// 'fov': objectFovRow,
			// 'left': objectLeftRow,
			// 'right': objectRightRow,
			// 'top': objectTopRow,
			// 'bottom': objectBottomRow,
			// 'near': objectNearRow,
			// 'far': objectFarRow,
			// 'intensity': objectIntensityRow,
			// 'color': objectColorRow,
			// 'groundColor': objectGroundColorRow,
			// 'distance': objectDistanceRow,
			// 'angle': objectAngleRow,
			// 'penumbra': objectPenumbraRow,
			// 'decay': objectDecayRow,
			// 'castShadow': objectShadowRow,
			// 'receiveShadow': objectReceiveShadow,
			// 'shadow': [ objectShadowIntensityRow, objectShadowBiasRow, objectShadowNormalBiasRow, objectShadowRadiusRow ]
		};

		for ( const property in properties ) {

			const uiElement = properties[ property ];

			if ( Array.isArray( uiElement ) === true ) {

				for ( let i = 0; i < uiElement.length; i ++ ) {

					uiElement[ i ].setDisplay( object[ property ] !== undefined ? '' : 'none' );

				}

			} else {

				uiElement.setDisplay( object[ property ] !== undefined ? '' : 'none' );

			}

		}

	}

	// function updateTransformRows( object ) {

	// }

	// if ( object.isAmbientLight || object.isHemisphereLight ) {

	// 	objectShadowRow.setDisplay( 'none' );

	// }

	// }

	function updateTransformRows( object ) {

		/*if ( object.isLight ) {

			objectRotationRow.setDisplay( 'none' );
			objectScaleRow.setDisplay( 'none' );

		} else {

			objectRotationRow.setDisplay( '' );
			objectScaleRow.setDisplay( '' );

		}*/

	}

	// events

	signals.objectSelected.add( function ( object ) {

		if ( object !== null ) {

			container.setDisplay( 'block' );

			updateRows( object );
			updateUI( object );

		} else {

			container.setDisplay( 'none' );

		}

	} );

	signals.objectChanged.add( function ( object ) {

		if ( object !== editor.selected ) return;

		updateUI( object );

	} );

	signals.refreshSidebarObject3D.add( function ( object ) {

		if ( object !== editor.selected ) return;

		updateUI( object );

	} );

	function applySettings( geometryType ) {

		const geometries = [ 'PlaneGeometry', 'BoxGeometry', 'ConeGeometry', 'CapsuleGeometry', 'CylinderGeometry', 'SphereGeometry', 'OctahedronGeometry' ];
		const effects = {
		    use: [ 1, 0, 0, 0, 0, 0, 1 ],
		    drift: [ 0, 1, 0, 0, 0, 0, 0 ],
		    jump: [ 0, 1, 0, 0, 0, 0, 0 ],
		    jh: [ 1, 0, 0, 0, 0, 0, 1 ],
		    js: [ 1, 0, 0, 0, 0, 0, 1 ],
		    turn: [ 1, 0, 0, 0, 0, 0, 1 ],
		    speed: [ 1, 0, 0, 0, 0, 0, 1 ],
		    dx: [ 1, 0, 0, 0, 0, 0, 1 ],
		    dy: [ 1, 0, 0, 0, 0, 0, 1 ],
		    dz: [ 1, 0, 0, 0, 0, 0, 1 ],
		    sl: [ 1, 0, 0, 0, 0, 0, 0 ],
		    sr: [ 1, 0, 0, 0, 0, 0, 0 ],
		    id: [ 1, 1, 1, 1, 1, 1, 1 ],
		    mx: [ 0, 1, 1, 1, 1, 1, 0 ],
		    my: [ 0, 1, 1, 1, 1, 1, 0 ],
		    mz: [ 0, 1, 1, 1, 1, 1, 0 ],
		    rx: [ 0, 1, 1, 1, 1, 1, 0 ],
		    ry: [ 0, 1, 1, 1, 1, 1, 0 ],
		    rz: [ 0, 1, 1, 1, 1, 1, 0 ],
		    gx: [ 1, 0, 0, 0, 0, 0, 1 ],
		    gy: [ 1, 0, 0, 0, 0, 0, 1 ],
		    gz: [ 1, 0, 0, 0, 0, 0, 1 ],
		    bou: [ 0, 1, 0, 0, 1, 1, 0 ],
		    mass: [ 0, 1, 0, 0, 1, 1, 0 ],
		    fr: [ 0, 1, 0, 0, 1, 1, 0 ],
		    air: [ 0, 1, 0, 0, 1, 1, 0 ],
		    topr: [ 0, 0, 0, 0, 1, 0, 0 ],
		    k: [ 0, 1, 0, 0, 1, 1, 0 ],
		    d: [ 1, 0, 0, 0, 0, 0, 1 ],
		    eye: [ 1, 0, 0, 0, 0, 0, 1 ],
		    fov: [ 1, 0, 0, 0, 0, 0, 1 ],
		    tx: [ 1, 0, 0, 0, 0, 0, 1 ],
		    ty: [ 1, 0, 0, 0, 0, 0, 1 ],
		    tz: [ 1, 0, 0, 0, 0, 0, 1 ],
		    cd: [ 1, 0, 0, 0, 0, 0, 1 ],
		    cr: [ 1, 0, 0, 0, 0, 0, 1 ],
		    msg: [ 1, 0, 0, 0, 0, 0, 0 ],
		    br: [ 1, 0, 0, 0, 0, 0, 1 ],
		    bg: [ 1, 0, 0, 0, 0, 0, 1 ],
		    amb: [ 1, 0, 0, 0, 0, 0, 1 ],
		    dif: [ 1, 0, 0, 0, 0, 0, 1 ],
		    spe: [ 1, 0, 0, 0, 0, 0, 1 ],
		    gro: [ 1, 0, 0, 0, 0, 0, 1 ],
		};
		const geometryIndex = geometries.indexOf( geometryType );

		if ( geometryIndex === - 1 ) {

			console.warn( `No settings found for geometry type: ${geometryType}` ); //THIS LINE CAN BE REMOVED LATER
			// return;


			for ( const [ effect, settings ] of Object.entries( effects ) ) {

				const hidden = settings[ geometryIndex ] === 0; // 0 means hidden, 1 means visible
		        const element = document.getElementById( effect );
		        if ( element ) {

		            element.parentElement.hidden = hidden;

				}

			}

			for ( const [ effect, settings ] of Object.entries( effects ) ) {

				const hidden = settings[ geometryIndex ] === 0; // 0 means hidden, 1 means visible
		        const element = document.getElementById( effect );
		        if ( element ) {

		            element.parentElement.hidden = hidden;

				}

			}

		}

		for ( const [ effect, settings ] of Object.entries( effects ) ) {

			const hidden = settings[ geometryIndex ] === 0; // 0 means hidden, 1 means visible
		        const element = document.getElementById( effect );
		        if ( element ) element.parentElement.hidden = hidden;

		}

		// editor.selected.userData.effects = effects;
		update();

	}

	function updateUI(object) {
		applySettings(object.geometry.type);
		
		function addEffects() {
		    for (let effect in effectsData) {
		            let value = effectsData[effect];
		            if (value.toString() == 'NaN') value = '';
		            if (value.toString() == 'false') value = 'off';
		            if (value.toString() == 'true') value = 'on';
		            document.getElementById(effect).value = value;
		    }
		}
		let objectMatch = -1;
		for (let i = 0; i < editor.scene.children.length; i++) {
		    if (editor.scene.children[i].uuid === editor.selected.uuid) {
		            objectMatch = i;
		    }
		}
		let request = indexedDB.open("threejs-editor", 1);
		request.onsuccess = function() {
		        let transaction = request.result.transaction("states")
		        let store = transaction.objectStore("states")
		        let qresult = store.getAll();
		    qresult.onsuccess = function(event) {
		        let states = event.target.result;
		        globalThis.effectsData = states[0].scene.object.children[objectMatch].userData.effects;
		        addEffects();
		        };
		    };
		updateTransformRows(object);
	}


	// container.setContentHidden = function ( hidden ) {

	//     	content.setHidden( hidden );

	// };

	return container;

}

export { SidebarEffects };
