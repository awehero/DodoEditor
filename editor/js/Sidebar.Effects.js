import * as THREE from 'three';

import { UIPanel, UIRow, UIInput,
	  UIColor, UISelect,
	  UIText, UINumber
	 } from './libs/ui.js';
// import { UIBoolean } from './libs/ui.three.js';

// import { SetUuidCommand } from './commands/SetUuidCommand.js';
import { SetValueCommand } from './commands/SetValueCommand.js';
import { SetPositionCommand } from './commands/SetPositionCommand.js';
import { SetRotationCommand } from './commands/SetRotationCommand.js';
import { SetScaleCommand } from './commands/SetScaleCommand.js';
// import { SetColorCommand } from './commands/SetColorCommand.js';
// import { SetShadowValueCommand } from './commands/SetShadowValueCommand.js';

// import { SidebarObjectAnimation } from './Sidebar.Object.Animation.js';

import { refreshUI } from './Sidebar.Scene.js';

function SidebarEffects( editor ) {

	const strings = editor.strings;

	const signals = editor.signals;

	const container = new UIPanel();
	container.setId( 'effects' );
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );
	container.setDisplay( 'none' );

	// Actions

	/*
	let objectActions = new UI.Select().setPosition( 'absolute' ).setRight( '8px' ).setFontSize( '11px' );
	objectActions.setOptions( {

		'Actions': 'Actions',
		'Reset Position': 'Reset Position',
		'Reset Rotation': 'Reset Rotation',
		'Reset Scale': 'Reset Scale'

	} );
	objectActions.onClick( function ( event ) {

		event.stopPropagation(); // Avoid panel collapsing

	} );
	objectActions.onChange( function ( event ) {

		let object = editor.selected;

		switch ( this.getValue() ) {

			case 'Reset Position':
				editor.execute( new SetPositionCommand( editor, object, new Vector3( 0, 0, 0 ) ) );
				break;

			case 'Reset Rotation':
				editor.execute( new SetRotationCommand( editor, object, new Euler( 0, 0, 0 ) ) );
				break;

			case 'Reset Scale':
				editor.execute( new SetScaleCommand( editor, object, new Vector3( 1, 1, 1 ) ) );
				break;

		}

		this.setValue( 'Actions' );

	} );
	container.addStatic( objectActions );
	*/

	// type

	// const objectTypeRow = new UIRow();
	// const objectType = new UIText();

	// objectTypeRow.add( new UIText( strings.getKey( 'sidebar/object/type' ) ).setClass( 'Label' ) );
	// objectTypeRow.add( objectType );

	// container.add( objectTypeRow );

	// uuid

	// const objectUUIDRow = new UIRow();
	// const objectUUID = new UIInput().setWidth( '102px' ).setFontSize( '12px' ).setDisabled( true );
	// const objectUUIDRenew = new UIButton( strings.getKey( 'sidebar/object/new' ) ).setMarginLeft( '7px' ).onClick( function () {

	// 	objectUUID.setValue( THREE.MathUtils.generateUUID() );

	// 	editor.execute( new SetUuidCommand( editor, editor.selected, objectUUID.getValue() ) );

	// } );

	// objectUUIDRow.add( new UIText( strings.getKey( 'sidebar/object/uuid' ) ).setClass( 'Label' ) );
	// objectUUIDRow.add( objectUUID );
	// objectUUIDRow.add( objectUUIDRenew );

	// container.add( objectUUIDRow );

	//id
	
	// use

	const objectUseRow = new UIRow();
	const objectUse = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('use')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d?$/.test(value)) {
	            this.setValue(value.slice(0, 1)); // 1 digit limit
	        }
	    })
	    .onChange(update);
	
	objectUseRow.add(
	    new UIText(strings.getKey('sidebar/effects/use')).setClass('Label')
	);
	objectUseRow.add(objectUse);
	container.add(objectUseRow);
	
	
	// drift
	
	const objectDriftRow = new UIRow();
	const objectDrift = new UISelect()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('drift')
	    .setOptions({ off: 'Off', on: 'On' })
	    .setValue('off') // Default to 'off'
	    .onChange(update);
	
	objectDriftRow.add(
	    new UIText(strings.getKey('sidebar/effects/drift')).setClass('Label')
	);
	objectDriftRow.add(objectDrift);
	container.add(objectDriftRow);
	
	
	// jump
	
	const objectJumpRow = new UIRow();
	const objectJump = new UISelect()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('jump')
	    .setOptions({ off: 'Off', on: 'On' })
	    .setValue('off') // Default to 'off'
	    .onChange(update);
	
	objectJumpRow.add(
	    new UIText(strings.getKey('sidebar/effects/jump')).setClass('Label')
	);
	objectJumpRow.add(objectJump);
	container.add(objectJumpRow);
	
	
	// jh
	
	const objectJhRow = new UIRow();
	const objectJh = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('jh')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectJhRow.add(
	    new UIText(strings.getKey('sidebar/effects/jh')).setClass('Label')
	);
	objectJhRow.add(objectJh);
	container.add(objectJhRow);
	
	
	// js
	
	const objectJsRow = new UIRow();
	const objectJs = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('js')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectJsRow.add(
	    new UIText(strings.getKey('sidebar/effects/js')).setClass('Label')
	);
	objectJsRow.add(objectJs);
	container.add(objectJsRow);
	
	
	// turn
	
	const objectTurnRow = new UIRow();
	const objectTurn = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('turn')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectTurnRow.add(
	    new UIText(strings.getKey('sidebar/effects/turn')).setClass('Label')
	);
	objectTurnRow.add(objectTurn);
	container.add(objectTurnRow);
	
	
	// speed
	
	const objectSpeedRow = new UIRow();
	const objectSpeed = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('speed')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectSpeedRow.add(
	    new UIText(strings.getKey('sidebar/effects/speed')).setClass('Label')
	);
	objectSpeedRow.add(objectSpeed);
	container.add(objectSpeedRow);
	
	
	// dx
	
	const objectDxRow = new UIRow();
	const objectDx = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('dx')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectDxRow.add(
	    new UIText(strings.getKey('sidebar/effects/dx')).setClass('Label')
	);
	objectDxRow.add(objectDx);
	container.add(objectDxRow);
	
	
	// dy

	const objectDyRow = new UIRow();
	const objectDy = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('dy')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectDyRow.add(
	    new UIText(strings.getKey('sidebar/effects/dy')).setClass('Label')
	);
	objectDyRow.add(objectDy);
	container.add(objectDyRow);
	
	
	// dz
	
	const objectDzRow = new UIRow();
	const objectDz = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('dz')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectDzRow.add(
	    new UIText(strings.getKey('sidebar/effects/dz')).setClass('Label')
	);
	objectDzRow.add(objectDz);
	container.add(objectDzRow);
	
	
	// sl
	
	const objectSlRow = new UIRow();
	const objectSl = new UISelect()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('sl')
	    .setOptions({ off: 'Off', on: 'On' })
	    .setValue('off') // Default to 'off'
	    .onChange(update);
	
	objectSlRow.add(
	    new UIText(strings.getKey('sidebar/effects/sl')).setClass('Label')
	);
	objectSlRow.add(objectSl);
	container.add(objectSlRow);
	
	
	// sr
	
	const objectSrRow = new UIRow();
	const objectSr = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('sr')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectSrRow.add(
	    new UIText(strings.getKey('sidebar/effects/sr')).setClass('Label')
	);
	objectSrRow.add(objectSr);
	container.add(objectSrRow);
	
	
	// id
	
	const objectIdRow = new UIRow();
	const objectId = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('id')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d?$/.test(value)) {
	            this.setValue(value.slice(0, 1)); // 1 digit limit
	        }
	    })
	    .onChange(update);
	
	objectIdRow.add(
	    new UIText(strings.getKey('sidebar/effects/id')).setClass('Label')
	);
	objectIdRow.add(objectId);
	container.add(objectIdRow);
	
	
	// mx
	
	const objectMxRow = new UIRow();
	const objectMx = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('mx')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectMxRow.add(
	    new UIText(strings.getKey('sidebar/effects/mx')).setClass('Label')
	);
	objectMxRow.add(objectMx);
	container.add(objectMxRow);
	
	
	// my
	
	const objectMyRow = new UIRow();
	const objectMy = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('my')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectMyRow.add(
	    new UIText(strings.getKey('sidebar/effects/my')).setClass('Label')
	);
	objectMyRow.add(objectMy);
	container.add(objectMyRow);
	
	
	// mz
	
	const objectMzRow = new UIRow();
	const objectMz = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('mz')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectMzRow.add(
	    new UIText(strings.getKey('sidebar/effects/mz')).setClass('Label')
	);
	objectMzRow.add(objectMz);
	container.add(objectMzRow);

	// rx

	const objectRxRow = new UIRow();
	const objectRx = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('rx')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectRxRow.add(
	    new UIText(strings.getKey('sidebar/effects/rx')).setClass('Label')
	);
	objectRxRow.add(objectRx);
	container.add(objectRxRow);
	
	
	// ry
	
	const objectRyRow = new UIRow();
	const objectRy = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('ry')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectRyRow.add(
	    new UIText(strings.getKey('sidebar/effects/ry')).setClass('Label')
	);
	objectRyRow.add(objectRy);
	container.add(objectRyRow);
	
	
	// rz
	
	const objectRzRow = new UIRow();
	const objectRz = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('rz')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectRzRow.add(
	    new UIText(strings.getKey('sidebar/effects/rz')).setClass('Label')
	);
	objectRzRow.add(objectRz);
	container.add(objectRzRow);
	
	
	// gx
	
	const objectGxRow = new UIRow();
	const objectGx = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('gx')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectGxRow.add(
	    new UIText(strings.getKey('sidebar/effects/gx')).setClass('Label')
	);
	objectGxRow.add(objectGx);
	container.add(objectGxRow);
	
	
	// gy
	
	const objectGyRow = new UIRow();
	const objectGy = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('gy')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectGyRow.add(
	    new UIText(strings.getKey('sidebar/effects/gy')).setClass('Label')
	);
	objectGyRow.add(objectGy);
	container.add(objectGyRow);
	
	
	// gz
	
	const objectGzRow = new UIRow();
	const objectGz = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('gz')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectGzRow.add(
	    new UIText(strings.getKey('sidebar/effects/gz')).setClass('Label')
	);
	objectGzRow.add(objectGz);
	container.add(objectGzRow);
	
	
	// bou
	
	const objectBouRow = new UIRow();
	const objectBou = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('bou')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectBouRow.add(
	    new UIText(strings.getKey('sidebar/effects/bou')).setClass('Label')
	);
	objectBouRow.add(objectBou);
	container.add(objectBouRow);
	
	
	// mass
	
	const objectMassRow = new UIRow();
	const objectMass = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('mass')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectMassRow.add(
	    new UIText(strings.getKey('sidebar/effects/mass')).setClass('Label')
	);
	objectMassRow.add(objectMass);
	container.add(objectMassRow);

	// fr

	const objectFrRow = new UIRow();
	const objectFr = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('fr')
	    .setValue(1) // Default value is 1
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectFrRow.add(
	    new UIText(strings.getKey('sidebar/effects/fr')).setClass('Label')
	);
	objectFrRow.add(objectFr);
	container.add(objectFrRow);
	
	
	// air
	
	const objectAirRow = new UIRow();
	const objectAir = new UISelect()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('air')
	    .setOptions({ on: 'On', off: 'Off' })
	    .setValue('on') // Default value is "on"
	    .onChange(update);
	
	objectAirRow.add(
	    new UIText(strings.getKey('sidebar/effects/air')).setClass('Label')
	);
	objectAirRow.add(objectAir);
	container.add(objectAirRow);
	
	
	// topr
	
	const objectToprRow = new UIRow();
	const objectTopr = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('topr')
	    .setValue(1) // Default value is 1
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectToprRow.add(
	    new UIText(strings.getKey('sidebar/effects/topr')).setClass('Label')
	);
	objectToprRow.add(objectTopr);
	container.add(objectToprRow);
	
	
	// k
	
	const objectKRow = new UIRow();
	const objectK = new UISelect()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('k')
	    .setOptions({ on: 'On', off: 'Off' })
	    .setValue('off') // Default value is "off"
	    .onChange(update);
	
	objectKRow.add(
	    new UIText(strings.getKey('sidebar/effects/k')).setClass('Label')
	);
	objectKRow.add(objectK);
	container.add(objectKRow);
	
	
	// d
	
	const objectDRow = new UIRow();
	const objectD = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('d')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectDRow.add(
	    new UIText(strings.getKey('sidebar/effects/d')).setClass('Label')
	);
	objectDRow.add(objectD);
	container.add(objectDRow);
	
	
	// eye
	
	const objectEyeRow = new UIRow();
	const objectEye = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('eye')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectEyeRow.add(
	    new UIText(strings.getKey('sidebar/effects/eye')).setClass('Label')
	);
	objectEyeRow.add(objectEye);
	container.add(objectEyeRow);
	
	
	// fov
	
	const objectFovRow = new UIRow();
	const objectFov = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('fov')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectFovRow.add(
	    new UIText(strings.getKey('sidebar/effects/fov')).setClass('Label')
	);
	objectFovRow.add(objectFov);
	container.add(objectFovRow);
	
	
	// tx
	
	const objectTxRow = new UIRow();
	const objectTx = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('tx')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectTxRow.add(
	    new UIText(strings.getKey('sidebar/effects/tx')).setClass('Label')
	);
	objectTxRow.add(objectTx);
	container.add(objectTxRow);

	// ty

	const objectTyRow = new UIRow();
	const objectTy = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('ty')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectTyRow.add(
	    new UIText(strings.getKey('sidebar/effects/ty')).setClass('Label')
	);
	objectTyRow.add(objectTy);
	container.add(objectTyRow);
	
	
	// tz
	
	const objectTzRow = new UIRow();
	const objectTz = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('tz')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectTzRow.add(
	    new UIText(strings.getKey('sidebar/effects/tz')).setClass('Label')
	);
	objectTzRow.add(objectTz);
	container.add(objectTzRow);
	
	
	// cd
	
	const objectCdRow = new UIRow();
	const objectCd = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('cd')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectCdRow.add(
	    new UIText(strings.getKey('sidebar/effects/cd')).setClass('Label')
	);
	objectCdRow.add(objectCd);
	container.add(objectCdRow);
	
	
	// cr
	
	const objectCrRow = new UIRow();
	const objectCr = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('cr')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectCrRow.add(
	    new UIText(strings.getKey('sidebar/effects/cr')).setClass('Label')
	);
	objectCrRow.add(objectCr);
	container.add(objectCrRow);
	
	
	// msg
	
	const objectMsgRow = new UIRow();
	const objectMsg = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('msg')
	    .onChange(update);
	
	objectMsgRow.add(
	    new UIText(strings.getKey('sidebar/effects/msg')).setClass('Label')
	);
	objectMsgRow.add(objectMsg);
	container.add(objectMsgRow);
	
	
	// br
	
	const objectBrRow = new UIRow();
	const objectBr = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('br')
	    .onInput(function () {
	        const value = this.getValue();
	        if (!/^\d*$/.test(value)) {
	            this.setValue(value.replace(/\D/g, '')); // Allow only digits
	        }
	    })
	    .onChange(update);
	
	objectBrRow.add(
	    new UIText(strings.getKey('sidebar/effects/br')).setClass('Label')
	);
	objectBrRow.add(objectBr);
	container.add(objectBrRow);
	
	
	// bg
	
	const objectBgRow = new UIRow();
	const objectBg = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('bg')
	    .onInput(function () {
	        const value = this.getValue();
	        if (value.length > 6) {
	            this.setValue(value.slice(0, 6)); // Enforce 6-character limit
	        }
	    })
	    .onChange(update);
	
	objectBgRow.add(
	    new UIText(strings.getKey('sidebar/effects/bg')).setClass('Label')
	);
	objectBgRow.add(objectBg);
	container.add(objectBgRow);

	// amb

	const objectAmbRow = new UIRow();
	const objectAmb = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('amb')
	    .onInput(function () {
	        const value = this.getValue();
	        if (value.length > 6) {
	            this.setValue(value.slice(0, 6)); // Enforce 6-character limit
	        }
	    })
	    .onChange(update);
	
	objectAmbRow.add(
	    new UIText(strings.getKey('sidebar/effects/amb')).setClass('Label')
	);
	objectAmbRow.add(objectAmb);
	container.add(objectAmbRow);
	
	
	// dif
	
	const objectDifRow = new UIRow();
	const objectDif = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('dif')
	    .onInput(function () {
	        const value = this.getValue();
	        if (value.length > 6) {
	            this.setValue(value.slice(0, 6)); // Enforce 6-character limit
	        }
	    })
	    .onChange(update);
	
	objectDifRow.add(
	    new UIText(strings.getKey('sidebar/effects/dif')).setClass('Label')
	);
	objectDifRow.add(objectDif);
	container.add(objectDifRow);
	
	
	// spe
	
	const objectSpeRow = new UIRow();
	const objectSpe = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('spe')
	    .onInput(function () {
	        const value = this.getValue();
	        if (value.length > 6) {
	            this.setValue(value.slice(0, 6)); // Enforce 6-character limit
	        }
	    })
	    .onChange(update);
	
	objectSpeRow.add(
	    new UIText(strings.getKey('sidebar/effects/spe')).setClass('Label')
	);
	objectSpeRow.add(objectSpe);
	container.add(objectSpeRow);
	
	
	// gro
	
	const objectGroRow = new UIRow();
	const objectGro = new UIInput()
	    .setWidth('150px')
	    .setFontSize('12px')
	    .setId('gro')
	    .onInput(function () {
	        const value = this.getValue();
	        if (value.length > 6) {
	            this.setValue(value.slice(0, 6)); // Enforce 6-character limit
	        }
	    })
	    .onChange(update);
	
	objectGroRow.add(
	    new UIText(strings.getKey('sidebar/effects/gro')).setClass('Label')
	);
	objectGroRow.add(objectGro);
	container.add(objectGroRow);

	
	

	// change functions
	/*function handleSelectionChange() { MIGHT NEED THIS LATER IDK

		if ( editor.selected === null ) return;

		const selectedObject = editor.selected;

		// Hide all dropdowns initially
		sphereCylinderDropdown.setDisplay( 'none' );
		coneDropdown.setDisplay( 'none' );
		platformBoxDropdown.setDisplay( 'none' );
		colorPickerRow.setDisplay( 'none' );
		alphaRow.setDisplay( 'none' );

		if ( selectedObject.geometry.type == 'SphereGeometry' || selectedObject.geometry.type == 'CylinderGeometry' ) {

			sphereCylinderDropdown.setDisplay( '' );
			colorPickerRow.setDisplay( '' );
			alphaRow.setDisplay( '' );

		} else if ( selectedObject.geometry.type == 'ConeGeometry' && selectedObject.name !== 'Spawn' ) {

			coneDropdown.setDisplay( '' );

		} else if ( selectedObject.geometry.type == 'BoxGeometry' ) {

			platformBoxDropdown.setDisplay( '' );
			colorPickerRow.setDisplay( '' );
			alphaRow.setDisplay( '' );

		}

		afterSelection();

	}*/

	// Ensure handleSelectionChange is called when a new object is selected
	//editor.signals.objectSelected.add( handleSelectionChange ); MIGHT NEED THIS LATER IDK
	// fov

	// const objectFovRow = new UIRow();
	// const objectFov = new UINumber().onChange( update );

	// objectFovRow.add( new UIText( strings.getKey( 'sidebar/object/fov' ) ).setClass( 'Label' ) );
	// objectFovRow.add( objectFov );

	// container.add( objectFovRow );

	// left

	// const objectLeftRow = new UIRow();
	// const objectLeft = new UINumber().onChange( update );

	// objectLeftRow.add( new UIText( strings.getKey( 'sidebar/object/left' ) ).setClass( 'Label' ) );
	// objectLeftRow.add( objectLeft );

	// container.add( objectLeftRow );

	// right

	// const objectRightRow = new UIRow();
	// const objectRight = new UINumber().onChange( update );

	// objectRightRow.add( new UIText( strings.getKey( 'sidebar/object/right' ) ).setClass( 'Label' ) );
	// objectRightRow.add( objectRight );

	// container.add( objectRightRow );

	// top

	// const objectTopRow = new UIRow();
	// const objectTop = new UINumber().onChange( update );

	// objectTopRow.add( new UIText( strings.getKey( 'sidebar/object/top' ) ).setClass( 'Label' ) );
	// objectTopRow.add( objectTop );

	// container.add( objectTopRow );

	// bottom

	// const objectBottomRow = new UIRow();
	// const objectBottom = new UINumber().onChange( update );

	// objectBottomRow.add( new UIText( strings.getKey( 'sidebar/object/bottom' ) ).setClass( 'Label' ) );
	// objectBottomRow.add( objectBottom );

	// container.add( objectBottomRow );

	// near

	// const objectNearRow = new UIRow();
	// const objectNear = new UINumber().onChange( update );

	// objectNearRow.add( new UIText( strings.getKey( 'sidebar/object/near' ) ).setClass( 'Label' ) );
	// objectNearRow.add( objectNear );

	// container.add( objectNearRow );

	// far

	// const objectFarRow = new UIRow();
	// const objectFar = new UINumber().onChange( update );

	// objectFarRow.add( new UIText( strings.getKey( 'sidebar/object/far' ) ).setClass( 'Label' ) );
	// objectFarRow.add( objectFar );

	// container.add( objectFarRow );

	// intensity

	// const objectIntensityRow = new UIRow();
	// const objectIntensity = new UINumber().onChange( update );

	// objectIntensityRow.add( new UIText( strings.getKey( 'sidebar/object/intensity' ) ).setClass( 'Label' ) );
	// objectIntensityRow.add( objectIntensity );

	// container.add( objectIntensityRow );

	// color

	// const objectColorRow = new UIRow();
	// const objectColor = new UIColor().onInput( update );

	// objectColorRow.add( new UIText( strings.getKey( 'sidebar/object/color' ) ).setClass( 'Label' ) );
	// objectColorRow.add( objectColor );

	// container.add( objectColorRow );

	// ground color

	// const objectGroundColorRow = new UIRow();
	// const objectGroundColor = new UIColor().onInput( update );

	// objectGroundColorRow.add( new UIText( strings.getKey( 'sidebar/object/groundcolor' ) ).setClass( 'Label' ) );
	// objectGroundColorRow.add( objectGroundColor );

	// container.add( objectGroundColorRow );

	// distance

	// const objectDistanceRow = new UIRow();
	// const objectDistance = new UINumber().setRange( 0, Infinity ).onChange( update );

	// objectDistanceRow.add( new UIText( strings.getKey( 'sidebar/object/distance' ) ).setClass( 'Label' ) );
	// objectDistanceRow.add( objectDistance );

	// container.add( objectDistanceRow );

	// angle

	// const objectAngleRow = new UIRow();
	// const objectAngle = new UINumber().setPrecision( 3 ).setRange( 0, Math.PI / 2 ).onChange( update );

	// objectAngleRow.add( new UIText( strings.getKey( 'sidebar/object/angle' ) ).setClass( 'Label' ) );
	// objectAngleRow.add( objectAngle );

	// container.add( objectAngleRow );

	// penumbra

	// const objectPenumbraRow = new UIRow();
	// const objectPenumbra = new UINumber().setRange( 0, 1 ).onChange( update );

	// objectPenumbraRow.add( new UIText( strings.getKey( 'sidebar/object/penumbra' ) ).setClass( 'Label' ) );
	// objectPenumbraRow.add( objectPenumbra );

	// container.add( objectPenumbraRow );

	// decay

	// const objectDecayRow = new UIRow();
	// const objectDecay = new UINumber().setRange( 0, Infinity ).onChange( update );

	// objectDecayRow.add( new UIText( strings.getKey( 'sidebar/object/decay' ) ).setClass( 'Label' ) );
	// objectDecayRow.add( objectDecay );

	// container.add( objectDecayRow );

	// shadow

	// const objectShadowRow = new UIRow();

	// objectShadowRow.add( new UIText( strings.getKey( 'sidebar/object/shadow' ) ).setClass( 'Label' ) );

	// const objectCastShadow = new UIBoolean( false, strings.getKey( 'sidebar/object/cast' ) ).onChange( update );
	// objectShadowRow.add( objectCastShadow );

	// const objectReceiveShadow = new UIBoolean( false, strings.getKey( 'sidebar/object/receive' ) ).onChange( update );
	// objectShadowRow.add( objectReceiveShadow );

	// container.add( objectShadowRow );

	// // shadow intensity

	// const objectShadowIntensityRow = new UIRow();

	// objectShadowIntensityRow.add( new UIText( strings.getKey( 'sidebar/object/shadowIntensity' ) ).setClass( 'Label' ) );

	// const objectShadowIntensity = new UINumber( 0 ).setRange( 0, 1 ).onChange( update );
	// objectShadowIntensityRow.add( objectShadowIntensity );

	// container.add( objectShadowIntensityRow );

	// // shadow bias

	// const objectShadowBiasRow = new UIRow();

	// objectShadowBiasRow.add( new UIText( strings.getKey( 'sidebar/object/shadowBias' ) ).setClass( 'Label' ) );

	// const objectShadowBias = new UINumber( 0 ).setPrecision( 5 ).setStep( 0.0001 ).setNudge( 0.00001 ).onChange( update );
	// objectShadowBiasRow.add( objectShadowBias );

	// container.add( objectShadowBiasRow );

	// // shadow normal offset

	// const objectShadowNormalBiasRow = new UIRow();

	// objectShadowNormalBiasRow.add( new UIText( strings.getKey( 'sidebar/object/shadowNormalBias' ) ).setClass( 'Label' ) );

	// const objectShadowNormalBias = new UINumber( 0 ).onChange( update );
	// objectShadowNormalBiasRow.add( objectShadowNormalBias );

	// container.add( objectShadowNormalBiasRow );

	// // shadow radius

	// const objectShadowRadiusRow = new UIRow();

	// objectShadowRadiusRow.add( new UIText( strings.getKey( 'sidebar/object/shadowRadius' ) ).setClass( 'Label' ) );

	// const objectShadowRadius = new UINumber( 1 ).onChange( update );
	// objectShadowRadiusRow.add( objectShadowRadius );

	// container.add( objectShadowRadiusRow );

	// // visible

	// const objectVisibleRow = new UIRow();
	// const objectVisible = new UICheckbox().onChange( update );

	// objectVisibleRow.add( new UIText( strings.getKey( 'sidebar/object/visible' ) ).setClass( 'Label' ) );
	// objectVisibleRow.add( objectVisible );

	// container.add( objectVisibleRow );

	// // frustumCulled

	// const objectFrustumCulledRow = new UIRow();
	// const objectFrustumCulled = new UICheckbox().onChange( update );

	// objectFrustumCulledRow.add( new UIText( strings.getKey( 'sidebar/object/frustumcull' ) ).setClass( 'Label' ) );
	// objectFrustumCulledRow.add( objectFrustumCulled );

	// container.add( objectFrustumCulledRow );

	// // renderOrder

	// const objectRenderOrderRow = new UIRow();
	// const objectRenderOrder = new UIInteger().setWidth( '50px' ).onChange( update );

	// objectRenderOrderRow.add( new UIText( strings.getKey( 'sidebar/object/renderorder' ) ).setClass( 'Label' ) );
	// objectRenderOrderRow.add( objectRenderOrder );

	// container.add( objectRenderOrderRow );

	// user data

	// const objectUserDataRow = new UIRow();
	// const objectUserData = new UITextArea().setWidth( '150px' ).setHeight( '40px' ).setFontSize( '12px' ).onChange( update );
	// objectUserData.onKeyUp( function () {

	// 	try {

	// 		JSON.parse( objectUserData.getValue() );

	// 		objectUserData.dom.classList.add( 'success' );
	// 		objectUserData.dom.classList.remove( 'fail' );

	// 	} catch ( error ) {

	// 		objectUserData.dom.classList.remove( 'success' );
	// 		objectUserData.dom.classList.add( 'fail' );

	// 	}

	// } );

	// objectUserDataRow.add( new UIText( strings.getKey( 'sidebar/object/userdata' ) ).setClass( 'Label' ) );
	// objectUserDataRow.add( objectUserData );

	// container.add( objectUserDataRow );

	// // Export JSON

	// const exportJson = new UIButton( strings.getKey( 'sidebar/object/export' ) );
	// exportJson.setMarginLeft( '120px' );
	// exportJson.onClick( function () {

	// 	const object = editor.selected;

	// 	let output = object.toJSON();

	// 	try {

	// 		output = JSON.stringify( output, null, '\t' );
	// 		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

	// 	} catch ( e ) {

	// 		output = JSON.stringify( output );

	// 	}

	// 	editor.utils.save( new Blob( [ output ] ), `${ objectName.getValue() || 'object' }.json` );

	// } );
	// container.add( exportJson );

	// // Animations

	// container.add( new SidebarObjectAnimation( editor ) );

	//

	function update() {

		/*const object = editor.selected;

		if ( object !== null ) {

			const newPosition = new THREE.Vector3(
				objectPositionX.getValue(),
				objectPositionY.getValue(),
				objectPositionZ.getValue()
			);
			if ( object.position.distanceTo( newPosition ) >= 0.01 ) {

				editor.execute( new SetPositionCommand( editor, object, newPosition ) );

			}

			const newRotation = new THREE.Euler(
				objectRotationX.getValue() * THREE.MathUtils.DEG2RAD,
				objectRotationY.getValue() * THREE.MathUtils.DEG2RAD,
				objectRotationZ.getValue() * THREE.MathUtils.DEG2RAD
			);
			if (
				new THREE.Vector3()
					.setFromEuler( object.rotation )
					.distanceTo( new THREE.Vector3().setFromEuler( newRotation ) ) >= 0.01
			) {

				editor.execute( new SetRotationCommand( editor, object, newRotation ) );

			}

			const newScale = new THREE.Vector3(
				objectScaleX.getValue(),
				objectScaleY.getValue(),
				objectScaleZ.getValue()
			);
			if ( object.scale.distanceTo( newScale ) >= 0.01 ) {

				if ( editor.selected.geometry.type == 'ConeGeometry' ) return;
				editor.execute( new SetScaleCommand( editor, object, newScale ) );

			}*/

			// if ( object.fov !== undefined && Math.abs( object.fov - objectFov.getValue() ) >= 0.01 ) {

			// 	editor.execute( new SetValueCommand( editor, object, 'fov', objectFov.getValue() ) );
			// 	object.updateProjectionMatrix();

			// }

			// if ( object.left !== undefined && Math.abs( object.left - objectLeft.getValue() ) >= 0.01 ) {

			// 	editor.execute( new SetValueCommand( editor, object, 'left', objectLeft.getValue() ) );
			// 	object.updateProjectionMatrix();

			// }

			// if ( object.right !== undefined && Math.abs( object.right - objectRight.getValue() ) >= 0.01 ) {

			// 	editor.execute( new SetValueCommand( editor, object, 'right', objectRight.getValue() ) );
			// 	object.updateProjectionMatrix();

			// }

			// if ( object.top !== undefined && Math.abs( object.top - objectTop.getValue() ) >= 0.01 ) {

			// 	editor.execute( new SetValueCommand( editor, object, 'top', objectTop.getValue() ) );
			// 	object.updateProjectionMatrix();

			// }

			// if ( object.bottom !== undefined && Math.abs( object.bottom - objectBottom.getValue() ) >= 0.01 ) {

			// 	editor.execute( new SetValueCommand( editor, object, 'bottom', objectBottom.getValue() ) );
			// 	object.updateProjectionMatrix();

			// }

			// if ( object.near !== undefined && Math.abs( object.near - objectNear.getValue() ) >= 0.01 ) {

			// 	editor.execute( new SetValueCommand( editor, object, 'near', objectNear.getValue() ) );
			// 	if ( object.isOrthographicCamera ) {

			// 		object.updateProjectionMatrix();

			// 	}

			// }

			// if ( object.far !== undefined && Math.abs( object.far - objectFar.getValue() ) >= 0.01 ) {

			// 	editor.execute( new SetValueCommand( editor, object, 'far', objectFar.getValue() ) );
			// 	if ( object.isOrthographicCamera ) {

			// 		object.updateProjectionMatrix();

			// 	}

			// }

			// if ( object.intensity !== undefined && Math.abs( object.intensity - objectIntensity.getValue() ) >= 0.01 ) {

			// 	editor.execute( new SetValueCommand( editor, object, 'intensity', objectIntensity.getValue() ) );

			// }

			// if ( object.color !== undefined && object.color.getHex() !== objectColor.getHexValue() ) {

			// 	editor.execute( new SetColorCommand( editor, object, 'color', objectColor.getHexValue() ) );

			// }

			// if ( object.groundColor !== undefined && object.groundColor.getHex() !== objectGroundColor.getHexValue() ) {

			// 	editor.execute( new SetColorCommand( editor, object, 'groundColor', objectGroundColor.getHexValue() ) );

			// }

			// if ( object.distance !== undefined && Math.abs( object.distance - objectDistance.getValue() ) >= 0.01 ) {

			// 	editor.execute( new SetValueCommand( editor, object, 'distance', objectDistance.getValue() ) );

			// }

			// if ( object.angle !== undefined && Math.abs( object.angle - objectAngle.getValue() ) >= 0.01 ) {

			// 	editor.execute( new SetValueCommand( editor, object, 'angle', objectAngle.getValue() ) );

			// }

			// if ( object.penumbra !== undefined && Math.abs( object.penumbra - objectPenumbra.getValue() ) >= 0.01 ) {

			// 	editor.execute( new SetValueCommand( editor, object, 'penumbra', objectPenumbra.getValue() ) );

			// }

			// if ( object.decay !== undefined && Math.abs( object.decay - objectDecay.getValue() ) >= 0.01 ) {

			// 	editor.execute( new SetValueCommand( editor, object, 'decay', objectDecay.getValue() ) );

			// }

			// if ( object.visible !== objectVisible.getValue() ) {

			// 	editor.execute( new SetValueCommand( editor, object, 'visible', objectVisible.getValue() ) );

			// }

			// if ( object.frustumCulled !== objectFrustumCulled.getValue() ) {

			// 	editor.execute( new SetValueCommand( editor, object, 'frustumCulled', objectFrustumCulled.getValue() ) );

			// }

			// if ( object.renderOrder !== objectRenderOrder.getValue() ) {

			// 	editor.execute( new SetValueCommand( editor, object, 'renderOrder', objectRenderOrder.getValue() ) );

			// }

			// if ( object.castShadow !== undefined && object.castShadow !== objectCastShadow.getValue() ) {

			// 	editor.execute( new SetValueCommand( editor, object, 'castShadow', objectCastShadow.getValue() ) );

			// }

			// if ( object.receiveShadow !== objectReceiveShadow.getValue() ) {

			// 	if ( object.material !== undefined ) object.material.needsUpdate = true;
			// 	editor.execute( new SetValueCommand( editor, object, 'receiveShadow', objectReceiveShadow.getValue() ) );

			// }

			// if ( object.shadow !== undefined ) {

			// 	if ( object.shadow.intensity !== objectShadowIntensity.getValue() ) {

			// 		editor.execute( new SetShadowValueCommand( editor, object, 'intensity', objectShadowIntensity.getValue() ) );

			// 	}

			// 	if ( object.shadow.bias !== objectShadowBias.getValue() ) {

			// 		editor.execute( new SetShadowValueCommand( editor, object, 'bias', objectShadowBias.getValue() ) );

			// 	}

			// 	if ( object.shadow.normalBias !== objectShadowNormalBias.getValue() ) {

			// 		editor.execute( new SetShadowValueCommand( editor, object, 'normalBias', objectShadowNormalBias.getValue() ) );

			// 	}

			// 	if ( object.shadow.radius !== objectShadowRadius.getValue() ) {

			// 		editor.execute( new SetShadowValueCommand( editor, object, 'radius', objectShadowRadius.getValue() ) );

			// 	}

			// }

			// try {

			// 	const userData = JSON.parse( objectUserData.getValue() );
			// 	if ( JSON.stringify( object.userData ) != JSON.stringify( userData ) ) {

			// 		editor.execute( new SetValueCommand( editor, object, 'userData', userData ) );

			// 	}

			// } catch ( exception ) {

			// 	console.warn( exception );

			// }

		}

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

		//

		// if ( object.isLight ) {

		// 	objectReceiveShadow.setDisplay( 'none' );

		// }

		// if ( object.isAmbientLight || object.isHemisphereLight ) {

		// 	objectShadowRow.setDisplay( 'none' );

		// }

	}

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

	function updateUI( object ) {

		// objectType.setValue( object.type );

		// objectUUID.setValue( object.uuid );
		/*objectName.setValue( object.name );
		if ( object.name == 'Spawn' ) {

		    document.querySelectorAll( 'input' )[ 5 ].disabled = true;

		} else {

		    document.querySelectorAll( 'input' )[ 5 ].disabled = false;

		}
		
		objectPositionX.setValue( object.position.x );
		objectPositionY.setValue( object.position.y );
		objectPositionZ.setValue( object.position.z );
		
		objectRotationX.setValue( object.rotation.x * THREE.MathUtils.RAD2DEG );
		objectRotationY.setValue( object.rotation.y * THREE.MathUtils.RAD2DEG );
		objectRotationZ.setValue( object.rotation.z * THREE.MathUtils.RAD2DEG );

		objectScaleX.setValue( object.scale.x );
		objectScaleY.setValue( object.scale.y );
		objectScaleZ.setValue( object.scale.z );
		
		if (object.geometry.type == 'PlaneGeometry') {
		    	document.getElementById('PosX').disabled = true;
			document.getElementById('PosY').disabled = true;
			document.getElementById('RotX').disabled = true;
			document.getElementById('RotY').disabled = true;
			document.getElementById('RotZ').disabled = true;
			document.getElementById('SizeX').disabled = true;
			document.getElementById('SizeZ').disabled = true;
			document.getElementById('PosX').style.color = 'gray';
			document.getElementById('PosY').style.color = 'gray';
			document.getElementById('RotX').style.color = 'gray';
			document.getElementById('RotY').style.color = 'gray';
			document.getElementById('RotZ').style.color = 'gray';
			document.getElementById('SizeX').style.color = 'gray';
			document.getElementById('SizeZ').style.color = 'gray';
		} else {
		    	document.getElementById('PosX').disabled = false;
			document.getElementById('PosY').disabled = false;
			document.getElementById('RotX').disabled = false;
			document.getElementById('RotY').disabled = false;
			document.getElementById('RotZ').disabled = false;
			document.getElementById('SizeX').disabled = false;
			document.getElementById('SizeZ').disabled = false;
			document.getElementById('PosX').style.color = '';
			document.getElementById('PosY').style.color = '';
			document.getElementById('RotX').style.color = '';
			document.getElementById('RotY').style.color = '';
			document.getElementById('RotZ').style.color = '';
			document.getElementById('SizeX').style.color = '';
			document.getElementById('SizeZ').style.color = '';
		}*/

		// if ( object.fov !== undefined ) {

		// 	objectFov.setValue( object.fov );

		// }

		// if ( object.left !== undefined ) {

		// 	objectLeft.setValue( object.left );

		// }

		// if ( object.right !== undefined ) {

		// 	objectRight.setValue( object.right );

		// }

		// if ( object.top !== undefined ) {

		// 	objectTop.setValue( object.top );

		// }

		// if ( object.bottom !== undefined ) {

		// 	objectBottom.setValue( object.bottom );

		// }

		// if ( object.near !== undefined ) {

		// 	objectNear.setValue( object.near );

		// }

		// if ( object.far !== undefined ) {

		// 	objectFar.setValue( object.far );

		// }

		// if ( object.intensity !== undefined ) {

		// 	objectIntensity.setValue( object.intensity );

		// }

		// if ( object.color !== undefined ) {

		// 	objectColor.setHexValue( object.color.getHexString() );

		// }

		// if ( object.groundColor !== undefined ) {

		// 	objectGroundColor.setHexValue( object.groundColor.getHexString() );

		// }

		// if ( object.distance !== undefined ) {

		// 	objectDistance.setValue( object.distance );

		// }

		// if ( object.angle !== undefined ) {

		// 	objectAngle.setValue( object.angle );

		// }

		// if ( object.penumbra !== undefined ) {

		// 	objectPenumbra.setValue( object.penumbra );

		// }

		// if ( object.decay !== undefined ) {

		// 	objectDecay.setValue( object.decay );

		// }

		// if ( object.castShadow !== undefined ) {

		// 	objectCastShadow.setValue( object.castShadow );

		// }

		// if ( object.receiveShadow !== undefined ) {

		// 	objectReceiveShadow.setValue( object.receiveShadow );

		// }

		// if ( object.shadow !== undefined ) {

		// 	objectShadowIntensity.setValue( object.shadow.intensity );
		// 	objectShadowBias.setValue( object.shadow.bias );
		// 	objectShadowNormalBias.setValue( object.shadow.normalBias );
		// 	objectShadowRadius.setValue( object.shadow.radius );

		// }

		// objectVisible.setValue( object.visible );
		// objectFrustumCulled.setValue( object.frustumCulled );
		// objectRenderOrder.setValue( object.renderOrder );

		// try {

		// 	objectUserData.setValue( JSON.stringify( object.userData, null, '  ' ) );

		// } catch ( error ) {

		// 	console.log( error );

		// }

		// objectUserData.setBorderColor( 'transparent' );
		// objectUserData.setBackgroundColor( '' );

		updateTransformRows( object );

	}
	container.setContentHidden = function ( hidden ) {
        	content.setHidden( hidden );
    	};
return container;

}

export { SidebarEffects };
