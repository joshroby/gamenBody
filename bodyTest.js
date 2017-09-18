var model = {

	gameTitle: 'Gamen Body Test',
	gameSavePrefix: 'bodyTest',

	gameDivContents: function() {
		var svgDiv = document.createElement('div');
		svgDiv.id = 'svgDiv';
		
		model.body = new GamenBody();
		var svg = model.body.draw(500,750);
		svgDiv.appendChild(svg);
		
		var controlsDiv = document.createElement('div');
		controlsDiv.id = 'controlsDiv';
		
		var ticklist = document.createElement('datalist');
		controlsDiv.appendChild(ticklist);
		ticklist.id = 'ticklist';
		for (var i of [-5,0,5]) {
			var option = document.createElement('option');
			option.innerHTML = i;
			ticklist.appendChild(option);
		};
		
		var poseDiv = document.createElement('div');
		controlsDiv.appendChild(poseDiv);
		for (var i in model.body.pose) {
			var sliderLabel = document.createElement('p');
			sliderLabel.innerHTML = i;
			poseDiv.appendChild(sliderLabel);
			var slider = document.createElement('input');
			slider.id = i + "Slider";
			slider.setAttribute('list','ticklist');
			slider.setAttribute('type','range');
			slider.setAttribute('min',Math.PI*-1);
			slider.setAttribute('max',Math.PI);
			slider.setAttribute('step',Math.PI/36);
			slider.setAttribute('value',model.body.pose[i]);
			slider.setAttribute('oninput','handlers.updatePose("'+i+'")');
			slider.setAttribute('onchange','handlers.updatePose("'+i+'")');
			sliderLabel.prepend(slider);
		};
		
		var bioDiv = document.createElement('div');
		controlsDiv.appendChild(bioDiv);
		for (var i in model.body.biometrics) {
			var sliderLabel = document.createElement('p');
			sliderLabel.innerHTML = i;
			bioDiv.appendChild(sliderLabel);
			var slider = document.createElement('input');
			slider.id = i + "Slider";
			slider.setAttribute('list','ticklist');
			slider.setAttribute('type','range');
			slider.setAttribute('min',-10);
			slider.setAttribute('max',10);
			slider.setAttribute('step',0.01);
			slider.setAttribute('value',model.body.biometrics[i]);
			slider.setAttribute('oninput','handlers.updateBio("'+i+'")');
			slider.setAttribute('onchange','handlers.updateBio("'+i+'")');
			sliderLabel.prepend(slider);
		};
				
		return [svgDiv, controlsDiv];
	},

};

var handlers = {

	draw: function() {
		var svg = model.body.draw(500,750);
		document.getElementById('svgDiv').innerHTML = '';
		document.getElementById('svgDiv').appendChild(svg);
	},
	
	updatePose: function(poseKey) {
		model.body.pose[poseKey] = document.getElementById(poseKey + "Slider").value;
		handlers.draw();
	},
	
	updateBio: function(bioKey) {
		model.body.biometrics[bioKey] = document.getElementById(bioKey + "Slider").value;
		handlers.draw();
	},

};

function GamenBody() {

	this.parameters = {

		areolaeWidth: {
			root: 1.09,
			coefficient: 170,
			curve: 'bell',
		},
	
		armLength: {
			root: 1.04,
			coefficient: 170,
			curve: 'bell',
		},
	
		armWidth: {
			root: 1.04,
			coefficient: 170,
			curve: 'bell',
		},
	
		belly: {
			root: 1.15,
			coefficient: 170,
			curve: 'bell',
		},
	
		biceps: {
			root: 1.05,
			coefficient: 170,
			curve: 'bell',
		},
	
		breastSize: {
			root: 1.15,
			coefficient: 170,
			curve: 'bell',
		},
	
		breastSag: {
			root: 1.09,
			coefficient: 170,
			curve: 'bell',
		},
		
		calfWidth: {
			root: 1.07,
			coefficient: 170,
			curve: 'bell',
		},
		
		footLength: {
			root: 1.05,
			coefficient: 170,
			curve: 'bell',
		},
	
		headHeight: {
			root: 1.03,
			coefficient: 170,
			curve: 'bell',
		},
	
		headWidth: {
			root: 1.05,
			coefficient: 170,
			curve: 'bell',
		},
	
		totalHeight: {
			root: 1.05,
			coefficient: 170,
			curve: 'bell',
		},
	
		hipsWidth: {
			root: 1.04,
			coefficient: 170,
			curve: 'bell',
		},
	
		legHeight: {
			root: 1.05,
			coefficient: 170,
			curve: 'bell',
		},
	
		neckHeight: {
			root: 1.05,
			coefficient: 170,
			curve: 'bell',
		},
	
		neckWidth: {
			root: 1.025,
			coefficient: 170,
			curve: 'bell',
		},
		
		nippleLength: {
			root: 1.08,
			coefficient: 170,
			curve: 'bell',
		},
		
		nippleWidth: {
			root: 1.08,
			coefficient: 170,
			curve: 'bell',
		},
		
		nipplePuff: {
			root: 1.08,
			coefficient: 170,
			curve: 'bell',
		},
	
		shouldersWidth: {
			root: 1.04,
			coefficient: 170,
			curve: 'bell',
		},
		
		thighWidth: {
			root: 1.07,
			coefficient: 170,
			curve: 'bell',
		},
	
		torsoHeight: {
			root: 1.05,
			coefficient: 170,
			curve: 'bell',
		},
	};


	this.biometrics = {};
	for (var i in this.parameters) {
		this.biometrics[i] = Math.random() * 5;
		if (Math.random() > 0.5) {this.biometrics[i] *= -1;};
	};
	
	this.pose = {};
	for (i of ["farFootPoint", "farForearmLift", "farKneeBend", "farThighLift", "farUpperArmLift", "headNod", "headSlide", "headTip", "hipsCant", "nearFootPoint", "nearForearmLift", "nearKneeBend", "nearThighLift", "nearUpperArmLift", "shouldersTip"]) {
		this.pose[i] = Math.random() * Math.random() * Math.random() * Math.PI;
		if (Math.random() > 0.5) {this.pose[i] *= -1;};
		if (i == 'shouldersTip' || i == 'hipsCant' || i == 'headTip') {this.pose[i] /= 4;};
	};

	this.skinTone = ['#FAE7D0','#DFC183','#AA724B','#C8ACA3','#E8CDA8','#7B4B2A'][Math.random() * 6 << 0];
	this.areolaeTone = ['#FAE7D0','#DFC183','#AA724B','#C8ACA3','#E8CDA8','#7B4B2A'][Math.random() * 6 << 0];
	
	this.bio = function(key) {
		var result = this.biometrics[key];
		if (result == undefined) {
			result = 1;
		} else {
			result = Math.pow(this.parameters[key].root,result);
		};
		return result;
	};
	
	
	this.draw = function(width,height,pose) {
		if (height == undefined) {height = 100;};
		if (width == undefined) {width = 100;};
		if (pose == undefined) {pose = this.pose};
		
		var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
		
		var minX = width/-2;
		var minY = height * -0.8
		var viewBoxString = minX + ' ' + minY + ' ' + width + ' ' + height;
		svg.setAttribute('viewBox',viewBoxString);
		
		var defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
		svg.appendChild(defs);
		
		var shadow = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
		svg.appendChild(shadow);
		shadow.setAttribute('x',0);
		shadow.setAttribute('y',0);
		shadow.setAttribute('rx',100);
		shadow.setAttribute('ry',20);
		shadow.setAttribute('fill','lightgrey');
		
		// Height Proportions
		var headHeightProportion = this.bio('headHeight')*0.2;
		var neckHeightProportion = this.bio('neckHeight')*0.05;
		var torsoHeightProportion = this.bio('torsoHeight')*0.3;
		var legHeightProportion = this.bio('legHeight')*0.55;
		var heightTotal = headHeightProportion + torsoHeightProportion + legHeightProportion;
		headHeightProportion = headHeightProportion/heightTotal;
		torsoHeightProportion = torsoHeightProportion/heightTotal;
		legHeightProportion = legHeightProportion/heightTotal;

		// Measures
		var totalHeight = height * 0.6;
		var headHeight = totalHeight * headHeightProportion;
		var neckHeight = totalHeight * neckHeightProportion;
		var torsoHeight = totalHeight * torsoHeightProportion;
		var legHeight = totalHeight * legHeightProportion;
		var headWidth = 0.8 * headHeight * this.bio('headWidth');
		var shouldersWidth = 0.22 * totalHeight * this.bio('shouldersWidth');
		var hipsWidth = 0.15 * totalHeight * this.bio('hipsWidth');
		var armLength = 0.4 * totalHeight * this.bio('armLength');
		var upperArmLength = 0.5 * armLength;
		var forearmLength = 0.5 * armLength;
		var thighLength = 0.5 * legHeight;
		var calfLength = 0.5 * legHeight;
		var footLength = 0.14 * totalHeight;
		var nearLegHeight = Math.sin(pose.hipsCant) * hipsWidth/2 + Math.max(0,Math.cos(pose.nearThighLift) * thighLength) + Math.max(0,Math.cos(pose.nearKneeBend) * calfLength);
		var farLegHeight = Math.sin(pose.hipsCant) * hipsWidth/-2 + Math.max(0,Math.cos(pose.farThighLift) * thighLength) + Math.max(0,Math.cos(pose.farKneeBend) * calfLength);
		var pelvisHeight = Math.max(nearLegHeight,farLegHeight) * -1;
		var shouldersHeight = pelvisHeight - torsoHeight;
		var headCenter = {x:0,y:shouldersHeight - neckHeight - headHeight/2};
		
		// Colors
		var skinTone = this.skinTone;
		var areolaeTone = this.areolaeTone;

		// Joints and Points
		var nearHip = {
			x:Math.cos(pose.hipsCant)*hipsWidth/-2,
			y:pelvisHeight + Math.sin(pose.hipsCant)*hipsWidth/2,
		};
		var nearKnee = {
			x: nearHip.x + Math.sin(pose.nearThighLift)*thighLength,
			y: nearHip.y + Math.cos(pose.nearThighLift)*thighLength,
		};
		var nearAnkle = {
			x: nearKnee.x + Math.sin(pose.nearKneeBend)*calfLength,
			y: nearKnee.y + Math.cos(pose.nearKneeBend)*calfLength,
		};
		var farHip = {
			x:Math.cos(pose.hipsCant)*hipsWidth/2,
			y:pelvisHeight - Math.sin(pose.hipsCant)*hipsWidth/2,
		};
		var farKnee = {
			x: farHip.x + Math.sin(pose.farThighLift)*thighLength,
			y: farHip.y + Math.cos(pose.farThighLift)*thighLength,
		};
		var farAnkle = {
			x: farKnee.x + Math.sin(pose.farKneeBend)*calfLength,
			y: farKnee.y + Math.cos(pose.farKneeBend)*calfLength,
		};
		var neckBase = {x:0,y:pelvisHeight - torsoHeight};
		var spineBase = {x:0,y:pelvisHeight};
		var neckBase = {
			x:0,
			y:pelvisHeight - torsoHeight
		};
		var nearShoulder = {
			x:Math.cos(pose.shouldersTip)*shouldersWidth/-2,
			y:shouldersHeight + Math.sin(pose.shouldersTip)*shouldersWidth/2,
		};
		var nearElbow = {
			x: nearShoulder.x + Math.sin(pose.nearUpperArmLift)*upperArmLength,
			y: nearShoulder.y + Math.cos(pose.nearUpperArmLift)*upperArmLength,
		};
		var nearWrist = {
			x: nearElbow.x + Math.sin(pose.nearForearmLift)*forearmLength,
			y: nearElbow.y + Math.cos(pose.nearForearmLift)*forearmLength,
		};
		var farShoulder = {
			x:Math.cos(pose.shouldersTip)*shouldersWidth/2,
			y:shouldersHeight - Math.sin(pose.shouldersTip)*shouldersWidth/2,
		};
		var farElbow = {
			x: farShoulder.x + Math.sin(pose.farUpperArmLift)*upperArmLength,
			y: farShoulder.y + Math.cos(pose.farUpperArmLift)*upperArmLength,
		};
		var farWrist = {
			x: farElbow.x + Math.sin(pose.farForearmLift)*forearmLength,
			y: farElbow.y + Math.cos(pose.farForearmLift)*forearmLength,
		};
		var upperBodyAngle ;
		if (pose.farUpperArmLift >= 0 && pose.nearUpperArmLift >= 0) {
			upperBodyAngle = true;
		} else if (pose.farUpperArmLift <= 0 && pose.nearUpperArmLift <= 0) {
			upperBodyAngle = false;
		} else if (pose.farUpperArmLift >= 0 && pose.nearUpperArmLift <= 0 && Math.abs(pose.farUpperArmLift) > Math.abs(pose.nearUpperArmLift) ) {
			upperBodyAngle = true;
		} else {
			upperBodyAngle = false;
		};
		var lowerBodyAngle ;
		if (pose.farThighLift > 0 && pose.nearThighLift > 0) {
			lowerBodyAngle = true;
		} else if (pose.farThighLift < 0 && pose.nearThighLift < 0) {
			lowerBodyAngle = false;
		} else if (pose.farThighLift > 0 && pose.nearThighLift < 0 && Math.abs(pose.farThighLift) > Math.abs(pose.nearThighLift) ) {
			lowerBodyAngle = true;
		} else {
			lowerBodyAngle = false;
		};
		var breastSize = this.bio('breastSize') * 20;
		var farBreastAnchor = {
			x:farShoulder.x/2,
			y:neckBase.y + torsoHeight/8,
		};
		var farBreastCenter = {
			x:farShoulder.x/2,
			y:farBreastAnchor.y + Math.max(breastSize,torsoHeight/3 * this.bio('breastSag')),
		};
		var nearBreastAnchor = {
			x:nearShoulder.x/2,
			y:neckBase.y + torsoHeight/8,
		};
		var nearBreastCenter = {
			x:nearShoulder.x/2,
			y:nearBreastAnchor.y + Math.max(breastSize,torsoHeight/3 * this.bio('breastSag')),
		};
		if (upperBodyAngle) {
			farBreastCenter.x += breastSize/2;
			nearBreastCenter.x += breastSize/2;
		} else {
			farBreastCenter.x -= breastSize/2;
			nearBreastCenter.x -= breastSize/2;
		};
		if (upperBodyAngle) {
			areolaeOffset = breastSize * 0.5;
		} else {
			areolaeOffset = breastSize * -0.5;
		};
		var farAreolae = {
			x: farBreastCenter.x + areolaeOffset,
			y: Math.min(farBreastCenter.y - breastSize/2 + this.bio('breastSag')/2.4 * breastSize * 1.5,farBreastCenter.y + breastSize),
		};
		var nearAreolae = {
			x: nearBreastCenter.x + areolaeOffset,
			y: Math.min(nearBreastCenter.y - breastSize/2 + this.bio('breastSag')/2.4 * breastSize * 1.5,nearBreastCenter.y + breastSize),
		};
		var nippleWidth = this.bio('nippleWidth') * 10;
		var nippleLength = this.bio('nippleLength') * 17;
		if (!upperBodyAngle) {
			nippleLength *= -1;
		};
		var farNippleTop = {
			x: farAreolae.x,
			y: farAreolae.y - nippleWidth/2,
		};
		var nearNippleTop = {
			x: nearAreolae.x,
			y: nearAreolae.y - nippleWidth/2,
		};
		console.log(this.bio('breastSag'));
		
//		Wireframe (Old)
// 		var wireframe = document.createElementNS('http://www.w3.org/2000/svg','g');
// 		svg.appendChild(wireframe);
// 		var legs = document.createElementNS('http://www.w3.org/2000/svg','polyline');
// 		wireframe.appendChild(legs);
// 		var pointsArray = [
// 			nearAnkle,
// 			nearKnee,
// 			nearHip,
// 			farHip,
// 			farKnee,
// 			farAnkle,
// 		];
// 		var pointsString = '';
// 		for (var p of pointsArray) {
// 			pointsString += p.x + "," + p.y + " ";
// 		};
// 		legs.setAttribute('points',pointsString);
// 		legs.setAttribute('stroke','black');
// 		legs.setAttribute('fill','none');
// 		
// 		var spine = document.createElementNS('http://www.w3.org/2000/svg','line');
// 		wireframe.appendChild(spine);
// 		spine.setAttribute('x1',neckBase.x);
// 		spine.setAttribute('y1',neckBase.y);
// 		spine.setAttribute('x2',spineBase.x);
// 		spine.setAttribute('y2',spineBase.y);
// 		spine.setAttribute('points',pointsString);
// 		spine.setAttribute('stroke','black');
// 		spine.setAttribute('fill','none');
// 
// 		var arms = document.createElementNS('http://www.w3.org/2000/svg','polyline');
// 		wireframe.appendChild(arms);
// 		var pointsArray = [
// 			nearWrist,
// 			nearElbow,
// 			nearShoulder,
// 			neckBase,
// 			farShoulder,
// 			farElbow,
// 			farWrist,
// 		];
// 		var pointsString = '';
// 		for (var p of pointsArray) {
// 			pointsString += p.x + "," + p.y + " ";
// 		};
// 		arms.setAttribute('points',pointsString);
// 		arms.setAttribute('stroke','black');
// 		arms.setAttribute('fill','none');
		
// 		var head = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
// 		wireframe.appendChild(head);
// 		head.setAttribute('cx',0);
// 		head.setAttribute('cy',shouldersHeight - neckHeight - headHeight/2);
// 		head.setAttribute('rx',headWidth/2);
// 		head.setAttribute('ry',headHeight/2);
// 		head.setAttribute('fill','none');
// 		head.setAttribute('stroke','black');
		
		// Shapes
		var farCalf = document.createElementNS('http://www.w3.org/2000/svg','g');
		farCalf.id = 'farCalf';
		farCalf.setAttribute('fill',skinTone);
		farCalf.setAttribute('stroke','inherit');
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farCalf.appendChild(rect);
		rect.setAttribute('x',(farKnee.x+farKnee.x+farAnkle.x)/3-this.bio('calfWidth') * 20);
		rect.setAttribute('y',(farKnee.y+farKnee.y+farAnkle.y)/3-calfLength/3);
		rect.setAttribute('height',0.66 * calfLength);
		rect.setAttribute('width',this.bio('calfWidth') * 40);
		rect.setAttribute('rx',this.bio('calfWidth') * 20);
		rect.setAttribute('ry',calfLength/2);
		tilt = this.pose.farKneeBend * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(farKnee.x+farKnee.x+farAnkle.x)/3+' '+(farKnee.y+farKnee.y+farAnkle.y)/3+')');
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farCalf.appendChild(rect);
		rect.setAttribute('x',(farKnee.x+farAnkle.x)/2-this.bio('calfWidth') * 10);
		rect.setAttribute('y',(farKnee.y+farAnkle.y)/2-calfLength/2);
		rect.setAttribute('height',calfLength);
		rect.setAttribute('width',this.bio('calfWidth') * 20);
		rect.setAttribute('rx',this.bio('calfWidth') * 5);
		rect.setAttribute('ry',calfLength);
		tilt = this.pose.farKneeBend * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(farKnee.x+farAnkle.x)/2+' '+(farKnee.y+farAnkle.y)/2+')');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farCalf.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',farAnkle.x);
		circle.setAttribute('cy',farAnkle.y);
		circle.setAttribute('r',10);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farCalf.appendChild(circle);
		circle.setAttribute('cx',farKnee.x);
		circle.setAttribute('cy',farKnee.y);
		circle.setAttribute('r',this.bio('thighWidth') * 15);
		
		var nearCalf = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearCalf.id = 'nearCalf';
		nearCalf.setAttribute('fill',skinTone);
		nearCalf.setAttribute('stroke','inherit');
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearCalf.appendChild(rect);
		rect.setAttribute('x',(nearKnee.x+nearKnee.x+nearAnkle.x)/3-this.bio('calfWidth') * 20);
		rect.setAttribute('y',(nearKnee.y+nearKnee.y+nearAnkle.y)/3-calfLength/3);
		rect.setAttribute('height',0.66 * calfLength);
		rect.setAttribute('width',this.bio('calfWidth') * 40);
		rect.setAttribute('rx',this.bio('calfWidth') * 20);
		rect.setAttribute('ry',calfLength/2);
		tilt = this.pose.nearKneeBend * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(nearKnee.x+nearKnee.x+nearAnkle.x)/3+' '+(nearKnee.y+nearKnee.y+nearAnkle.y)/3+')');
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearCalf.appendChild(rect);
		rect.setAttribute('x',(nearKnee.x+nearAnkle.x)/2-this.bio('calfWidth') * 10);
		rect.setAttribute('y',(nearKnee.y+nearAnkle.y)/2-calfLength/2);
		rect.setAttribute('height',calfLength);
		rect.setAttribute('width',this.bio('calfWidth') * 20);
		rect.setAttribute('rx',this.bio('calfWidth') * 5);
		rect.setAttribute('ry',calfLength);
		tilt = this.pose.nearKneeBend * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(nearKnee.x+nearAnkle.x)/2+' '+(nearKnee.y+nearAnkle.y)/2+')');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearCalf.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',nearAnkle.x);
		circle.setAttribute('cy',nearAnkle.y);
		circle.setAttribute('r',10);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearCalf.appendChild(circle);
		circle.setAttribute('cx',nearKnee.x);
		circle.setAttribute('cy',nearKnee.y);
		circle.setAttribute('r',this.bio('thighWidth') * 15);
		
		var farThigh = document.createElementNS('http://www.w3.org/2000/svg','g');
		farThigh.id = 'farThigh';
		farThigh.setAttribute('fill',skinTone);
		farThigh.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farThigh.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',(3*farHip.x+spineBase.x)/4);
		circle.setAttribute('cy',(3*farHip.y+spineBase.y)/4);
		circle.setAttribute('r',this.bio('hipsWidth') * 30);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farThigh.appendChild(rect);
		rect.setAttribute('x',(farHip.x+farKnee.x)/2-this.bio('thighWidth') * 25);
		rect.setAttribute('y',(farHip.y+farKnee.y)/2-thighLength/2);
		rect.setAttribute('height',thighLength);
		rect.setAttribute('width',this.bio('thighWidth') * 50);
		rect.setAttribute('rx',this.bio('thighWidth') * 12.5);
		rect.setAttribute('ry',thighLength/2);
		tilt = this.pose.farThighLift * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(farHip.x+farKnee.x)/2+' '+(farHip.y+farKnee.y)/2+')');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farThigh.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',farKnee.x);
		circle.setAttribute('cy',farKnee.y);
		circle.setAttribute('r',this.bio('thighWidth') * 15);
		
		var nearThigh = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearThigh.id = 'nearThigh';
		nearThigh.setAttribute('fill',skinTone);
		nearThigh.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearThigh.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',(3*nearHip.x+spineBase.x)/4);
		circle.setAttribute('cy',(3*nearHip.y+spineBase.y)/4);
		circle.setAttribute('r',this.bio('hipsWidth') * 30);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearThigh.appendChild(rect);
		rect.setAttribute('x',(nearHip.x+nearKnee.x)/2-this.bio('thighWidth') * 25);
		rect.setAttribute('y',(nearHip.y+nearKnee.y)/2-thighLength/2);
		rect.setAttribute('height',thighLength);
		rect.setAttribute('width',this.bio('thighWidth') * 50);
		rect.setAttribute('rx',this.bio('thighWidth') * 12.5);
		rect.setAttribute('ry',thighLength/2);
		tilt = this.pose.nearThighLift * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(nearHip.x+nearKnee.x)/2+' '+(nearHip.y+nearKnee.y)/2+')');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearThigh.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',nearKnee.x);
		circle.setAttribute('cy',nearKnee.y);
		circle.setAttribute('r',this.bio('thighWidth') * 15);

		var butt = document.createElementNS('http://www.w3.org/2000/svg','g');
		butt.id = 'butt';
		butt.setAttribute('fill',skinTone);
		butt.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		butt.appendChild(circle);
		circle.setAttribute('cx',(3*nearHip.x+spineBase.x)/4);
		circle.setAttribute('cy',(3*nearHip.y+spineBase.y)/4);
		circle.setAttribute('r',this.bio('hipsWidth') * 30);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		butt.appendChild(circle);
		circle.setAttribute('cx',(3*farHip.x+spineBase.x)/4);
		circle.setAttribute('cy',(3*farHip.y+spineBase.y)/4);
		circle.setAttribute('r',this.bio('hipsWidth') * 30);
		
		var farUpperArm = document.createElementNS('http://www.w3.org/2000/svg','g');
		farUpperArm.id = 'farUpperArm';
		farUpperArm.setAttribute('fill',skinTone);
		farUpperArm.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farUpperArm.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',farShoulder.x);
		circle.setAttribute('cy',farShoulder.y);
		circle.setAttribute('r',this.bio('bicep')*20);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farUpperArm.appendChild(rect);
		rect.setAttribute('x',(farShoulder.x+farShoulder.x+farElbow.x)/3-this.bio('armWidth') * 12 + this.bio('biceps')*2*(this.pose.farUpperArmLift-this.pose.farForearmLift));
		rect.setAttribute('y',(farShoulder.y+farShoulder.y+farElbow.y)/3-upperArmLength/3);
		rect.setAttribute('height',0.4 * upperArmLength);
		rect.setAttribute('width',this.bio('biceps') * 15);
		rect.setAttribute('rx',this.bio('biceps') * 20);
		rect.setAttribute('ry',0.3 * upperArmLength);
		tilt = this.pose.farUpperArmLift * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(farShoulder.x+farShoulder.x+farElbow.x)/3+' '+(farShoulder.y+farShoulder.y+farElbow.y)/3+')');
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farUpperArm.appendChild(rect);
		rect.setAttribute('x',(farShoulder.x+farElbow.x+farElbow.x)/3-this.bio('armWidth') * 12 + this.bio('biceps')*-2*(this.pose.farUpperArmLift-this.pose.farForearmLift));
		rect.setAttribute('y',(farShoulder.y+farElbow.y+farElbow.y)/3-upperArmLength/3);
		rect.setAttribute('height',0.6 * upperArmLength);
		rect.setAttribute('width',this.bio('biceps') * 15);
		rect.setAttribute('rx',this.bio('biceps') * 20);
		rect.setAttribute('ry',0.2 * upperArmLength);
		tilt = this.pose.farUpperArmLift * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(farShoulder.x+farElbow.x+farElbow.x)/3+' '+(farShoulder.y+farElbow.y+farElbow.y)/3+')');
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farUpperArm.appendChild(rect);
		rect.setAttribute('x',(farShoulder.x+farElbow.x)/2-this.bio('armWidth') * 15);
		rect.setAttribute('y',(farShoulder.y+farElbow.y)/2-upperArmLength/2);
		rect.setAttribute('height',upperArmLength);
		rect.setAttribute('width',this.bio('armWidth') * 30);
		rect.setAttribute('rx',this.bio('armWidth') * 15);
		rect.setAttribute('ry',upperArmLength);
		tilt = this.pose.farUpperArmLift * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(farShoulder.x+farElbow.x)/2+' '+(farShoulder.y+farElbow.y)/2+')');

		var nearUpperArm = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearUpperArm.id = 'nearUpperArm';
		nearUpperArm.setAttribute('fill',skinTone);
		nearUpperArm.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearUpperArm.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',nearShoulder.x);
		circle.setAttribute('cy',nearShoulder.y);
		circle.setAttribute('r',this.bio('bicep')*20);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearUpperArm.appendChild(rect);
		rect.setAttribute('x',(nearShoulder.x+nearShoulder.x+nearElbow.x)/3-this.bio('armWidth') * 10 + this.bio('biceps')*2*(this.pose.nearUpperArmLift-this.pose.nearForearmLift));
		rect.setAttribute('y',(nearShoulder.y+nearShoulder.y+nearElbow.y)/3-upperArmLength/3);
		rect.setAttribute('height',0.4 * upperArmLength);
		rect.setAttribute('width',this.bio('biceps') * 15);
		rect.setAttribute('rx',this.bio('biceps') * 20);
		rect.setAttribute('ry',0.3 * upperArmLength);
		tilt = this.pose.nearUpperArmLift * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(nearShoulder.x+nearShoulder.x+nearElbow.x)/3+' '+(nearShoulder.y+nearShoulder.y+nearElbow.y)/3+')');
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearUpperArm.appendChild(rect);
		rect.setAttribute('x',(nearShoulder.x+nearElbow.x+nearElbow.x)/3-this.bio('armWidth') * 10 + this.bio('biceps')*-2*(this.pose.nearUpperArmLift-this.pose.nearForearmLift));
		rect.setAttribute('y',(nearShoulder.y+nearElbow.y+nearElbow.y)/3-upperArmLength/3);
		rect.setAttribute('height',0.6 * upperArmLength);
		rect.setAttribute('width',this.bio('biceps') * 15);
		rect.setAttribute('rx',this.bio('biceps') * 20);
		rect.setAttribute('ry',0.2 * upperArmLength);
		tilt = this.pose.nearUpperArmLift * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(nearShoulder.x+nearElbow.x+nearElbow.x)/3+' '+(nearShoulder.y+nearElbow.y+nearElbow.y)/3+')');
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearUpperArm.appendChild(rect);
		rect.setAttribute('x',(nearShoulder.x+nearElbow.x)/2-this.bio('armWidth') * 15);
		rect.setAttribute('y',(nearShoulder.y+nearElbow.y)/2-upperArmLength/2);
		rect.setAttribute('height',upperArmLength);
		rect.setAttribute('width',this.bio('armWidth') * 30);
		rect.setAttribute('rx',this.bio('armWidth') * 15);
		rect.setAttribute('ry',upperArmLength);
		tilt = this.pose.nearUpperArmLift * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(nearShoulder.x+nearElbow.x)/2+' '+(nearShoulder.y+nearElbow.y)/2+')');
		
		var farLowerArm = document.createElementNS('http://www.w3.org/2000/svg','g');
		farLowerArm.id = 'farLowerArm';
		farLowerArm.setAttribute('fill',skinTone);
		farLowerArm.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farLowerArm.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',farElbow.x);
		circle.setAttribute('cy',farElbow.y);
		circle.setAttribute('r',7);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farLowerArm.appendChild(rect);
		rect.setAttribute('x',(farElbow.x+farWrist.x)/2-this.bio('armWidth') * 15);
		rect.setAttribute('y',(farElbow.y+farWrist.y)/2-forearmLength/2);
		rect.setAttribute('height',forearmLength);
		rect.setAttribute('width',this.bio('armWidth') * 30);
		rect.setAttribute('rx',this.bio('armWidth') * 15);
		rect.setAttribute('ry',forearmLength/2);
		tilt = this.pose.farForearmLift * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(farElbow.x+farWrist.x)/2+' '+(farElbow.y+farWrist.y)/2+')');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farLowerArm.appendChild(circle);
// 		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',farWrist.x);
		circle.setAttribute('cy',farWrist.y);
		circle.setAttribute('r',10);

		var nearLowerArm = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearLowerArm.id = 'nearLowerArm';
		nearLowerArm.setAttribute('fill',skinTone);
		nearLowerArm.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearLowerArm.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',nearElbow.x);
		circle.setAttribute('cy',nearElbow.y);
		circle.setAttribute('r',7);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearLowerArm.appendChild(rect);
		rect.setAttribute('x',(nearElbow.x+nearWrist.x)/2-this.bio('armWidth') * 15);
		rect.setAttribute('y',(nearElbow.y+nearWrist.y)/2-forearmLength/2);
		rect.setAttribute('height',forearmLength);
		rect.setAttribute('width',this.bio('armWidth') * 30);
		rect.setAttribute('rx',this.bio('armWidth') * 15);
		rect.setAttribute('ry',forearmLength/2);
		tilt = this.pose.nearForearmLift * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(nearElbow.x+nearWrist.x)/2+' '+(nearElbow.y+nearWrist.y)/2+')');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearLowerArm.appendChild(circle);
// 		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',nearWrist.x);
		circle.setAttribute('cy',nearWrist.y);
		circle.setAttribute('r',10);

		var farElbowJoint = document.createElementNS('http://www.w3.org/2000/svg','use');
		farElbowJoint.id = 'farElbowJoint';
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farElbowJoint.appendChild(circle);
		circle.setAttribute('cx',farElbow.x);
		circle.setAttribute('cy',farElbow.y);
		circle.setAttribute('r',7);
				
		var nearElbowJoint = document.createElementNS('http://www.w3.org/2000/svg','use');
		nearElbowJoint.id = 'nearElbowJoint';
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearElbowJoint.appendChild(circle);
		circle.setAttribute('cx',nearElbow.x);
		circle.setAttribute('cy',nearElbow.y);
		circle.setAttribute('r',7);
		
		var torso = document.createElementNS('http://www.w3.org/2000/svg','g');
		torso.id = 'torso';
		torso.setAttribute('fill',skinTone);
		torso.setAttribute('stroke','inherit');
		var polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');
		torso.appendChild(polygon);
		polygon.setAttribute('stroke','none');
		var pointsArray = [
			{x:nearHip.x,y:nearHip.y - this.bio('hipsWidth') * 30},
			nearShoulder,
			{x:(neckBase.x + headCenter.x)/2,y:(neckBase.y + headCenter.y)/2},
			farShoulder,
			{x:farHip.x,y:farHip.y - this.bio('hipsWidth') * 30},
			{x:0,y:pelvisHeight}
		];
		var pointsString = '';
		for (var i of pointsArray) {
			pointsString += i.x + ',' + i.y + ' ';
		};
		polygon.setAttribute('points',pointsString);
		var rightSide = document.createElementNS('http://www.w3.org/2000/svg','line');
		torso.appendChild(rightSide);
		rightSide.setAttribute('x1',nearHip.x);
		rightSide.setAttribute('y1',nearHip.y - this.bio('hipsWidth') * 30);
		rightSide.setAttribute('x2',nearShoulder.x);
		rightSide.setAttribute('y2',nearShoulder.y);
		var leftSide = document.createElementNS('http://www.w3.org/2000/svg','line');
		torso.appendChild(leftSide);
		leftSide.setAttribute('x1',farHip.x);
		leftSide.setAttribute('y1',farHip.y - this.bio('hipsWidth') * 30);
		leftSide.setAttribute('x2',farShoulder.x);
		leftSide.setAttribute('y2',farShoulder.y);
		var pelvis = document.createElementNS('http://www.w3.org/2000/svg','path');
		torso.appendChild(pelvis);
		var startX = hipsWidth * 0.4;
		var startY = pelvisHeight - hipsWidth * 0.25;
		var d = 'M'+startX+','+startY;
		var dc1x = -0.1 * hipsWidth;
		var dc1y = 0.2 * hipsWidth;
		var dc2x = -0.2 * hipsWidth;
		var dc2y = 0.4 * hipsWidth;
		var dx = -0.4 * hipsWidth;
		var dy = 0.4 * hipsWidth;
		d += 'c' + dc1x + ',' + dc1y + ' ' + dc2x + ',' + dc2y + ' ' + dx + ',' + dy;
		dc1x = -0.25 * hipsWidth;
		dc1y = 0;
		dc2x = -0.3 * hipsWidth;
		dc2y = -0.2 * hipsWidth;
		dx = -0.4 * hipsWidth;
		dy = -0.4 * hipsWidth;
		d += 'c' + dc1x + ',' + dc1y + ' ' + dc2x + ',' + dc2y + ' ' + dx + ',' + dy;
		pelvis.setAttribute('d',d);
		tilt = this.pose.hipsCant * -180/Math.PI;
		pelvis.setAttribute('transform','rotate('+tilt+' 0 '+pelvisHeight+')');
		var trunk = document.createElementNS('http://www.w3.org/2000/svg','path');
		torso.appendChild(trunk);
		
		var shoulders = document.createElementNS('http://www.w3.org/2000/svg','g');
		shoulders.id = 'shoulders';
		shoulders.setAttribute('fill',skinTone);
		shoulders.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		shoulders.appendChild(circle);
		circle.setAttribute('cx',farShoulder.x);
		circle.setAttribute('cy',farShoulder.y);
		circle.setAttribute('r',this.bio('bicep')*20);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		shoulders.appendChild(circle);
		circle.setAttribute('cx',nearShoulder.x);
		circle.setAttribute('cy',nearShoulder.y);
		circle.setAttribute('r',this.bio('bicep')*20);
		var polyline = document.createElementNS('http://www.w3.org/2000/svg','polyline');
		shoulders.appendChild(polyline);
		var pointsArray = [
			{x:nearShoulder.x,y:nearShoulder.y-this.bio('bicep') * 10},
			{x:(2*neckBase.x + headCenter.x)/3,y:(2*neckBase.y + headCenter.y)/3},
			{x:farShoulder.x,y:farShoulder.y-this.bio('bicep') * 10},
		];
		var pointsString = '';
		for (var i of pointsArray) {
			pointsString += i.x + ',' + i.y + ' ';
		};
		polyline.setAttribute('points',pointsString);

		var farFoot = document.createElementNS('http://www.w3.org/2000/svg','g');
		farFoot.id = 'farFoot';
		farFoot.setAttribute('fill',skinTone);
		farFoot.setAttribute('stroke','inherit');
		var heel = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farFoot.appendChild(heel);
		heel.setAttribute('x',farAnkle.x-15);
		heel.setAttribute('y',farAnkle.y-15);
		heel.setAttribute('height',30);
		heel.setAttribute('width',30);
		heel.setAttribute('rx',30);
		heel.setAttribute('ry',30);
		var toes = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farFoot.appendChild(toes);
		toes.setAttribute('stroke','black');
		toes.setAttribute('paint-order','stroke fill');
		toes.setAttribute('stroke-width','10');
		toes.setAttribute('x',farAnkle.x-15);
		toes.setAttribute('y',farAnkle.y+5);
		toes.setAttribute('height',15);
		toes.setAttribute('width',40);
		toes.setAttribute('rx',6);
		toes.setAttribute('ry',6);
		if (farAnkle.y < -1) {
			tilt = pose.farKneeBend * -180/Math.PI;
			farFoot.setAttribute('transform','rotate('+tilt+' '+farAnkle.x+' '+farAnkle.y+')');
			if (pose.farFootPoint > 0) {
				toes.setAttribute('height',15 * (1 + pose.farFootPoint/2));
			};
		};
				
		var nearFoot = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearFoot.id = 'nearFoot';
		nearFoot.setAttribute('fill',skinTone);
		nearFoot.setAttribute('stroke','inherit');
		var heel = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearFoot.appendChild(heel);
		heel.setAttribute('x',nearAnkle.x-15);
		heel.setAttribute('y',nearAnkle.y-15);
		heel.setAttribute('height',30);
		heel.setAttribute('width',30);
		heel.setAttribute('rx',30);
		heel.setAttribute('ry',30);
		var toes = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearFoot.appendChild(toes);
		toes.setAttribute('stroke','black');
		toes.setAttribute('paint-order','stroke fill');
		toes.setAttribute('stroke-width','10');
		toes.setAttribute('x',nearAnkle.x-25);
		toes.setAttribute('y',nearAnkle.y+5);
		toes.setAttribute('height',15);
		toes.setAttribute('width',40);
		toes.setAttribute('rx',6);
		toes.setAttribute('ry',6);
		if (nearAnkle.y < -1) {
			tilt = pose.nearKneeBend * -180/Math.PI;
			nearFoot.setAttribute('transform','rotate('+tilt+' '+nearAnkle.x+' '+nearAnkle.y+')');
			if (pose.nearFootPoint > 0) {
				toes.setAttribute('height',15 * (1 + pose.nearFootPoint/2));
			};
		};				
		
		var farBreast = document.createElementNS('http://www.w3.org/2000/svg','g');
		farBreast.id = 'farBreast';
		farBreast.setAttribute('fill',skinTone);
		farBreast.setAttribute('stroke','inherit');
		var shoulderTipDegrees = pose.shouldersTip * -180/Math.PI;
// 		farBreast.setAttribute('transform','rotate('+shoulderTipDegrees+' '+farBreastCenter.x+' '+farBreastCenter.y+')');
// 		var sphere = document.createElementNS('http://www.w3.org/2000/svg','circle');
// 		farBreast.appendChild(sphere);
// 		sphere.setAttribute('stroke','none');
// 		sphere.setAttribute('cx',farBreastCenter.x);
// 		sphere.setAttribute('cy',farBreastCenter.y); 
// 		sphere.setAttribute('r',this.bio('breastSize')*20);
		var nippleBack = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farBreast.appendChild(nippleBack);
		nippleBack.setAttribute('fill',areolaeTone);
		nippleBack.setAttribute('cx',farAreolae.x);
		nippleBack.setAttribute('cy',farAreolae.y);
		nippleBack.setAttribute('r',nippleWidth/2);
		var block = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farBreast.appendChild(block);
		block.setAttribute('stroke','none');
		block.setAttribute('x',farBreastAnchor.x-9);
		block.setAttribute('y',farBreastAnchor.y-5);
		block.setAttribute('width',10);
		block.setAttribute('height',this.bio('breastSag')*30);
		var path = document.createElementNS('http://www.w3.org/2000/svg','path');
		farBreast.appendChild(path);
		var c1x, c1y, x, y, c2x, c2y;
		var d = 'M' + farBreastAnchor.x + " " + farBreastAnchor.y;
		var cathetus = this.bio('breastSize') * 10 * Math.pow(2,0.5);
		var control = 0.5522847 * this.bio('breastSize') * 10 * Math.pow(2,0.5);
		c1x = farBreastAnchor.x;
		c1y = farBreastAnchor.y;
		x = farBreastCenter.x + cathetus;
		y = farBreastCenter.y - cathetus;
		c2x = x - control;
		c2y = y - control;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		c1x = farBreastCenter.x + cathetus + control;
		c1y = farBreastCenter.y - cathetus + control;
		x = farBreastCenter.x + cathetus;
		y = farBreastCenter.y + cathetus;
		c2x = x + control;
		c2y = y - control;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		c1x = farBreastCenter.x + cathetus - control;
		c1y = farBreastCenter.y + cathetus + control;
		x = farBreastCenter.x - cathetus;
		y = farBreastCenter.y + cathetus;
		c2x = x + control;
		c2y = y + control;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		if (!upperBodyAngle) {
			c1x = farBreastCenter.x - cathetus - control;
			c1y = farBreastCenter.y + cathetus - control;
			x = farBreastCenter.x - cathetus;
			y = farBreastCenter.y - cathetus;
			c2x = x - control;
			c2y = y + control;
			d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		};
		path.setAttribute('d',d);
		var farBreastClipPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath');
		farBreastClipPath.id = 'farBreastClipPath';
		defs.appendChild(farBreastClipPath);
		var path = document.createElementNS('http://www.w3.org/2000/svg','path');
		path.setAttribute('d',d);
		farBreastClipPath.appendChild(path);
		var areolae = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farBreast.appendChild(areolae);
		areolae.setAttribute('fill',areolaeTone);
		areolae.setAttribute('stroke','none');
		areolae.setAttribute('cx',farAreolae.x);
		areolae.setAttribute('cy',farAreolae.y);
		areolae.setAttribute('r',this.bio('areolaeWidth') * 10);
		areolae.setAttribute('clip-path','url(#farBreastClipPath)');
		var nipplePuff = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farBreast.appendChild(nipplePuff);
		nipplePuff.setAttribute('fill',areolaeTone);
		nipplePuff.setAttribute('cx',farAreolae.x);
		nipplePuff.setAttribute('cy',farAreolae.y);
		nipplePuff.setAttribute('r',this.bio('nipplePuff') * 10);
		var nipple = document.createElementNS('http://www.w3.org/2000/svg','path');
		farBreast.appendChild(nipple);
		nipple.setAttribute('fill',areolaeTone);
		var d = 'M ' + farNippleTop.x + ',' + farNippleTop.y + ' ';
		d += 'c ' + nippleLength + ',' + 0 + ' ' + nippleLength + ',' + nippleWidth + ' ' + 0 + ',' + nippleWidth ;
		nipple.setAttribute('d',d);
// 		var tilt = this.bio('breastSag') * 60 - 50;
		if (upperBodyAngle) {
			tilt = Math.atan2(farAreolae.y - farBreastCenter.y,farAreolae.x - farBreastCenter.x) * 180 / Math.PI;
		} else {
			tilt = Math.atan2(farBreastCenter.y - farAreolae.y,farBreastCenter.x - farAreolae.x) * 180 / Math.PI;
		};
		nipple.setAttribute('transform','rotate('+tilt+' '+farAreolae.x+' '+farAreolae.y+')');
		
		
		var nearBreast = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearBreast.id = 'nearBreast';
		nearBreast.setAttribute('fill',skinTone);
		nearBreast.setAttribute('stroke','inherit');
// 		nearBreast.setAttribute('transform','rotate('+shoulderTipDegrees+' '+nearBreastCenter.x+' '+nearBreastCenter.y+')');
// 		var sphere = document.createElementNS('http://www.w3.org/2000/svg','circle');
// 		nearBreast.appendChild(sphere);
// 		sphere.setAttribute('stroke','none');
// 		sphere.setAttribute('cx',nearBreastCenter.x);
// 		sphere.setAttribute('cy',nearBreastCenter.y);
// 		sphere.setAttribute('r',this.bio('breastSize')*20);
		var nippleBack = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearBreast.appendChild(nippleBack);
		nippleBack.setAttribute('fill',areolaeTone);
		nippleBack.setAttribute('cx',nearAreolae.x);
		nippleBack.setAttribute('cy',nearAreolae.y);
		nippleBack.setAttribute('r',nippleWidth/2);
		var block = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearBreast.appendChild(block);
		block.setAttribute('stroke','none');
		block.setAttribute('x',nearBreastAnchor.x-1);
		block.setAttribute('y',nearBreastAnchor.y-5);
		block.setAttribute('width',10);
		block.setAttribute('height',this.bio('breastSag')*30);
		var path = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearBreast.appendChild(path);
		var c1x, c1y, x, y, c2x, c2y;
		var d = 'M' + nearBreastAnchor.x + " " + nearBreastAnchor.y;
		var cathetus = this.bio('breastSize') * 10 * Math.pow(2,0.5);
		var control = 0.5522847 * this.bio('breastSize') * 10 * Math.pow(2,0.5);
		c1x = nearBreastAnchor.x;
		c1y = nearBreastAnchor.y;
		x = nearBreastCenter.x - cathetus;
		y = nearBreastCenter.y - cathetus;
		c2x = x + control;
		c2y = y - control;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		c1x = nearBreastCenter.x - cathetus - control;
		c1y = nearBreastCenter.y - cathetus + control;
		x = nearBreastCenter.x - cathetus;
		y = nearBreastCenter.y + cathetus;
		c2x = x - control;
		c2y = y - control;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		c1x = nearBreastCenter.x - cathetus + control;
		c1y = nearBreastCenter.y + cathetus + control;
		x = nearBreastCenter.x + cathetus;
		y = nearBreastCenter.y + cathetus;
		c2x = x - control;
		c2y = y + control;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		if (upperBodyAngle) {
			c1x = nearBreastCenter.x + cathetus + control;
			c1y = nearBreastCenter.y + cathetus - control;
			x = nearBreastCenter.x + cathetus;
			y = nearBreastCenter.y - cathetus;
			c2x = x + control;
			c2y = y + control;
			d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		};
		path.setAttribute('d',d);
		var nearBreastClipPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath');
		nearBreastClipPath.id = 'nearBreastClipPath';
		defs.appendChild(nearBreastClipPath);
		var path = document.createElementNS('http://www.w3.org/2000/svg','path');
		path.setAttribute('d',d);
		nearBreastClipPath.appendChild(path);
		var areolae = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearBreast.appendChild(areolae);
		areolae.setAttribute('fill',areolaeTone);
		areolae.setAttribute('stroke','none');
		areolae.setAttribute('cx',nearAreolae.x);
		areolae.setAttribute('cy',nearAreolae.y);
		areolae.setAttribute('r',this.bio('areolaeWidth') * 10);
		areolae.setAttribute('clip-path','url(#nearBreastClipPath)');
		var nipplePuff = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearBreast.appendChild(nipplePuff);
		nipplePuff.setAttribute('fill',areolaeTone);
		nipplePuff.setAttribute('cx',nearAreolae.x);
		nipplePuff.setAttribute('cy',nearAreolae.y);
		nipplePuff.setAttribute('r',this.bio('nipplePuff') * 10);
		var nipple = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearBreast.appendChild(nipple);
		nipple.setAttribute('fill',areolaeTone);
		var d = 'M ' + nearNippleTop.x + ',' + nearNippleTop.y + ' ';
		d += 'c ' + nippleLength + ',' + 0 + ' ' + nippleLength + ',' + nippleWidth + ' ' + 0 + ',' + nippleWidth ;
		nipple.setAttribute('d',d);
		nipple.setAttribute('transform','rotate('+tilt+' '+nearAreolae.x+' '+nearAreolae.y+')');
		
		var belly = document.createElementNS('http://www.w3.org/2000/svg','g');
		belly.id = 'belly';
		belly.setAttribute('fill',skinTone);
		belly.setAttribute('stroke','inherit');
// 		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
// 		belly.appendChild(circle);
// 		circle.setAttribute('cx',0);
// 		circle.setAttribute('cy',neckBase.y + 3*torsoHeight/4);
// 		circle.setAttribute('r',this.bio('belly')*20);
		
		var scrotum = document.createElementNS('http://www.w3.org/2000/svg','g');
		
		var phallus = document.createElementNS('http://www.w3.org/2000/svg','g');
		
		var headGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		headGroup.id = 'headGroup';
		headGroup.setAttribute('fill',skinTone);
		headGroup.setAttribute('stroke','inherit');
		var head = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
		headGroup.appendChild(head);
		head.setAttribute('cx',headCenter.x);
		head.setAttribute('cy',headCenter.y);
		head.setAttribute('rx',headWidth/2);
		head.setAttribute('ry',headHeight/2);
		var headTilt = pose.headTip * 180/Math.PI;
		var headSlide = pose.headSlide * 20/Math.PI;
		headGroup.setAttribute('transform','translate('+headSlide+',0) rotate('+headTilt+','+headCenter.x+','+headCenter.y+')');		
		var hair = document.createElementNS('http://www.w3.org/2000/svg','g');
		
		var neck = document.createElementNS('http://www.w3.org/2000/svg','g');
		neck.id = 'neck';
		neck.setAttribute('fill',skinTone);
		neck.setAttribute('stroke','inherit');
		var neckPath = document.createElementNS('http://www.w3.org/2000/svg','polyline');
		neck.appendChild(neckPath);
		var neckWidth = this.bio('neckWidth')/0.7;
		var neckPoints = [
			{x:neckWidth*neckBase.x + nearShoulder.x*(1-neckWidth),y:neckWidth*neckBase.y + nearShoulder.y*(1-neckWidth) - neckHeight/2},
			{x:headCenter.x+headSlide,y:headCenter.y},
			{x:neckWidth*neckBase.x + farShoulder.x*(1-neckWidth),y:neckWidth*neckBase.y + farShoulder.y*(1-neckWidth) - neckHeight/2},
		];
		var neckPointsString = '';
		for (var i in neckPoints) {
			neckPointsString += neckPoints[i].x + ',' + neckPoints[i].y + ' ';
		};
		neckPath.setAttribute('points',neckPointsString);
		
		// Order the Stack
		
		var bodyParts = [hair,shoulders];
		
		if (lowerBodyAngle) {
			bodyParts = bodyParts.concat([butt,farFoot,farCalf,farThigh]);
		} else {
			bodyParts = bodyParts.concat([butt,nearFoot,nearCalf,nearThigh]);
		};
		
		if (upperBodyAngle) {
			bodyParts = bodyParts.concat([farElbowJoint,farUpperArm]);
		} else {
			bodyParts = bodyParts.concat([nearElbowJoint,nearUpperArm]);
		};
		
		bodyParts = bodyParts.concat([torso,scrotum,phallus,belly]);
		
		bodyParts = bodyParts.concat([neck,headGroup]);
		
		if (upperBodyAngle) {
			bodyParts = bodyParts.concat([farBreast,nearBreast]);
		} else {
			bodyParts = bodyParts.concat([nearBreast,farBreast]);
		};
		
		if (lowerBodyAngle) {
			bodyParts = bodyParts.concat([nearFoot,nearCalf,nearThigh]);
		} else {
			bodyParts = bodyParts.concat([farFoot,farCalf,farThigh]);
		};
		
		var lapSizedBreasts = Math.max(nearBreastCenter.y + breastSize,farBreastCenter.y + breastSize) > Math.min(nearHip.y - this.bio('hipsWidth') * 30,farHip.y - this.bio('hipsWidth') * 30);
		if (lapSizedBreasts  && upperBodyAngle) {
			bodyParts = bodyParts.concat([farBreast,nearBreast]);
		} else if (lapSizedBreasts) {
			bodyParts = bodyParts.concat([nearBreast,farBreast]);
		};

		
		if (upperBodyAngle) {
			bodyParts = bodyParts.concat([nearElbowJoint,nearUpperArm,farLowerArm,nearLowerArm]);
		} else {
			bodyParts = bodyParts.concat([farElbowJoint,farUpperArm,farLowerArm,nearLowerArm]);
		};

		// Special Render Order Goes Here (for hands behind back or similar exceptions)

		for (var i of bodyParts) {
			if (i.id !== '') {
				var stroke = document.createElementNS('http://www.w3.org/2000/svg','use');
				var hrefString = '#'+i.id;
				stroke.setAttribute('href',hrefString);
				stroke.setAttribute('stroke','black');
				stroke.setAttribute('stroke-width',10);
				svg.appendChild(stroke);
			};
			svg.appendChild(i);
		};
								
		return svg;
	};
};