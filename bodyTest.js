var model = {

	gameTitle: 'Gamen Body Test',
	gameSavePrefix: 'bodyTest',

	gameDivContents: function() {
		var svgDiv = document.createElement('div');
		svgDiv.id = 'svgDiv';
		
		model.body = new GamenBody();
		var svg = model.body.draw(500,750);
		svgDiv.appendChild(svg);
		
		var toggleShotBtn = document.createElement('button');
		toggleShotBtn.id = 'toggleShotBtn';
		toggleShotBtn.innerHTML = 'Head Shot';
		toggleShotBtn.setAttribute('onclick','handlers.toggleShot()');
		svgDiv.appendChild(toggleShotBtn);
		
		var ticklist = document.createElement('datalist');
		ticklist.id = 'ticklist';
		for (var i of [-5,0,5]) {
			var option = document.createElement('option');
			option.innerHTML = i;
			ticklist.appendChild(option);
		};
		
		var poseDiv = document.createElement('div');
		poseDiv.className = 'controlsDiv';
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
		bioDiv.className = 'controlsDiv';
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
				
		return [svgDiv, ticklist, poseDiv, bioDiv];
	},
	
	options: {
		shot: 'fullBody',
	},

};

var handlers = {
	
	newGame: function() {
		model.body = new GamenBody();
		handlers.draw();
	},
	
	draw: function() {
		var svg = model.body.draw(500,750,model.options.shot);
		var toggleShotBtn = document.getElementById('toggleShotBtn');
		document.getElementById('svgDiv').innerHTML = '';
		document.getElementById('svgDiv').appendChild(svg);
		document.getElementById('svgDiv').appendChild(toggleShotBtn);
	},
	
	toggleShot: function() {
		var toggleShotBtn = document.getElementById('toggleShotBtn');
		if (model.options.shot == 'fullBody') {
			model.options.shot = 'head'
			toggleShotBtn.innerHTML = "Full Body Shot";
		} else {
			model.options.shot = 'fullBody'
			toggleShotBtn.innerHTML = "Head Shot";
		};
		handlers.draw();
	},
	
	updatePose: function(poseKey) {
		model.body.pose[poseKey] = parseInt(document.getElementById(poseKey + "Slider").value);
		handlers.draw();
	},
	
	updateBio: function(bioKey) {
		model.body.biometrics[bioKey] = parseInt(document.getElementById(bioKey + "Slider").value);
		handlers.draw();
	},

};

function GamenBody() {

	this.parameters = {

		areolaeWidth: {
			root: 1.15,
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
			root: 1.11,
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
	
		buttSize: {
			root: 1.08,
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
			root: 1.02,
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
			root: 1.25,
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
		
		phallusLength: {
			root: 1.08,
			coefficient: 170,
			curve: 'bell',
		},
		
		phallusWidth: {
			root: 1.08,
			coefficient: 170,
			curve: 'bell',
		},
		
		scrotumSize: {
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
	for (i of [ "eyePositionX", "eyePositionY", "farEyeInnerLid", "farEyeOuterLid", "farEyeLowerLid", "farFootPoint", "farForearmLift", "farKneeBend", "farThighLift", "farUpperArmLift", "fingersSplay", "fingersCurl", "headNod", "headSlide", "headTip", "hipsCant", "nearEyeInnerLid", "nearEyeOuterLid", "nearEyeLowerLid", "nearFootPoint", "nearForearmLift", "nearKneeBend", "nearThighLift", "nearUpperArmLift", "shouldersTip"]) {
		this.pose[i] = Math.random() * Math.random() * Math.random() * Math.PI;
		if (Math.random() > 0.5) {this.pose[i] *= -1;};
		if (i == 'shouldersTip' || i == 'hipsCant' || i == 'headTip') {this.pose[i] /= 4;};
		if (i == 'nearEyeInnerLid' || i == 'nearEyeOuterLid' || i == 'nearEyeLowerLid' || i == 'farEyeInnerLid' || i == 'farEyeOuterLid' || i == 'farEyeLowerLid' ) {this.pose[i] = Math.max(Math.min(this.pose[i]*4,Math.PI),Math.PI*-1);};
	};
	this.pose.nearEyeInnerLid = Math.max(this.pose.nearEyeInnerLid,this.pose.nearEyeOuterLid,this.pose.nearEyeLowerLid);
	this.pose.farEyeInnerLid = Math.max(this.pose.farEyeInnerLid,this.pose.farEyeOuterLid,this.pose.farEyeLowerLid);
	this.pose.nearEyeInnerLid = this.pose.farEyeInnerLid;
	this.pose.nearEyeOuterLid = this.pose.farEyeOuterLid;
	this.pose.nearEyeLowerLid = this.pose.farEyeLowerLid;

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
	
	
	this.draw = function(width,height,shot) {
		if (height == undefined) {height = 100;};
		if (width == undefined) {width = 100;};
		if (shot == undefined) {shot = 'fullBody';};
		
		var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
		
		var svgNodes = this.svg(height);
		svg.appendChild(svgNodes);
		
		// default viewport
		var minX = width/-2;
		var minY = height * -0.8
		var viewBoxString = minX + ' ' + minY + ' ' + width + ' ' + height;
		svg.setAttribute('viewBox',viewBoxString);
		
		if (shot == 'head') {
			headShot = svg.getElementById('headShot');
			viewBoxString = headShot.getAttribute('x') + ' ' + headShot.getAttribute('y') + ' ' + headShot.getAttribute('width') + ' ' + headShot.getAttribute('height');
			svg.setAttribute('viewBox',viewBoxString);
		};
		
		return svg;
		
	};
	
	this.svg = function (height) {
	
		var svg = document.createElementNS('http://www.w3.org/2000/svg','g');
	
		pose = this.pose;
		
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
		var footLength = 0.12 * totalHeight * this.bio('footLength');
		var nearLegHeight = Math.sin(pose.hipsCant) * hipsWidth/2 + Math.max(0,Math.cos(pose.nearThighLift) * thighLength) + Math.max(0,Math.cos(pose.nearKneeBend) * calfLength);
		var farLegHeight = Math.sin(pose.hipsCant) * hipsWidth/-2 + Math.max(0,Math.cos(pose.farThighLift) * thighLength) + Math.max(0,Math.cos(pose.farKneeBend) * calfLength);
		var pelvisHeight = Math.max(nearLegHeight,farLegHeight) * -1;
		var shouldersHeight = pelvisHeight - torsoHeight;
		var headCenter = {x:0,y:shouldersHeight - neckHeight - headHeight/2};
		var breastSize = this.bio('breastSize') * 20;
		var haunchWidth = this.bio('hipsWidth') * 30;
				
		// Colors
		var skinTone = this.skinTone;
		var areolaeTone = this.areolaeTone;

		// Orientation
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

		// Joints and Points
		var neckBase = {
			x:0,
			y:pelvisHeight - torsoHeight
		};
		var spineBase = {
			x:0,
			y:pelvisHeight
		};
		var neckBase = {
			x:0,
			y:pelvisHeight - torsoHeight
		};
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
		var farHaunch = {
			x: (3*farHip.x+spineBase.x)/4,
			y: (3*farHip.y+spineBase.y)/4,
		};
		var nearHaunch = {
			x: (3*nearHip.x+spineBase.x)/4,
			y: (3*nearHip.y+spineBase.y)/4,
		};
		var nearFootAngle = Math.PI/3;
		var farFootAngle = Math.PI/3;
		if (!lowerBodyAngle) {
			nearFootAngle *= -1;
			farFootAngle *= -1;
		};
		var nearToes = {
			x: nearAnkle.x + Math.sin(nearFootAngle)*footLength,
			y: nearAnkle.y + Math.cos(nearFootAngle)*footLength,
		};
		var farToes = {
			x: farAnkle.x + Math.sin(farFootAngle)*footLength,
			y: farAnkle.y + Math.cos(farFootAngle)*footLength,
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
		var farBreastAnchor = {
			x:farShoulder.x/2,
			y:(neckBase.y+farShoulder.y)/2,
		};
		var farBreastCenter = {
			x:farShoulder.x/2,
			y:farBreastAnchor.y + Math.max(breastSize,torsoHeight/3 * this.bio('breastSag')),
		};
		var nearBreastAnchor = {
			x:nearShoulder.x/2,
			y:(neckBase.y+nearShoulder.y)/2,
		};
		var nearBreastCenter = {
			x:nearShoulder.x/2,
			y:nearBreastAnchor.y + Math.max(breastSize,torsoHeight/3 * this.bio('breastSag')),
		};
		var bellyCollision = pelvisHeight - this.bio('belly')*60;
		if (farBreastCenter.y + breastSize > bellyCollision) {
			farBreastCenter.x -= (bellyCollision - (farBreastCenter.y + breastSize))/4 ;
		};
		if (nearBreastCenter.y + breastSize > bellyCollision) {
			nearBreastCenter.x += (bellyCollision - (nearBreastCenter.y + breastSize))/4 ;
		};
		if (upperBodyAngle) {
			farBreastCenter.x += breastSize * 0.7;
			nearBreastCenter.x += breastSize * 0.5;
		} else {
			farBreastCenter.x -= breastSize * 0.5;
			nearBreastCenter.x -= breastSize * 0.7;
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
		var nippleLength = this.bio('nippleLength') * 6;
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
		
//		Wireframe (Old)
// 		var wireframe = document.createElementNS('http://www.w3.org/2000/svg','g');
// 		svg.appendChild(wireframe);
// 		var legs = document.createElementNS('http://www.w3.org/2000/svg','polyline');
// 		wireframe.appendChild(legs);
// 		var pointsArray = [
// 			nearToes,
// 			nearAnkle,
// 			nearKnee,
// 			nearHip,
// 			farHip,
// 			farKnee,
// 			farAnkle,
// 			farToes,
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
// 		
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
		circle.setAttribute('cx',farHaunch.x);
		circle.setAttribute('cy',farHaunch.y);
		circle.setAttribute('r',haunchWidth);
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
		var path = document.createElementNS('http://www.w3.org/2000/svg','path');
		farThigh.appendChild(path);
		var leftX = ((3*farHip.x+spineBase.x)/4) - this.bio('hipsWidth')*30;
		var rightX = ((3*farHip.x+spineBase.x)/4) + this.bio('hipsWidth')*30;
		d = 'M '+leftX+','+((3*farHip.y+spineBase.y)/4);
		d += ' A '+(this.bio('hipsWidth')*30)+','+(this.bio('hipsWidth')*30)+' 1 1 0 '+rightX+','+((3*farHip.y+spineBase.y)/4);
		path.setAttribute('d',d);
		
		var nearThigh = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearThigh.id = 'nearThigh';
		nearThigh.setAttribute('fill',skinTone);
		nearThigh.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearThigh.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',nearHaunch.x);
		circle.setAttribute('cy',nearHaunch.y);
		circle.setAttribute('r',haunchWidth);
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
		var path = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearThigh.appendChild(path);
		var leftX = ((3*nearHip.x+spineBase.x)/4) - this.bio('hipsWidth')*30;
		var rightX = ((3*nearHip.x+spineBase.x)/4) + this.bio('hipsWidth')*30;
		d = 'M '+leftX+','+((3*nearHip.y+spineBase.y)/4);
		d += ' A '+(this.bio('hipsWidth')*30)+','+(this.bio('hipsWidth')*30)+' 1 1 0 '+rightX+','+((3*nearHip.y+spineBase.y)/4);
		path.setAttribute('d',d);

		var butt = document.createElementNS('http://www.w3.org/2000/svg','g');
		butt.id = 'butt';
		butt.setAttribute('fill',skinTone);
		butt.setAttribute('stroke','inherit');
// 		var backBelly = document.createElementNS('http://www.w3.org/2000/svg','path');
// 		butt.appendChild(backBelly);
// 		var controlY = this.bio('belly') * 120;
// 		var d = 'M ' + (nearHaunch.x - haunchWidth*0.75) + ',' + nearHaunch.y + ' ';
// 		d += 'C ' + (nearHaunch.x - haunchWidth*0.75) + ',' + (nearHaunch.y - controlY) + ' ' + (farHaunch.x + haunchWidth*0.75) + ',' + (farHaunch.y - controlY) + ' ' + (farHaunch.x + haunchWidth*0.75) + ',' + farHaunch.y;
// 		backBelly.setAttribute('d',d);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		var buttLift = this.bio('buttSize')*20 - this.bio('hipsWidth')*30;
		if (lowerBodyAngle) {
			var buttSway = this.bio('buttSize')*-10;
		} else {
			var buttSway = this.bio('buttSize')*10;
		};
		butt.appendChild(circle);
		circle.setAttribute('cx',(3*nearHip.x+spineBase.x)/4 + buttSway);
		circle.setAttribute('cy',(3*nearHip.y+spineBase.y)/4 - buttLift);
		circle.setAttribute('r',this.bio('buttSize')*20);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		butt.appendChild(circle);
		circle.setAttribute('cx',(3*farHip.x+spineBase.x)/4 + buttSway);
		circle.setAttribute('cy',(3*farHip.y+spineBase.y)/4 - buttLift);
		circle.setAttribute('r',this.bio('buttSize')*20);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		butt.appendChild(circle);
		circle.setAttribute('cx',(3*nearHip.x+spineBase.x)/4);
		circle.setAttribute('cy',(3*nearHip.y+spineBase.y)/4);
		circle.setAttribute('r',this.bio('hipsWidth')*30);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		butt.appendChild(circle);
		circle.setAttribute('cx',(3*farHip.x+spineBase.x)/4);
		circle.setAttribute('cy',(3*farHip.y+spineBase.y)/4);
		circle.setAttribute('r',this.bio('hipsWidth')*30);
		
		var farUpperArm = document.createElementNS('http://www.w3.org/2000/svg','g');
		farUpperArm.id = 'farUpperArm';
		farUpperArm.setAttribute('fill',skinTone);
		farUpperArm.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farUpperArm.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',farShoulder.x);
		circle.setAttribute('cy',farShoulder.y);
		circle.setAttribute('r',this.bio('bicep')*15);
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
		rect.setAttribute('height',upperArmLength * 1.05);
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
		circle.setAttribute('r',this.bio('bicep')*15);
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
		rect.setAttribute('height',upperArmLength * 1.05);
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
		circle.setAttribute('r',9 * this.bio('armWidth'));
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farLowerArm.appendChild(rect);
		rect.setAttribute('x',(farElbow.x+farWrist.x)/2-this.bio('armWidth') * 10);
		rect.setAttribute('y',(farElbow.y+farWrist.y)/2-forearmLength/1.8);
		rect.setAttribute('height',forearmLength * 1);
		rect.setAttribute('width',this.bio('armWidth') * 20);
		rect.setAttribute('rx',this.bio('armWidth') * 20);
		rect.setAttribute('ry',forearmLength);
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
		circle.setAttribute('r',9 * this.bio('armWidth'));
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearLowerArm.appendChild(rect);
		rect.setAttribute('x',(nearElbow.x+nearWrist.x)/2-this.bio('armWidth') * 10);
		rect.setAttribute('y',(nearElbow.y+nearWrist.y)/2-forearmLength/1.8);
		rect.setAttribute('height',forearmLength * 1);
		rect.setAttribute('width',this.bio('armWidth') * 20);
		rect.setAttribute('rx',this.bio('armWidth') * 20);
		rect.setAttribute('ry',forearmLength);
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
		circle.setAttribute('r',9 * this.bio('armWidth'));
				
		var nearElbowJoint = document.createElementNS('http://www.w3.org/2000/svg','use');
		nearElbowJoint.id = 'nearElbowJoint';
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearElbowJoint.appendChild(circle);
		circle.setAttribute('cx',nearElbow.x);
		circle.setAttribute('cy',nearElbow.y);
		circle.setAttribute('r',9 * this.bio('armWidth'));
		
		var torso = document.createElementNS('http://www.w3.org/2000/svg','g');
		torso.id = 'torso';
		torso.setAttribute('fill',skinTone);
		torso.setAttribute('stroke','inherit');
		var backBelly = document.createElementNS('http://www.w3.org/2000/svg','path');
		torso.appendChild(backBelly);
		var control = this.bio('belly') * 30;
		var d = 'M ' + (nearHaunch.x - haunchWidth*0.7) + ',' + (nearHaunch.y-haunchWidth*0.7) + ' ';
		d += 'C ' + (nearHaunch.x - haunchWidth*0.7) + ',' + (nearHaunch.y - haunchWidth*0.7 - control) + ' ' + (neckBase.x-control) + ',' + (neckBase.y+pelvisHeight)/2 + ' ' + neckBase.x + ',' + (neckBase.y+pelvisHeight)/2;
		d += 'C ' + (neckBase.x+control) + ',' + (neckBase.y+pelvisHeight)/2 + ' ' + (farHaunch.x + haunchWidth*0.7) + ',' + (farHaunch.y-haunchWidth*0.7-control) + ' ' + (farHaunch.x + haunchWidth*0.7) + ',' + (farHaunch.y-haunchWidth*0.7);
		backBelly.setAttribute('d',d);
		var path = document.createElementNS('http://www.w3.org/2000/svg','path');
		path.setAttribute('stroke','none');
		var farSide = document.createElementNS('http://www.w3.org/2000/svg','path');
		farSide.setAttribute('fill','none');
		torso.appendChild(farSide);
		var nearSide = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearSide.setAttribute('fill','none');
		torso.appendChild(nearSide);
		torso.appendChild(path);
		var d = 'M '+nearHip.x+','+(nearHip.y - this.bio('hipsWidth') * 30)+' ';
		var nearD = 'M '+nearHip.x+','+(nearHip.y - this.bio('hipsWidth') * 30)+' ';
		var farD = 'M '+farShoulder.x+','+farShoulder.y+' ';
		var nearC = (nearShoulder.y - nearHip.y)/2;
		var farC = (farShoulder.y - farHip.y)/2;
		// Up Near Side
		c1x = nearHip.x;
		c1y = nearHip.y - this.bio('hipsWidth') * 30 + nearC;
		x = nearShoulder.x;
		y = nearShoulder.y;
		c2x = x;
		c2y = y - nearC;
		d += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		nearD += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		// Up to Neck
		c1x = x+10;
		c1y = y+0;
		x = (neckBase.x + headCenter.x)/2;
		y = (neckBase.y + headCenter.y)/2;
		c2x = x;
		c2y = y+10;
		d += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		// Down to Far Shoulder
		c1x = x+0;
		c1y = y+10;
		x = farShoulder.x;
		y = farShoulder.y;
		c2x = x-10;
		c2y = y;
		d += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		// Down Far Side
		c1x = x+0;
		c1y = y - farC;
		x = farHip.x;
		y = farHip.y - this.bio('hipsWidth') * 30;
		c2x = x;
		c2y = y + farC;
		d += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		farD += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		// To Pelvis
		c1x = x;
		c1y = y;
		x = 0;
		y = pelvisHeight;
		c2x = x;
		c2y = y;
		d += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		d += ' z';
		path.setAttribute('d',d);
		nearSide.setAttribute('d',nearD);
		farSide.setAttribute('d',farD);
		var pelvis = document.createElementNS('http://www.w3.org/2000/svg','path');
		torso.appendChild(pelvis);
		var startX = hipsWidth * 0.4;
		var startY = pelvisHeight;
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
		
		var shoulders = document.createElementNS('http://www.w3.org/2000/svg','g');
		shoulders.id = 'shoulders';
		shoulders.setAttribute('fill',skinTone);
		shoulders.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		shoulders.appendChild(circle);
		circle.setAttribute('cx',farShoulder.x);
		circle.setAttribute('cy',farShoulder.y);
		circle.setAttribute('r',this.bio('bicep')*15);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		shoulders.appendChild(circle);
		circle.setAttribute('cx',nearShoulder.x);
		circle.setAttribute('cy',nearShoulder.y);
		circle.setAttribute('r',this.bio('bicep')*15);
		var polyline = document.createElementNS('http://www.w3.org/2000/svg','polyline');
		shoulders.appendChild(polyline);
		var pointsArray = [
			{x:nearShoulder.x,y:nearShoulder.y+this.bio('bicep') * 10},
			{x:nearShoulder.x,y:nearShoulder.y-this.bio('bicep') * 10},
			{x:(2*neckBase.x + headCenter.x)/3,y:(2*neckBase.y + headCenter.y)/3},
			{x:farShoulder.x,y:farShoulder.y-this.bio('bicep') * 10},
			{x:farShoulder.x,y:farShoulder.y+this.bio('bicep') * 10},
		];
		var pointsString = '';
		for (var i of pointsArray) {
			pointsString += i.x + ',' + i.y + ' ';
		};
		polyline.setAttribute('points',pointsString);

		var farBreast = document.createElementNS('http://www.w3.org/2000/svg','g');
		farBreast.id = 'farBreast';
		farBreast.setAttribute('fill',skinTone);
		farBreast.setAttribute('stroke','inherit');
		var shoulderTipDegrees = pose.shouldersTip * -180/Math.PI;
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
		var cathetus, control;
		if (this.bio('breastSize') >= 1) {
			cathetus = this.bio('breastSize') * 10 * Math.pow(2,0.5);
			control = 0.5522847 * cathetus;
			breastWidth = 1;
		} else {
			cathetus = 10 * Math.pow(2,0.5);
			control = 0.5522847 * this.bio('breastSize') * cathetus;
			breastWidth = Math.min(2,1/this.bio('breastSize'));
		};
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
		x = farBreastCenter.x - cathetus * breastWidth;
		y = farBreastCenter.y + cathetus;
		c2x = x + control;
		c2y = y + control;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		if (!upperBodyAngle) {
			c1x = farBreastCenter.x - cathetus * breastWidth - control;
			c1y = farBreastCenter.y + cathetus - control;
			x = farBreastCenter.x - cathetus * breastWidth;
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
		var nipplePuff = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farBreast.appendChild(nipplePuff);
		nipplePuff.setAttribute('cx',farAreolae.x);
		nipplePuff.setAttribute('cy',farAreolae.y);
		nipplePuff.setAttribute('r',this.bio('nipplePuff') * breastSize/3);
		var nipplePuffClip = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farBreastClipPath.prepend(nipplePuffClip);
		nipplePuffClip.setAttribute('cx',farAreolae.x);
		nipplePuffClip.setAttribute('cy',farAreolae.y);
		nipplePuffClip.setAttribute('r',this.bio('nipplePuff') * breastSize/3);
		var areolae = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farBreast.appendChild(areolae);
		areolae.setAttribute('fill',areolaeTone);
		areolae.setAttribute('stroke','none');
		areolae.setAttribute('cx',farAreolae.x);
		areolae.setAttribute('cy',farAreolae.y);
		areolae.setAttribute('r',this.bio('areolaeWidth') * breastSize/3);
		areolae.setAttribute('clip-path','url(#farBreastClipPath)');
		var nipple = document.createElementNS('http://www.w3.org/2000/svg','path');
		farBreast.appendChild(nipple);
		nipple.setAttribute('fill',areolaeTone);
		if (this.bio('nippleLength') >= 1) {
			nipple.setAttribute('stroke','black');
			nipple.setAttribute('stroke-width',3);
			nipple.setAttribute('stroke-linecap','round');
		};
		var d = 'M ' + farNippleTop.x + ',' + farNippleTop.y + ' ';
		d += 'c ' + nippleLength + ',' + 0 + ' ' + nippleLength + ',' + nippleWidth + ' ' + 0 + ',' + nippleWidth ;
		nipple.setAttribute('d',d);
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
		x = nearBreastCenter.x + cathetus * breastWidth;
		y = nearBreastCenter.y + cathetus;
		c2x = x - control;
		c2y = y + control;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		if (upperBodyAngle) {
			c1x = nearBreastCenter.x + cathetus * breastWidth + control;
			c1y = nearBreastCenter.y + cathetus - control;
			x = nearBreastCenter.x + cathetus * breastWidth;
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
		var nipplePuff = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearBreast.appendChild(nipplePuff);
		nipplePuff.setAttribute('cx',nearAreolae.x);
		nipplePuff.setAttribute('cy',nearAreolae.y);
		nipplePuff.setAttribute('r',this.bio('nipplePuff') * breastSize/3);
		var nipplePuffClip = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearBreastClipPath.prepend(nipplePuffClip);
		nipplePuffClip.setAttribute('cx',nearAreolae.x);
		nipplePuffClip.setAttribute('cy',nearAreolae.y);
		nipplePuffClip.setAttribute('r',this.bio('nipplePuff') * breastSize/3);
		var areolae = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearBreast.appendChild(areolae);
		areolae.setAttribute('fill',areolaeTone);
		areolae.setAttribute('stroke','none');
		areolae.setAttribute('cx',nearAreolae.x);
		areolae.setAttribute('cy',nearAreolae.y);
		areolae.setAttribute('r',this.bio('areolaeWidth') * breastSize/3);
		areolae.setAttribute('clip-path','url(#nearBreastClipPath)');
		var nipple = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearBreast.appendChild(nipple);
		nipple.setAttribute('fill',areolaeTone);
		if (this.bio('nippleLength') >= 1) {
			nipple.setAttribute('stroke','black');
			nipple.setAttribute('stroke-width',3);
			nipple.setAttribute('stroke-linecap','round');
		};
		var d = 'M ' + nearNippleTop.x + ',' + nearNippleTop.y + ' ';
		d += 'c ' + nippleLength + ',' + 0 + ' ' + nippleLength + ',' + nippleWidth + ' ' + 0 + ',' + nippleWidth ;
		nipple.setAttribute('d',d);
		nipple.setAttribute('transform','rotate('+tilt+' '+nearAreolae.x+' '+nearAreolae.y+')');
		
		var belly = document.createElementNS('http://www.w3.org/2000/svg','g');
		belly.id = 'belly';
		belly.setAttribute('fill',skinTone);
		belly.setAttribute('stroke','inherit');
		var bellySize = this.bio('belly') * 40;
		var bellyOffset = (bellySize/3);
		if (!upperBodyAngle) {
			bellyOffset *= -1;
		};
		var farBellyTop = {
			x:(farBreastAnchor.x+farBreastCenter.x)/2,
			y:(farBreastAnchor.y+farBreastCenter.y)/2,
		};
		var nearBellyTop = {
			x: (nearBreastAnchor.x+nearBreastCenter.x)/2,
			y: (nearBreastAnchor.y+nearBreastCenter.y)/2,
		};
		var bellyBottom = {
			x: bellyOffset,
			y:shouldersHeight+torsoHeight + Math.max(bellySize-40,0),
		};
		var farBellyBottom = {
			x:bellyBottom.x + Math.max(bellySize-40,0),
			y:bellyBottom.y + Math.max(bellySize-40,0)/3,
		};
		var nearBellyBottom = {
			x: bellyBottom.x - Math.max(bellySize-40,0),
			y: bellyBottom.y + Math.max(bellySize-40,0)/3,
		};
		var farBellySide = {
			x: (farBellyBottom.x + farBellyTop.x)/2 + bellyOffset + this.bio('belly')*15-15,
			y: (bellyBottom.y + farBellyTop.y)/2 - this.bio('belly')*20+20,
		};
		var nearBellySide = {
			x: (nearBellyBottom.x + nearBellyTop.x)/2 + bellyOffset - this.bio('belly')*15+15,
			y: (bellyBottom.y + nearBellyTop.y)/2 - this.bio('belly')*20+20,
		};
		if (!upperBodyAngle) {
			farBellySide.x += bellySize * 2/3;
		} else {
			nearBellySide.x -= bellySize * 2/3;
		};
		var bellyTriangle = document.createElementNS('http://www.w3.org/2000/svg','polygon');
		belly.appendChild(bellyTriangle);
		bellyTriangle.setAttribute('stroke',skinTone);
		var points = [nearBellyTop,bellyBottom,farBellyTop];
		var pointsString = '';
		for (var p in points) {
			pointsString += points[p].x + ',' + points[p].y + ' ';
		};
		bellyTriangle.setAttribute('points',pointsString);
		var farPath = document.createElementNS('http://www.w3.org/2000/svg','path');
		belly.appendChild(farPath);
		farPath.id = 'farPath';
		var nearPath = document.createElementNS('http://www.w3.org/2000/svg','path');
		belly.appendChild(nearPath);
		var farD = 'M ' + farBellyTop.x + ',' + farBellyTop.y + ' ' ;
		var nearD = 'M ' + nearBellyTop.x + ',' + nearBellyTop.y + ' ';
		farD += 'C '+farBellyTop.x+' '+farBellyTop.y+' ' + (farBellySide.x - bellySize/4) + ' '+(farBellySide.y-bellySize/2)+' '+farBellySide.x + ' ' + farBellySide.y;
		nearD += 'C '+nearBellyTop.x+' '+nearBellyTop.y+' '+(nearBellySide.x + bellySize/4)+' '+(nearBellySide.y-bellySize/2)+' '+nearBellySide.x + ' ' + nearBellySide.y;
		farD += 'C '+farBellySide.x+' '+farBellySide.y+' ' + (farBellyBottom.x+bellySize) + ' '+farBellyBottom.y+' '+farBellyBottom.x + ' ' + farBellyBottom.y;
		nearD += 'C '+nearBellySide.x+' '+nearBellySide.y+' '+(nearBellyBottom.x-bellySize)+' '+nearBellyBottom.y+' '+nearBellyBottom.x + ' ' + nearBellyBottom.y;
		farD += 'C '+farBellyBottom.x+' '+farBellyBottom.y+' ' + bellyBottom.x + ' '+bellyBottom.y+' '+bellyBottom.x + ' ' + bellyBottom.y;
		nearD += 'C '+nearBellyBottom.x+' '+nearBellyBottom.y+' '+bellyBottom.x+' '+bellyBottom.y+' '+bellyBottom.x + ' ' + bellyBottom.y;
		farPath.setAttribute('d',farD);
		nearPath.setAttribute('d',nearD);
		var abs = document.createElementNS('http://www.w3.org/2000/svg','g');
		belly.appendChild(abs);
		var nearTopAb = {
			x: nearBreastAnchor.x + bellyOffset,
			y: Math.min(nearBreastCenter.y + breastSize,nearBreastAnchor.y + torsoHeight*0.4),
		};
		var farTopAb = {
			x: farBreastAnchor.x + bellyOffset,
			y: Math.min(farBreastCenter.y + breastSize,farBreastAnchor.y + torsoHeight*0.4),
		};
		var nearAbGap = (10*nearTopAb.x+9*farTopAb.x)/19;
		var farAbGap = (10*farTopAb.x+9*nearTopAb.x)/19;
		var stepY = (Math.max(farTopAb.y,nearTopAb.y) - Math.min(farHip.y,nearHip.y)) / -4 ;
		var nearStepX = (farTopAb.x - nearTopAb.x) / 13;
		var farStepX = (farTopAb.x - nearTopAb.x) / 13;
		if (upperBodyAngle) {
			farStepX *= 1.5;
		} else {
			nearStepX *= 1.5;
		};
		if (this.bio('belly') < 1) {
			for (var i=0;i<4;i++) {
				var opacity = (1-this.bio('belly'))/(1+i);
				var nearAb = document.createElementNS('http://www.w3.org/2000/svg','path');
				belly.appendChild(nearAb);
				nearAb.setAttribute('stroke','black');
				nearAb.setAttribute('stroke-width',3);
				nearAb.setAttribute('opacity',opacity);
				var thisAbY = nearTopAb.y + stepY * i;
				var middleY = (nearTopAb.y + farTopAb.y)/2 + stepY * i;
				nearD = 'M '+(nearTopAb.x+nearStepX*i)+','+thisAbY+' ';
				nearD += 'L '+(nearTopAb.x+nearStepX*i)+','+(thisAbY + 0.8*stepY)+' ';
				nearD += 'L '+nearAbGap+','+(middleY + 0.8*stepY)+' ';
				nearD += 'L '+nearAbGap+','+middleY+' ';
				nearAb.setAttribute('d',nearD);
				var farAb = document.createElementNS('http://www.w3.org/2000/svg','path');
				belly.appendChild(farAb);
				farAb.setAttribute('stroke','black');
				farAb.setAttribute('stroke-width',3);
				farAb.setAttribute('opacity',opacity);
				thisAbY = farTopAb.y + stepY * i;
				farD = 'M '+(farTopAb.x-farStepX*i)+','+thisAbY+' ';
				farD += 'L '+(farTopAb.x-farStepX*i)+','+(thisAbY+ 0.8*stepY)+' ';
				farD += 'L '+farAbGap+','+(middleY + 0.8*stepY)+' ';
				farD += 'L '+farAbGap+','+middleY+' ';
				farAb.setAttribute('d',farD);
			};
		};
		var navel = document.createElementNS('http://www.w3.org/2000/svg','path');
		belly.appendChild(navel);
		
		var scrotum = document.createElementNS('http://www.w3.org/2000/svg','g');
		
		var phallus = document.createElementNS('http://www.w3.org/2000/svg','g');
		
		var farFoot = document.createElementNS('http://www.w3.org/2000/svg','g');
		farFoot.id = 'farFoot';
		farFoot.setAttribute('fill',skinTone);
		farFoot.setAttribute('stroke','inherit');
		var heel = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farFoot.appendChild(heel);
		heel.setAttribute('x',farAnkle.x-10);
		heel.setAttribute('y',farAnkle.y-10);
		heel.setAttribute('width',20);
		heel.setAttribute('height',20);
		heel.setAttribute('rx',8);
		heel.setAttribute('ry',8);
		var footFront = document.createElementNS('http://www.w3.org/2000/svg','polyline');
		farFoot.appendChild(footFront);
		var footPoints = [
			{x:farAnkle.x,y:farAnkle.y-10},
			{x:farToes.x,y:(farAnkle.y + 2*farToes.y)/3},
			farToes,
			{x:(farAnkle.x + 2*farToes.x)/3,y:farToes.y},
			{x:farAnkle.x,y:farAnkle.y+10},
		];
		var footPointsString = '';
		for (var i in footPoints) {
			footPointsString += footPoints[i].x + ',' + footPoints[i].y + ' ';
		};
		footFront.setAttribute('points',footPointsString);
		var bigToe = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farFoot.appendChild(bigToe);
		bigToe.setAttribute('cx',farToes.x);
		bigToe.setAttribute('cy',(farAnkle.y + 5*farToes.y)/6);
		bigToe.setAttribute('r',5);
		var tendon = document.createElementNS('http://www.w3.org/2000/svg','polyline')
		farFoot.appendChild(tendon);
		var footPoints = [
			{x:(4*farAnkle.x+farKnee.x)/5,y:(4*farAnkle.y+farKnee.y)/5},
			farToes,
			farAnkle,
		];
		var footPointsString = '';
		for (var i in footPoints) {
			footPointsString += footPoints[i].x + ',' + footPoints[i].y + ' ';
		};
		tendon.setAttribute('points',footPointsString);
		var tilt = pose.farFootPoint * -180/Math.PI / 6;
		farFoot.setAttribute('transform','rotate('+tilt+' '+farAnkle.x+' '+farAnkle.y+')');
				
		var nearFoot = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearFoot.id = 'nearFoot';
		nearFoot.setAttribute('fill',skinTone);
		nearFoot.setAttribute('stroke','inherit');
		var heel = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearFoot.appendChild(heel);
		heel.setAttribute('x',nearAnkle.x-10);
		heel.setAttribute('y',nearAnkle.y-10);
		heel.setAttribute('width',20);
		heel.setAttribute('height',20);
		heel.setAttribute('rx',8);
		heel.setAttribute('ry',8);
		var footFront = document.createElementNS('http://www.w3.org/2000/svg','polyline');
		nearFoot.appendChild(footFront);
		var footPoints = [
			{x:nearAnkle.x,y:nearAnkle.y-10},
			{x:nearToes.x,y:(nearAnkle.y + 2*nearToes.y)/3},
			nearToes,
			{x:(nearAnkle.x + 2*nearToes.x)/3,y:nearToes.y},
			{x:nearAnkle.x,y:nearAnkle.y+10},
		];
		var footPointsString = '';
		for (var i in footPoints) {
			footPointsString += footPoints[i].x + ',' + footPoints[i].y + ' ';
		};
		footFront.setAttribute('points',footPointsString);
		var bigToe = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearFoot.appendChild(bigToe);
		bigToe.setAttribute('cx',nearToes.x);
		bigToe.setAttribute('cy',(nearAnkle.y + 5*nearToes.y)/6);
		bigToe.setAttribute('r',5);
		var tendon = document.createElementNS('http://www.w3.org/2000/svg','polyline')
		nearFoot.appendChild(tendon);
		var footPoints = [
			{x:(4*nearAnkle.x+nearKnee.x)/5,y:(4*nearAnkle.y+nearKnee.y)/5},
			nearToes,
			nearAnkle,
		];
		var footPointsString = '';
		for (var i in footPoints) {
			footPointsString += footPoints[i].x + ',' + footPoints[i].y + ' ';
		};
		tendon.setAttribute('points',footPointsString);	
		var tilt = pose.nearFootPoint * -180/Math.PI / 6;
		nearFoot.setAttribute('transform','rotate('+tilt+' '+nearAnkle.x+' '+nearAnkle.y+')');
					
		var headGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		headGroup.id = 'headGroup';
		headGroup.setAttribute('fill',skinTone);
		headGroup.setAttribute('stroke','inherit');
		var facing;
		if (upperBodyAngle) {
			facing = 12;
		} else {
			facing = -12;
		};
		var eyeSize = this.bio('eyeSize') * 8;
		var nodOffset = 10*pose.headNod/Math.PI
		var head = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
		headGroup.appendChild(head);
		head.setAttribute('cx',headCenter.x);
		head.setAttribute('cy',headCenter.y);
		head.setAttribute('rx',headWidth/2);
		head.setAttribute('ry',headHeight/2);
		var temples = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
		headGroup.appendChild(temples);
		temples.setAttribute('cx',headCenter.x);
		temples.setAttribute('cy',headCenter.y-headHeight/2+headWidth/2);
		temples.setAttribute('rx',headWidth/2);
		temples.setAttribute('ry',headWidth/2);
		var nearEyeCenter = {
			x: headCenter.x+facing-headWidth/5,
			y: headCenter.y+nodOffset,
		};
		var farEyeCenter = {
			x: headCenter.x+facing+headWidth/5,
			y: headCenter.y+nodOffset,
		};
		var nearEyeGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		headGroup.appendChild(nearEyeGroup);
		var nearEyeBack = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearEyeGroup.appendChild(nearEyeBack);
		nearEyeBack.setAttribute('cx',nearEyeCenter.x);
		nearEyeBack.setAttribute('cy',nearEyeCenter.y);
		nearEyeBack.setAttribute('r',eyeSize);
		var nearEyeBall = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearEyeGroup.appendChild(nearEyeBall);
		var nearEye = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearEyeBall.appendChild(nearEye);
		nearEye.setAttribute('stroke','red');
		nearEye.setAttribute('stroke-width',2);
		nearEye.setAttribute('fill','ghostwhite');
		nearEye.setAttribute('cx',nearEyeCenter.x);
		nearEye.setAttribute('cy',nearEyeCenter.y);
		nearEye.setAttribute('r',eyeSize);
		var nearEyePupil = document.createElementNS('http://www.w3.org/2000/svg','circle');
		var nearEyeIris = document.createElementNS('http://www.w3.org/2000/svg','circle');
		var nearEyeHighlight = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearEyeBall.appendChild(nearEyeIris);
		nearEyeBall.appendChild(nearEyePupil);
		nearEyeBall.appendChild(nearEyeHighlight);
		nearEyePupil.setAttribute('cx',nearEyeCenter.x+pose.eyePositionX/Math.PI*eyeSize);
		nearEyeIris.setAttribute('cx',nearEyeCenter.x+pose.eyePositionX/Math.PI*eyeSize);
		nearEyeHighlight.setAttribute('cx',nearEyeCenter.x+eyeSize/4+pose.eyePositionX/Math.PI*eyeSize);
		nearEyePupil.setAttribute('cy',nearEyeCenter.y+pose.eyePositionY/Math.PI*eyeSize);
		nearEyeIris.setAttribute('cy',nearEyeCenter.y+pose.eyePositionY/Math.PI*eyeSize);
		nearEyeHighlight.setAttribute('cy',nearEyeCenter.y-eyeSize/4+pose.eyePositionY/Math.PI*eyeSize);
		nearEyePupil.setAttribute('r',eyeSize/4);
		nearEyeIris.setAttribute('r',eyeSize/2);
		nearEyeHighlight.setAttribute('r',eyeSize/4);
		nearEyePupil.setAttribute('fill','black');
		nearEyeIris.setAttribute('fill','green');
		nearEyeHighlight.setAttribute('fill','white');
		var nearEyeLidsClipPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath');
		nearEyeLidsClipPath.id = 'nearEyeLidsClipPath';
		defs.appendChild(nearEyeLidsClipPath);
		var nearEyeLids = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearEyeLidsClipPath.appendChild(nearEyeLids);
		var nearEyeLidsStroke = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearEyeGroup.appendChild(nearEyeLidsStroke);
		nearEyeLidsStroke.setAttribute('stroke','black');
		nearEyeLidsStroke.setAttribute('stroke-width',1);
		nearEyeLidsStroke.setAttribute('fill','none');
		d = 'M '+(nearEyeCenter.x+eyeSize)+','+nearEyeCenter.y+' ';
		d += 'C '+(nearEyeCenter.x+eyeSize)+','+ (nearEyeCenter.y+pose.nearEyeInnerLid*10/Math.PI) +' '+(nearEyeCenter.x-eyeSize)+','+ (nearEyeCenter.y+pose.nearEyeOuterLid*10/Math.PI) +' '+(nearEyeCenter.x-eyeSize)+','+nearEyeCenter.y+' ';
		d += 'C '+(nearEyeCenter.x-eyeSize)+','+ (nearEyeCenter.y+pose.nearEyeLowerLid*10/Math.PI) +' '+(nearEyeCenter.x+eyeSize)+','+ (nearEyeCenter.y+pose.nearEyeLowerLid*10/Math.PI) +' '+(nearEyeCenter.x+eyeSize)+','+nearEyeCenter.y+' ';
		nearEyeLids.setAttribute('d',d);
		nearEyeLidsStroke.setAttribute('d',d);
		nearEyeBall.setAttribute('clip-path','url(#nearEyeLidsClipPath)');
		var farEyeGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		headGroup.appendChild(farEyeGroup);
		var farEyeBack = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farEyeGroup.appendChild(farEyeBack);
		farEyeBack.setAttribute('cx',farEyeCenter.x);
		farEyeBack.setAttribute('cy',farEyeCenter.y);
		farEyeBack.setAttribute('r',eyeSize);
		var farEyeBall = document.createElementNS('http://www.w3.org/2000/svg','g');
		farEyeGroup.appendChild(farEyeBall);
		var farEye = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farEyeBall.appendChild(farEye);
		farEye.setAttribute('stroke','red');
		farEye.setAttribute('stroke-width',2);
		farEye.setAttribute('fill','white');
		farEye.setAttribute('cx',headCenter.x+facing+headWidth/5);
		farEye.setAttribute('cy',headCenter.y+nodOffset);
		farEye.setAttribute('r',eyeSize);
		var farEyePupil = document.createElementNS('http://www.w3.org/2000/svg','circle');
		var farEyeIris = document.createElementNS('http://www.w3.org/2000/svg','circle');
		var farEyeHighlight = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farEyeBall.appendChild(farEyeIris);
		farEyeBall.appendChild(farEyePupil);
		farEyeBall.appendChild(farEyeHighlight);
		farEyePupil.setAttribute('cx',farEyeCenter.x+pose.eyePositionX/Math.PI*eyeSize);
		farEyeIris.setAttribute('cx',farEyeCenter.x+pose.eyePositionX/Math.PI*eyeSize);
		farEyeHighlight.setAttribute('cx',farEyeCenter.x+eyeSize/4+pose.eyePositionX/Math.PI*eyeSize);
		farEyePupil.setAttribute('cy',farEyeCenter.y+pose.eyePositionY/Math.PI*eyeSize);
		farEyeIris.setAttribute('cy',farEyeCenter.y+pose.eyePositionY/Math.PI*eyeSize);
		farEyeHighlight.setAttribute('cy',farEyeCenter.y-eyeSize/4+pose.eyePositionY/Math.PI*eyeSize);
		farEyePupil.setAttribute('r',eyeSize/4);
		farEyeIris.setAttribute('r',eyeSize/2);
		farEyeHighlight.setAttribute('r',eyeSize/4);
		farEyePupil.setAttribute('fill','black');
		farEyeIris.setAttribute('fill','green');
		farEyeHighlight.setAttribute('fill','white');
		var farEyeLidsClipPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath');
		farEyeLidsClipPath.id = 'farEyeLidsClipPath';
		defs.appendChild(farEyeLidsClipPath);
		var farEyeLids = document.createElementNS('http://www.w3.org/2000/svg','path');
		farEyeLidsClipPath.appendChild(farEyeLids);
		var farEyeLidsStroke = document.createElementNS('http://www.w3.org/2000/svg','path');
		farEyeGroup.appendChild(farEyeLidsStroke);
		farEyeLidsStroke.setAttribute('stroke','black');
		farEyeLidsStroke.setAttribute('stroke-width',1);
		farEyeLidsStroke.setAttribute('fill','none');
		d = 'M '+(farEyeCenter.x-eyeSize)+','+farEyeCenter.y+' ';
		d += 'C '+(farEyeCenter.x-eyeSize)+','+ (farEyeCenter.y+pose.farEyeInnerLid*10/Math.PI) +' '+(farEyeCenter.x+eyeSize)+','+ (farEyeCenter.y+pose.farEyeOuterLid*10/Math.PI) +' '+(farEyeCenter.x+eyeSize)+','+farEyeCenter.y+' ';
		d += 'C '+(farEyeCenter.x+eyeSize)+','+ (farEyeCenter.y+pose.farEyeLowerLid*10/Math.PI) +' '+(farEyeCenter.x-eyeSize)+','+ (farEyeCenter.y+pose.farEyeLowerLid*10/Math.PI) +' '+(farEyeCenter.x-eyeSize)+','+farEyeCenter.y+' ';
		farEyeLids.setAttribute('d',d);
		farEyeLidsStroke.setAttribute('d',d);
		farEyeBall.setAttribute('clip-path','url(#farEyeLidsClipPath)');
		var faceGuides = document.createElementNS('http://www.w3.org/2000/svg','g');
		headGroup.appendChild(faceGuides);
		faceGuides.setAttribute('stroke','black');
		faceGuides.setAttribute('stroke-width',0.5);
		faceGuides.setAttribute('fill','none');
		var verticalGuide = document.createElementNS('http://www.w3.org/2000/svg','path');
		faceGuides.appendChild(verticalGuide);
		facing = headWidth/3;
		if (!upperBodyAngle) {
			facing *= -1;
		};
		d = 'M '+headCenter.x+','+(headCenter.y-headHeight/2)+' ';
		d += 'C '+(headCenter.x+facing)+','+(headCenter.y-headHeight/2)+' '+(headCenter.x+facing)+','+(headCenter.y+headHeight/2)+' '+' '+(headCenter.x)+','+(headCenter.y+headHeight/2);
		verticalGuide.setAttribute('d',d);
		var middleGuide = document.createElementNS('http://www.w3.org/2000/svg','path');
		faceGuides.appendChild(middleGuide);
		var nearFacing, farFacing;
		var facing = 10*pose.headNod/Math.PI;
		if (upperBodyAngle) {
			nearFacing = facing;
			farFacing  = 2*facing;
		} else {
			nearFacing = 2*facing;
			farFacing  = facing;
		};
		d = 'M '+(headCenter.x+headWidth/2)+','+(headCenter.y)+' ';
		d += 'C '+(headCenter.x+headWidth/2)+','+(headCenter.y+farFacing)+' '+(headCenter.x-headWidth/2)+','+(headCenter.y+nearFacing)+' '+' '+(headCenter.x-headWidth/2)+','+(headCenter.y);
		middleGuide.setAttribute('d',d);
		var noseGuide = document.createElementNS('http://www.w3.org/2000/svg','path');
		faceGuides.appendChild(noseGuide);
		var facing = 10*pose.headNod/Math.PI;
		if (!upperBodyAngle) {
			facing *= -1;
		};
		d = 'M '+(headCenter.x+headWidth/2)+','+(headCenter.y + headHeight/4)+' ';
		d += 'C '+(headCenter.x+headWidth/2)+','+(headCenter.y + headHeight/4+farFacing)+' '+(headCenter.x-headWidth/2)+','+(headCenter.y + headHeight/4+nearFacing)+' '+' '+(headCenter.x-headWidth/2)+','+(headCenter.y + headHeight/4);
		noseGuide.setAttribute('d',d);
		var mouthGuide = document.createElementNS('http://www.w3.org/2000/svg','path');
		faceGuides.appendChild(mouthGuide);
		var facing = 10*pose.headNod/Math.PI;
		if (!upperBodyAngle) {
			facing *= -1;
		};
		d = 'M '+(headCenter.x+headWidth/2)+','+(headCenter.y + headHeight/3)+' ';
		d += 'C '+(headCenter.x+headWidth/2)+','+(headCenter.y + headHeight/3+farFacing)+' '+(headCenter.x-headWidth/2)+','+(headCenter.y + headHeight/3+nearFacing)+' '+' '+(headCenter.x-headWidth/2)+','+(headCenter.y + headHeight/3);
		mouthGuide.setAttribute('d',d);
		
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
		
		var lapSizedBreasts = Math.max(nearBreastCenter.y + breastSize,farBreastCenter.y + breastSize) > Math.min(nearHip.y - this.bio('hipsWidth') * 30,farHip.y - this.bio('hipsWidth') * 30);
		var bigBelly = farBellyBottom.y > farHaunch.y + haunchWidth || nearBellyBottom.y > nearHaunch.y + haunchWidth;
		
		var bodyParts = [hair,shoulders];
		
		if (lowerBodyAngle) {
			bodyParts = bodyParts.concat([butt,farFoot,farCalf,farThigh]);
		} else {
			bodyParts = bodyParts.concat([butt,nearFoot,nearCalf,nearThigh]);
		};
		
		if (upperBodyAngle) {
			bodyParts = bodyParts.concat([farElbowJoint,farUpperArm,farLowerArm]);
		} else {
			bodyParts = bodyParts.concat([nearElbowJoint,nearUpperArm,nearLowerArm]);
		};
		
		torso.appendChild(belly);
		bodyParts = bodyParts.concat([torso,scrotum,phallus]);
		
		bodyParts = bodyParts.concat([neck,headGroup]);

		if (!lapSizedBreasts && upperBodyAngle) {
			bodyParts = bodyParts.concat([farBreast,nearBreast]);
		} else if (!lapSizedBreasts) {
			bodyParts = bodyParts.concat([nearBreast,farBreast]);
		};
		
		if (lowerBodyAngle) {
			bodyParts = bodyParts.concat([nearFoot,nearCalf,nearThigh]);
		} else {
			bodyParts = bodyParts.concat([farFoot,farCalf,farThigh]);
		};
		
		if (lapSizedBreasts  && upperBodyAngle) {
			bodyParts = bodyParts.concat([farBreast,nearBreast]);
		} else if (lapSizedBreasts) {
			bodyParts = bodyParts.concat([nearBreast,farBreast]);
		};
		
		if (upperBodyAngle) {
			bodyParts = bodyParts.concat([nearElbowJoint,nearUpperArm,nearLowerArm]);
		} else {
			bodyParts = bodyParts.concat([farElbowJoint,farUpperArm,farLowerArm]);
		};
		
		if (bigBelly  && upperBodyAngle) {
			bodyParts = bodyParts.concat([belly,farBreast,nearBreast]);
		} else if (bigBelly) {
			bodyParts = bodyParts.concat([belly,nearBreast,farBreast]);
		};

		// Special Render Order Goes Here (for hands behind back or similar exceptions)

		for (var i of bodyParts) {
			if (i.id !== '') {
				var stroke = document.createElementNS('http://www.w3.org/2000/svg','use');
				var hrefString = '#'+i.id;
				stroke.setAttribute('href',hrefString);
				stroke.setAttribute('stroke','black');
				stroke.setAttribute('stroke-width',6);
				svg.appendChild(stroke);
			};
			svg.appendChild(i);
		};
		
		var shots = document.createElementNS('http://www.w3.org/2000/svg','g');
		svg.appendChild(shots);
		var headShot = document.createElementNS('http://www.w3.org/2000/svg','rect');
		headShot.id = 'headShot';
		var headShotSize = totalHeight * 0.3;
		headShot.setAttribute('x',headCenter.x - headShotSize/2);
		headShot.setAttribute('y',headCenter.y - headShotSize/2);
		headShot.setAttribute('width',headShotSize);
		headShot.setAttribute('height',headShotSize);
		headShot.setAttribute('fill','none');
		headShot.setAttribute('stroke','none');
		shots.appendChild(headShot);
										
		return svg;
	};
};