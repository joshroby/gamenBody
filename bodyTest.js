var model = {

	gameTitle: 'Morfology Poser',
	gameSavePrefix: 'morfPoser',

	gameDivContents: function() {
		var svgDiv = document.createElement('div');
		svgDiv.id = 'svgDiv';
		
		model.body = new MorfologyBody();
		var svg = model.body.draw(500,750);
		svgDiv.appendChild(svg);
		
// 		model.secondBody = new MorfologyBody();
// 		var secondSVG = model.secondBody.svg(750);
// 		secondSVG.setAttribute('transform','translate(250 75)');
// 		svg.appendChild(secondSVG);
// 		
// 		model.thirdBody = new MorfologyBody();
// 		var thirdBody = model.thirdBody.svg(750);
// 		thirdBody.setAttribute('transform','translate(-250 75)');
// 		svg.appendChild(thirdBody);

		var buttonsDiv = document.createElement('div');
		buttonsDiv.id = 'buttonsDiv';
		svgDiv.appendChild(buttonsDiv);
		
		var fullBodyShotBtn = document.createElement('button');
		fullBodyShotBtn.id = 'fullBodyShotBtn';
		fullBodyShotBtn.innerHTML = 'Full Body Shot';
		fullBodyShotBtn.setAttribute('onclick','handlers.toggleShot("fullBody")');
		buttonsDiv.appendChild(fullBodyShotBtn);
		
		var headShotBtn = document.createElement('button');
		headShotBtn.id = 'headShotBtn';
		headShotBtn.innerHTML = 'Head Shot';
		headShotBtn.setAttribute('onclick','handlers.toggleShot("head")');
		buttonsDiv.appendChild(headShotBtn);
		
		var moneyShotBtn = document.createElement('button');
		moneyShotBtn.id = 'moneyShotBtn';
		moneyShotBtn.innerHTML = 'Money Shot';
		moneyShotBtn.setAttribute('onclick','handlers.toggleShot("money")');
		buttonsDiv.appendChild(moneyShotBtn);
		
		var handShotBtn = document.createElement('button');
		handShotBtn.id = 'handShotBtn';
		handShotBtn.innerHTML = 'Hand Shot';
		handShotBtn.setAttribute('onclick','handlers.toggleShot("hand")');
		buttonsDiv.appendChild(handShotBtn);
		
		buttonsDiv.appendChild(document.createElement('br'));
		
		var jiggleBtn = document.createElement('button');
		jiggleBtn.id = 'handShotBtn';
		jiggleBtn.innerHTML = 'Jiggle';
		jiggleBtn.setAttribute('onclick','handlers.jiggle()');
		buttonsDiv.appendChild(jiggleBtn);
		
		var animateBtn = document.createElement('button');
		animateBtn.id = 'animateBtn';
		animateBtn.innerHTML = 'Animate';
		animateBtn.setAttribute('onclick','handlers.animate()');
		buttonsDiv.appendChild(animateBtn);
		
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
			slider.setAttribute('step',Math.PI/180);
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
		
		var colorDiv = document.createElement('div');
		colorDiv.className = 'controlsDiv';
		for (var i in model.body.coloring) {
			var sliderLabel = document.createElement('p');
			sliderLabel.innerHTML = i;
			colorDiv.appendChild(sliderLabel);
			var slider = document.createElement('input');
			slider.id = i + "Slider";
			slider.setAttribute('type','range');
			slider.setAttribute('min',0.1);
			slider.setAttribute('max',0.9);
			slider.setAttribute('step',0.01);
			slider.setAttribute('value',model.body.coloring[i]);
			slider.setAttribute('oninput','handlers.updateColor("'+i+'")');
			slider.setAttribute('onchange','handlers.updateColor("'+i+'")');
			sliderLabel.prepend(slider);
		};
				
		return [svgDiv, ticklist, poseDiv, bioDiv, colorDiv];
	},
	
	options: {
		shot: 'fullBody',
	},

};

var handlers = {
	
	newGame: function() {
		model.body = new MorfologyBody();
		handlers.draw();
		for (i in model.body.pose) {
			document.getElementById(i + "Slider").value = model.body.pose[i];
		};
		for (i in model.body.biometrics) {
			document.getElementById(i + "Slider").value = model.body.biometrics[i];
		};
		for (i in model.body.coloring) {
			document.getElementById(i + "Slider").value = model.body.coloring[i];
		};
	},
	
	draw: function() {
		var svg = model.body.draw(500,750,model.options.shot);
		var buttonsDiv = document.getElementById('buttonsDiv');
		document.getElementById('svgDiv').innerHTML = '';
		document.getElementById('svgDiv').appendChild(svg);
		document.getElementById('svgDiv').appendChild(buttonsDiv);
	},
	
	toggleShot: function(shot) {
		model.options.shot = shot;
		handlers.draw();
// 		var toggleShotBtn = document.getElementById('toggleShotBtn');
// 		if (model.options.shot == 'fullBody') {
// 			model.options.shot = 'head'
// 			toggleShotBtn.innerHTML = "Money Shot";
// 		} else if (model.options.shot == 'head') {
// 			model.options.shot = 'money'
// 			toggleShotBtn.innerHTML = "Hand Shot";
// 		} else if (model.options.shot == 'money') {
// 			model.options.shot = 'hand'
// 			toggleShotBtn.innerHTML = "Full Body Shot";
// 		} else {
// 			model.options.shot = 'fullBody'
// 			toggleShotBtn.innerHTML = "Head Shot";
// 		};
// 		handlers.draw();
	},
	
	updatePose: function(poseKey) {
		model.body.pose[poseKey] = parseFloat(document.getElementById(poseKey + "Slider").value);
		handlers.draw();
	},
	
	updateBio: function(bioKey) {
		model.body.biometrics[bioKey] = parseFloat(document.getElementById(bioKey + "Slider").value);
		handlers.draw();
	},
	
	updateColor: function(bioKey) {
		model.body.coloring[bioKey] = parseFloat(document.getElementById(bioKey + "Slider").value);
		handlers.draw();
	},
	
	animate: function() {
		model.body.animate();
		for (i in model.body.biometrics) {
			document.getElementById(i + "Slider").value = model.body.biometrics[i];
		}
		for (i in model.body.pose) {
			document.getElementById(i + "Slider").value = model.body.pose[i];
		}
		for (i in model.body.coloring) {
			document.getElementById(i + "Slider").value = model.body.coloring[i];
		}
		handlers.draw();
		var timedEvent = setTimeout(handlers.animate,10);
	},
	
	jiggle: function(iterations) {
		model.body.jiggle(iterations);
		for (i in model.body.biometrics) {
			document.getElementById(i + "Slider").value = model.body.biometrics[i];
		}
		for (i in model.body.pose) {
			document.getElementById(i + "Slider").value = model.body.pose[i];
		}
		for (i in model.body.coloring) {
			document.getElementById(i + "Slider").value = model.body.coloring[i];
		}
		handlers.draw();
	},
	
	jiggly: function() {
		handlers.jiggle(1);
		var timedEvent = setTimeout(handlers.jiggly,10);
	},

};

function MorfologyBody(id) {

	if (id == undefined) {id = Math.random().toString(36).slice(2)};
	this.id = id;

	this.parameters = {

		areolaeWidth: {
			root: 1.15,
			curve: 'bell',
		},
	
		armLength: {
			root: 1.02,
			curve: 'bell',
		},
	
		armWidth: {
			root: 1.04,
			curve: 'bell',
		},
	
		belly: {
			root: 1.11,
			curve: 'bell',
		},
	
		biceps: {
			root: 1.05,
			curve: 'bell',
		},
	
		breastSize: {
			root: 1.15,
			curve: 'bell',
		},
	
		breastSag: {
			root: 1.09,
			curve: 'bell',
		},
		
		browSize: {
			root: 1.1,
			curve: 'bell',
		},
	
		buttSize: {
			root: 1.08,
			curve: 'bell',
		},
		
		calfWidth: {
			root: 1.07,
			curve: 'bell',
		},
		
		cheekboneHeight: {
			root: 1.07,
			curve: 'bell',
		},
		
		cheekboneSize: {
			root: 1.07,
			curve: 'bell',
		},
		
		cheekboneWidth: {
			root: 1.07,
			curve: 'bell',
		},
		
		earHeight: {
			root: 1.02,
			curve: 'bell',
		},
		
		earLobe: {
			root: 1.1,
			curve: 'bell',
		},
		
		earPoint: {
			root: 1.1,
			curve: 'bell',
		},
		
		earWidth: {
			root: 1.02,
			curve: 'bell',
		},
		
		eyeDistance: {
			root: 1.02,
			curve: 'bell',
		},
		
		eyeTilt: {
			root: 1.01,
			curve: 'bell',
		},
		
		eyeSize: {
			root: 1.02,
			curve: 'bell',
		},
		
		glansSize: {
			root: 1.02,
			curve: 'camel',
		},
		
		handLength: {
			root: 1.04,
			curve: 'bell',
		},
		
		handWidth: {
			root: 1.04,
			curve: 'bell',
		},
		
		footLength: {
			root: 1.05,
			curve: 'bell',
		},
		
		hairlineHeight: {
			root: 1.08,
			curve: 'bell',
		},
		
		hairlinePeak: {
			root: 1.1,
			curve: 'bell',
		},
	
		headHeight: {
			root: 1.02,
			curve: 'bell',
		},
	
		headWidth: {
			root: 1.02,
			curve: 'bell',
		},
	
		hipsWidth: {
			root: 1.04,
			curve: 'bell',
		},
		
		jawWidth: {
			root: 1.06,
			curve: 'bell',
		},
		
		labioscrotalSize: {
			root: 1.25,
			curve: 'camel',
		},
	
		legHeight: {
			root: 1.03,
			curve: 'bell',
		},
		
		lipSize: {
			root: 1.08,
			curve: 'bell',
		},
	
		nailsLength: {
			root: 1.2,
			curve: 'bell',
		},
	
		neckHeight: {
			root: 1.02,
			curve: 'bell',
		},
	
		neckWidth: {
			root: 1.025,
			curve: 'bell',
		},
		
		nippleLength: {
			root: 1.25,
			curve: 'bell',
		},
		
		nippleWidth: {
			root: 1.08,
			curve: 'bell',
		},
		
		nipplePuff: {
			root: 1.08,
			curve: 'bell',
		},
		
		noseWidth: {
			root: 1.08,
			curve: 'bell',
		},
		
		noseLength: {
			root: 1.08,
			curve: 'bell',
		},
		
		noseHeight: {
			root: 1.02,
			curve: 'bell',
		},
		
		phallusLength: {
			root: 1.8,
			curve: 'camel',
		},
		
		phallusGirth: {
			root: 1.03,
			curve: 'camel',
		},
	
		shouldersWidth: {
			root: 1.04,
			curve: 'bell',
		},
	
		templeHeight: {
			root: 1.07,
			curve: 'bell',
		},
	
		templeSize: {
			root: 1.07,
			curve: 'bell',
		},
	
		templeWidth: {
			root: 1.07,
			curve: 'bell',
		},
		
		thighWidth: {
			root: 1.07,
			curve: 'bell',
		},
	
		torsoHeight: {
			root: 1.03,
			curve: 'bell',
		},
	
		totalHeight: {
			root: 1.05,
			curve: 'bell',
		},
	};
	
	this.library = {
		boring: {"eyePositionX":-0.471238898038469,"eyePositionY":-0.06458649531074478,"farEyeInnerLid":-1.23918376891597,"farEyeOuterLid":-1.67551608191456,"farEyeLowerLid":-1.51843644923507,"farEyebrowArch":-2.3100829131163207,"farFootPoint":0.1118450477825812,"farForearmLift":-0.11419126845867289,"farHandCurl":0.0655818620824478,"farHandSplay":0.10118461055082913,"farHandTilt":-0.40256087721995143,"farHandTurn":0.14626385910159803,"farKneeBend":0.06594040047696802,"farThighLift":0.15779390417624337,"farUpperArmLift":0.715584993317675,"headNod":-0.010291833989164266,"headSlide":-0.24405169224369802,"headTip":0,"hipsCant":0,"mouthOpen":-3.14159265358979,"mouthPurse":-0.575958653158129,"mouthSmile":1.13446401379631,"mouthGrimace":0.006025301391573963,"mouthSmirk":-0.11785831040371379,"nearEyeInnerLid":-1.18682389135614,"nearEyeOuterLid":-1.85004900711399,"nearEyeLowerLid":-1.79768912955416,"nearEyebrowArch":-1.95476876223365,"nearFootPoint":-0.935868670139553,"nearForearmLift":1.25663706143592,"nearHandCurl":0,"nearHandSplay":1.25663706143592,"nearHandTilt":1.48352986419518,"nearHandTurn":3.12413936106985,"nearKneeBend":-0.0035190247333446775,"nearThighLift":-0.0025310759346229414,"nearUpperArmLift":-0.663225115757845,"phallusErection":0,"shouldersTip":0},	
		hello: {"eyePositionX":-0.471238898038469,"eyePositionY":-0.296705972839036,"farEyeInnerLid":-1.23918376891597,"farEyeOuterLid":-1.67551608191456,"farEyeLowerLid":-1.51843644923507,"farEyebrowArch":-2.94960643587042,"farFootPoint":0.1118450477825812,"farForearmLift":-2.84488668075076,"farHandCurl":-0.29040376058466427,"farHandSplay":0.009396107075860137,"farHandTilt":0.09328098961769118,"farHandTurn":-0.061780910430748924,"farKneeBend":-0.418879020478639,"farThighLift":0.418879020478639,"farUpperArmLift":2.12930168743308,"headNod":-0.010291833989164266,"headSlide":0.802851455917392,"headTip":0.366519142918809,"hipsCant":-0.296705972839036,"mouthOpen":-1.67551608191456,"mouthPurse":0.680678408277789,"mouthSmile":3.12413936106985,"mouthGrimace":0.006025301391573963,"mouthSmirk":-0.11785831040371379,"nearEyeInnerLid":-1.18682389135614,"nearEyeOuterLid":-1.85004900711399,"nearEyeLowerLid":-1.79768912955416,"nearEyebrowArch":-3.14159265358979,"nearFootPoint":-0.935868670139553,"nearForearmLift":0.820304748437335,"nearHandCurl":0.383972435438753,"nearHandSplay":1.37881010907552,"nearHandTilt":0.383972435438753,"nearHandTurn":3.12413936106985,"nearKneeBend":-0.0035190247333446775,"nearThighLift":-0.0025310759346229414,"nearUpperArmLift":-1.22173047639603,"phallusErection":2.460914245312,"shouldersTip":0.296705972839036},
		run: {"eyePositionX":-0.855211333477221,"eyePositionY":-0.523598775598299,"farEyeInnerLid":-1.23918376891597,"farEyeOuterLid":-1.85004900711399,"farEyeLowerLid":-1.13446401379631,"farEyebrowArch":1.51843644923507,"farFootPoint":0.1118450477825812,"farForearmLift":-1.01229096615671,"farHandCurl":-1.4766415980389818,"farHandSplay":0.02469722176800771,"farHandTilt":-0.5309620621151827,"farHandTurn":-0.1162008825642989,"farKneeBend":1.01229096615671,"farThighLift":-0.296705972839036,"farUpperArmLift":0.628318530717959,"headNod":-0.010291833989164266,"headSlide":-0.24405169224369802,"headTip":-0.296705972839036,"hipsCant":0,"mouthOpen":-3.14159265358979,"mouthPurse":-2.77507351067098,"mouthSmile":1.13446401379631,"mouthGrimace":0.006025301391573963,"mouthSmirk":-0.11785831040371379,"nearEyeInnerLid":-1.18682389135614,"nearEyeOuterLid":-1.85004900711399,"nearEyeLowerLid":-1.79768912955416,"nearEyebrowArch":2.18166156499291,"nearFootPoint":-0.935868670139553,"nearForearmLift":-1.76278254451427,"nearHandCurl":0,"nearHandSplay":1.53588974175501,"nearHandTilt":-2.65290046303138,"nearHandTurn":-2.54818070791172,"nearKneeBend":0.628318530717959,"nearThighLift":-0.366519142918809,"nearUpperArmLift":-0.715584993317675,"phallusErection":0,"shouldersTip":0},
		squat: {"eyePositionX":-0.471238898038469,"eyePositionY":-0.06458649531074478,"farEyeInnerLid":-1.09955742875643,"farEyeOuterLid":-1.09955742875643,"farEyeLowerLid":0.767944870877505,"farEyebrowArch":-2.3100829131163207,"farFootPoint":0.1118450477825812,"farForearmLift":-0.715584993317675,"farHandCurl":0.44010971185866105,"farHandSplay":-0.9908390059614732,"farHandTilt":0.32591818261079125,"farHandTurn":-0.8215668894509894,"farKneeBend":0,"farThighLift":0.715584993317675,"farUpperArmLift":0.820304748437335,"headNod":-0.010291833989164266,"headSlide":-0.24405169224369802,"headTip":-0.279252680319093,"hipsCant":0,"mouthOpen":-1.27409035395586,"mouthPurse":1.20427718387609,"mouthSmile":1.48352986419518,"mouthGrimace":0.006025301391573963,"mouthSmirk":-0.11785831040371379,"nearEyeInnerLid":-1.18682389135614,"nearEyeOuterLid":-1.85004900711399,"nearEyeLowerLid":1.0471975511966,"nearEyebrowArch":-1.95476876223365,"nearFootPoint":-0.935868670139553,"nearForearmLift":0.436332312998582,"nearHandCurl":0.331612557878923,"nearHandSplay":1.76278254451427,"nearHandTilt":0.715584993317675,"nearHandTurn":3.12413936106985,"nearKneeBend":0.488692190558412,"nearThighLift":-0.715584993317675,"nearUpperArmLift":-0.942477796076938,"phallusErection":0,"shouldersTip":0},
		bolero: {"eyePositionX":-0.471238898038469,"eyePositionY":-0.06458649531074478,"farEyeInnerLid":0,"farEyeOuterLid":0,"farEyeLowerLid":0,"farEyebrowArch":-0.279252680319093,"farFootPoint":-3.14159265358979,"farForearmLift":-2.75762021815104,"farHandCurl":-0.027700606841514493,"farHandSplay":0.08773495650151746,"farHandTilt":0.10315013504130856,"farHandTurn":-0.5834106692657511,"farKneeBend":-1.1693705988362,"farThighLift":1.15191730631626,"farUpperArmLift":2.80998009571087,"headNod":-0.010291833989164266,"headSlide":-0.24405169224369802,"headTip":0,"hipsCant":0,"mouthOpen":-1.76278254451427,"mouthPurse":-0.575958653158129,"mouthSmile":1.13446401379631,"mouthGrimace":0.006025301391573963,"mouthSmirk":-0.11785831040371379,"nearEyeInnerLid":-1.18682389135614,"nearEyeOuterLid":-1.85004900711399,"nearEyeLowerLid":-1.79768912955416,"nearEyebrowArch":-3.14159265358979,"nearFootPoint":-0.935868670139553,"nearForearmLift":-0.331612557878923,"nearHandCurl":0,"nearHandSplay":1.37881010907552,"nearHandTilt":0,"nearHandTurn":3.12413936106985,"nearKneeBend":-0.0035190247333446775,"nearThighLift":0.331612557878923,"nearUpperArmLift":-1.1693705988362,"phallusErection":0,"shouldersTip":0},
	};


	this.biometrics = {};
	for (var i in this.parameters) {
		if (this.parameters[i].curve == 'camel') {
			this.biometrics[i] = 5 * (Math.random() + Math.random() + Math.random())/3;
			if (Math.random() > 0.5) {this.biometrics[i] *= -1;};
		} else {
			this.biometrics[i] = 5 * Math.random();
			if (Math.random() > 0.5) {this.biometrics[i] *= -1;};
		};
	};
	
	this.coloring = {};
	for (i of ['areolaePink','areolaeDark','eyeGreen','eyeBlue','hairBlue','hairGreen','hairRed','lipPink','lipDark','skinBlack','skinBrown','skinPink']) {
		this.coloring[i] = Math.random();
	};
	this.coloring.skinBlack = Math.min(this.coloring.skinBlack,0.7);
	
	this.pose = {};
	for (i of [ "eyePositionX", "eyePositionY", "farEyeInnerLid", "farEyeOuterLid", "farEyeLowerLid", "farEyebrowArch", "farFootPoint", "farForearmLift", "farHandCurl", "farHandSplay", "farHandTilt", "farHandTurn", "farKneeBend", "farThighLift", "farUpperArmLift", "headNod", "headSlide", "headTip", "hipsCant", "mouthOpen", "mouthPurse", "mouthSmile", "mouthGrimace", "mouthSmirk", "nearEyeInnerLid", "nearEyeOuterLid", "nearEyeLowerLid", "nearEyebrowArch", "nearFootPoint", "nearForearmLift", "nearHandCurl", "nearHandSplay", "nearHandTilt", "nearHandTurn", "nearKneeBend", "nearThighLift", "nearUpperArmLift", "phallusErection", "shouldersTip"]) {
		this.pose[i] = Math.random() * Math.random() * Math.random() * Math.PI;
		if (Math.random() > 0.5) {this.pose[i] *= -1;};
		if (i == 'shouldersTip' || i == 'hipsCant' || i == 'headTip') {this.pose[i] /= 4;};
		if (i == 'nearEyeInnerLid' || i == 'nearEyeOuterLid' || i == 'nearEyeLowerLid' || i == 'farEyeInnerLid' || i == 'farEyeOuterLid' || i == 'farEyeLowerLid' ) {this.pose[i] = Math.max(Math.min(this.pose[i]*4,Math.PI),Math.PI*-1);};
	};
	this.pose.nearEyeInnerLid = Math.max(this.pose.nearEyeInnerLid,this.pose.nearEyeOuterLid,this.pose.nearEyeLowerLid);
	this.pose.farEyeInnerLid = Math.max(this.pose.farEyeInnerLid,this.pose.farEyeOuterLid,this.pose.farEyeLowerLid);
	this.pose.nearEyeLowerLid = Math.min(this.pose.farEyeInnerLid,this.pose.farEyeOuterLid,this.pose.farEyeLowerLid);
	this.pose.farEyeLowerLid = Math.min(this.pose.farEyeInnerLid,this.pose.farEyeOuterLid,this.pose.farEyeLowerLid);
	this.pose.nearEyeInnerLid = this.pose.farEyeInnerLid;
	this.pose.nearEyeOuterLid = this.pose.farEyeOuterLid;
	this.pose.nearEyeLowerLid = this.pose.farEyeLowerLid;
	this.pose.mouthOpen = Math.random() * Math.PI*2 - Math.PI;
	this.pose.nearEyebrowArch = Math.random() * Math.PI*2 - Math.PI;
	this.pose.farEyebrowArch = Math.random() * Math.PI*2 - Math.PI;
	
	var pose = Object.keys(this.library);
	pose = pose[Math.random() * pose.length << 0];
	for (var i in this.pose) {
		if (this.library[pose][i] !==undefined) {
			this.pose[i] = this.library[pose][i];
		};
	};
	
	this.clothing = [new MorfologyGarment,new MorfologyGarment,new MorfologyGarment];
	
	this.bio = function(key) {
		var result = this.biometrics[key];
		if (result == undefined) {
			result = 1;
		} else {
			result = Math.pow(this.parameters[key].root,result);
		};
		return result;
	};
	
	this.adjust = function(key,adjustment) {
		var oldValue = this.biometrics[key];
		if (oldValue == undefined) {oldValue = 0};
		this.biometrics[key] = Math.max(-10,Math.min(10,oldValue + adjustment));
		return this.biometrics[key];
	};
	
	this.pos = function(key) {
		var result = this.pose[key];
		if (result == undefined) {
			result = 0;
		};
		return result;
	};
		
	this.morphase = 1;
	this.morphExtreme = false;
	this.turnCount = 101;
	
	this.animate = function() {
		if (Math.random() > 0.95) {
			this.morphase *= -1;
		};
		if (Math.random() > 0.95) {
			this.morphExtreme = !this.morphExtreme;
		};
		for (i in this.biometrics) {
			this.biometrics[i] += (Math.random()*0.3 - 0.1) * this.morphase;
			if (this.morphExtreme) {
				this.biometrics[i] = Math.min(5,this.biometrics[i]);
				this.biometrics[i] = Math.max(-5,this.biometrics[i]);
			};
		};
		this.turnCount += 1;
		if (this.turnCount > 100) {
			this.turnCount = 0;
			var poses = Object.keys(this.library);
			this.targetPose = this.library[poses[Math.random() * poses.length << 0]];
		};
		for (i in this.pose) {
			var poseShift = (Math.random() * 5)/100;
			if (this.targetPose[i] > this.pose[i] + poseShift*2) {
				this.pose[i] += poseShift;
			} else if (this.targetPose[i] < this.pose[i] - poseShift*2) {
				this.pose[i] -= poseShift
			};
		};
		for (i in this.coloring) {
			this.coloring[i] += (Math.random() - 0.5)/100;
			this.coloring[i] = Math.min(1,this.coloring[i]);
			this.coloring[i] = Math.max(0,this.coloring[i]);
		};
	};
	
	this.jiggle = function(iterations) {
		if (iterations == undefined) {iterations = 10};
		for (var iteration=0;iteration<iterations;iteration++) {
			for (i in this.biometrics) {
				this.biometrics[i] += (Math.random()*0.3 - 0.15);
				this.biometrics[i] = Math.min(5,this.biometrics[i]);
				this.biometrics[i] = Math.max(-5,this.biometrics[i]);
			};
			for (i in this.pose) {
				this.pose[i] += (Math.random()*0.1 - 0.05);
				this.pose[i] = Math.min(Math.PI,this.pose[i]);
				this.pose[i] = Math.max(Math.PI*-1,this.pose[i]);
			};
			for (i in this.coloring) {
				this.coloring[i] += (Math.random() - 0.5)/100;
				this.coloring[i] = Math.min(1,this.coloring[i]);
				this.coloring[i] = Math.max(0,this.coloring[i]);
			};
		};
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
		} else if (shot == 'money') {
			moneyShot = svg.getElementById('moneyShot');
			viewBoxString = moneyShot.getAttribute('x') + ' ' + moneyShot.getAttribute('y') + ' ' + moneyShot.getAttribute('width') + ' ' + moneyShot.getAttribute('height');
			svg.setAttribute('viewBox',viewBoxString);
		} else if (shot == 'hand') {
			handShot = svg.getElementById('handShot');
			viewBoxString = handShot.getAttribute('x') + ' ' + handShot.getAttribute('y') + ' ' + handShot.getAttribute('width') + ' ' + handShot.getAttribute('height');
			svg.setAttribute('viewBox',viewBoxString);
		};
		
		return svg;
		
	};
	
	this.svg = function (height) {
			
		// Coloring
		
		if (this.coloring.custom == undefined) {
		
			var skinRed = 255, skinGreen = 237, skinBlue = 220;
			
			var pigmentBlack = Math.max(1 - this.coloring.skinBlack,0.2);
			var pigmentBrown = Math.min(pigmentBlack * (0.5 + (1-this.coloring.skinBrown)*2),0.9);
			var pigmentPink = Math.min(pigmentBlack * (0.5 + (1-this.coloring.skinPink)*2),0.9);
		
			skinRed *= pigmentBlack;
			skinGreen *= pigmentBlack * pigmentPink;
			skinBlue *= pigmentBlack * pigmentBrown * pigmentPink;
			var skinTone = "#" + ("0" + Math.round(skinRed).toString(16)).substr(-2) + ("0" + Math.round(skinGreen).toString(16)).substr(-2) + ("0" + Math.round(skinBlue).toString(16)).substr(-2);	
			
			var areolaePink = (1-this.coloring.areolaePink*0.75);
			var areolaeDark = (1-this.coloring.areolaeDark);
			var areolaeRed = skinRed * areolaeDark;
			var areolaeGreen = skinGreen * areolaePink * areolaeDark;
			var areolaeBlue = skinBlue * areolaePink * areolaeDark;
			var areolaeTone = "#" + ("0" + Math.round(areolaeRed).toString(16)).substr(-2) + ("0" + Math.round(areolaeGreen).toString(16)).substr(-2) + ("0" + Math.round(areolaeBlue).toString(16)).substr(-2);
			
			var lipPink = (1-this.coloring.lipPink);
			var lipDark = (1-this.coloring.lipDark*0.5);
			var lipRed = skinRed * lipDark;
			var lipGreen = skinGreen * lipPink * lipDark;
			var lipBlue = skinBlue * lipPink * lipDark;
			var lipColor = "#" + ("0" + Math.round(lipRed).toString(16)).substr(-2) + ("0" + Math.round(lipGreen).toString(16)).substr(-2) + ("0" + Math.round(lipBlue).toString(16)).substr(-2);

			var mouthRed = skinRed/3;
			var mouthBlue = skinBlue/3;
			var mouthGreen = skinGreen/3;
			var mouthColor = "#" + ("0" + Math.round(mouthRed).toString(16)).substr(-2) + ("0" + Math.round(mouthGreen).toString(16)).substr(-2) + ("0" + Math.round(mouthBlue).toString(16)).substr(-2);	

			var eyeRed = 255, eyeGreen = 255, eyeBlue = 255;
			var eyePigmentGreen = 1-this.coloring.eyeGreen;
			var eyePigmentBlue = 1-this.coloring.eyeBlue;
			eyeRed *= eyePigmentGreen * eyePigmentBlue;
			eyeBlue *= eyePigmentGreen;
			eyeGreen *= eyePigmentBlue;
			var eyeColor = "#" + ("0" + Math.round(eyeRed).toString(16)).substr(-2) + ("0" + Math.round(eyeGreen).toString(16)).substr(-2) + ("0" + Math.round(eyeBlue).toString(16)).substr(-2);

			var hairRed = this.coloring.hairRed * 255;
			var hairGreen = this.coloring.hairGreen * 255;
			var hairBlue = this.coloring.hairBlue * 255;
			var hairColor = "#" + ("0" + Math.round(hairRed).toString(16)).substr(-2) + ("0" + Math.round(hairGreen).toString(16)).substr(-2) + ("0" + Math.round(hairBlue).toString(16)).substr(-2);

			var nailRed = (255+skinRed)/2;
			var nailGreen = (255+skinGreen)/2;
			var nailBlue = (255+skinBlue)/2;
			var nailColor = "#" + ("0" + Math.round(nailRed).toString(16)).substr(-2) + ("0" + Math.round(nailGreen).toString(16)).substr(-2) + ("0" + Math.round(nailBlue).toString(16)).substr(-2);

		} else {
			var skinTone = this.coloring.custom.skinTone;
			var areolaeTone = this.coloring.custom.areolaeTone;
			var lipColor = this.coloring.custom.lipTone;
			var mouthColor = this.coloring.custom.mouthColor;
			var eyeColor = this.coloring.custom.eyeColor;
			var hairColor = this.coloring.custom.hairColor;
			var nailColor = this.coloring.custom.nailColor;
		};
		
	
		var svg = document.createElementNS('http://www.w3.org/2000/svg','g');
		
		var defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
		svg.appendChild(defs);
		
// 		var filter =  document.createElementNS('http://www.w3.org/2000/svg','filter');
// 		filter.id = 'noiseFilter';
// 		defs.appendChild(filter);
// 		var noiseFilter = document.createElementNS('http://www.w3.org/2000/svg','feTurbulence');
// 		filter.appendChild(noiseFilter);
// 		noiseFilter.setAttribute('result','noise');
// 		noiseFilter.setAttribute('type','fractalNoise');
// 		noiseFilter.setAttribute('baseFrequency',1);
// 		var colorMatrix = document.createElementNS('http://www.w3.org/2000/svg','feColorMatrix');
// 		filter.appendChild(colorMatrix);
// 		colorMatrix.setAttribute('type','matrix');
// 		colorMatrix.setAttribute('values','0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.2 1.1');
// 		var blackFill = document.createElementNS('http://www.w3.org/2000/svg','feFlood');
// 		blackFill.setAttribute('flood-color','black');
// 		blackFill.setAttribute('result','silhouette');
// 		var composite = document.createElementNS('http://www.w3.org/2000/svg','feComposite');
// 		filter.appendChild(composite);
// 		composite.setAttribute('in','silhouette');
// 		composite.setAttribute('in2','SourceGraphic');
// 		composite.setAttribute('operator','in');
		
// 		var displacementMap = document.createElementNS('http://www.w3.org/2000/svg','feDisplacementMap');
// 		filter.appendChild(displacementMap);
// 		displacementMap.setAttribute('in','SourceGraphic');
// 		displacementMap.setAttribute('in2','noise');
// 		displacementMap.setAttribute('scale',9);
				
		var shadow = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
		svg.appendChild(shadow);
		shadow.setAttribute('x',0);
		shadow.setAttribute('y',0);
		shadow.setAttribute('rx',100);
		shadow.setAttribute('ry',20);
		shadow.setAttribute('fill','lightgrey');
				
		// Height Proportions
		var headHeightProportion = this.bio('headHeight')*0.2;
		var neckHeightProportion = this.bio('neckHeight')*0.03;
		var torsoHeightProportion = this.bio('torsoHeight')*0.3;
		var legHeightProportion = this.bio('legHeight')*0.57;
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
		var headWidth = 0.7 * headHeight * this.bio('headWidth');
		var shouldersWidth = 0.22 * totalHeight * this.bio('shouldersWidth');
		var hipsWidth = 0.15 * totalHeight * this.bio('hipsWidth');
		var armLength = 0.4 * totalHeight * this.bio('armLength');
		var upperArmLength = 0.5 * armLength;
		var forearmLength = 0.5 * armLength;
		var thighLength = 0.5 * legHeight;
		var calfLength = 0.5 * legHeight;
		var footLength = 0.12 * totalHeight * this.bio('footLength');
		var nearLegHeight = Math.sin(this.pos('hipsCant')) * hipsWidth/2 + Math.max(0,Math.cos(this.pos('nearThighLift')) * thighLength) + Math.max(0,Math.cos(this.pos('nearKneeBend')) * calfLength);
		var farLegHeight = Math.sin(this.pos('hipsCant')) * hipsWidth/-2 + Math.max(0,Math.cos(this.pos('farThighLift')) * thighLength) + Math.max(0,Math.cos(this.pos('farKneeBend')) * calfLength);
		var pelvisHeight = Math.max(nearLegHeight,farLegHeight) * -1;
		var shouldersHeight = pelvisHeight - torsoHeight;
		var headCenter = {x:0,y:shouldersHeight - neckHeight - headHeight/2};
		var calfWidth = this.bio('calfWidth') * 40;
		var thighWidth = this.bio('thighWidth') * 50;
		var buttSize = this.bio('buttSize')*20;
		var breastSize = this.bio('breastSize') * 20;
		var haunchWidth = this.bio('hipsWidth') * 30;
		var lipSize = this.bio('lipSize') * 3;
		var browSize = this.bio('browSize')*3
		var phallusLength = this.bio('phallusLength') * 5;
		var phallusGirth = this.bio('phallusGirth') * phallusLength * 0.15;
		var glansSize = this.bio('glansSize') * phallusGirth;
		var labioscrotalSize = this.bio('labioscrotalSize') * hipsWidth/4;
				
		// Orientation
		var upperBodyAngle ;
		if (this.pos('farUpperArmLift') >= 0 && this.pos('nearUpperArmLift') >= 0) {
			upperBodyAngle = true;
		} else if (this.pos('farUpperArmLift') <= 0 && this.pos('nearUpperArmLift') <= 0) {
			upperBodyAngle = false;
		} else if (this.pos('farUpperArmLift') >= 0 && this.pos('nearUpperArmLift') <= 0 && Math.abs(this.pos('farUpperArmLift')) > Math.abs(this.pos('nearUpperArmLift')) ) {
			upperBodyAngle = true;
		} else {
			upperBodyAngle = false;
		};
		var torsoFacing;
		if (upperBodyAngle) {
			torsoFacing = 1;
		} else {
			torsoFacing = -1;
		};
		var lowerBodyAngle ;
		if (this.pos('farThighLift') > 0 && this.pos('nearThighLift') > 0) {
			lowerBodyAngle = true;
		} else if (this.pos('farThighLift') < 0 && this.pos('nearThighLift') < 0) {
			lowerBodyAngle = false;
		} else if (this.pos('farThighLift') > 0 && this.pos('nearThighLift') < 0 && Math.abs(this.pos('farThighLift')) > Math.abs(this.pos('nearThighLift')) ) {
			lowerBodyAngle = true;
		} else {
			lowerBodyAngle = false;
		};
		var pelvisFacing;
		if (lowerBodyAngle) {
			pelvisFacing = 1;
		} else {
			pelvisFacing = -1;
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
			x:Math.cos(this.pos('hipsCant'))*hipsWidth/-2,
			y:pelvisHeight + Math.sin(this.pos('hipsCant'))*hipsWidth/2,
		};
		var nearKnee = {
			x: nearHip.x + Math.sin(this.pos('nearThighLift'))*thighLength,
			y: nearHip.y + Math.cos(this.pos('nearThighLift'))*thighLength,
		};
		var nearAnkle = {
			x: nearKnee.x + Math.sin(this.pos('nearKneeBend'))*calfLength,
			y: nearKnee.y + Math.cos(this.pos('nearKneeBend'))*calfLength,
		};
		var farHip = {
			x:Math.cos(this.pos('hipsCant'))*hipsWidth/2,
			y:pelvisHeight - Math.sin(this.pos('hipsCant'))*hipsWidth/2,
		};
		var farKnee = {
			x: farHip.x + Math.sin(this.pos('farThighLift'))*thighLength,
			y: farHip.y + Math.cos(this.pos('farThighLift'))*thighLength,
		};
		var farAnkle = {
			x: farKnee.x + Math.sin(this.pos('farKneeBend'))*calfLength,
			y: farKnee.y + Math.cos(this.pos('farKneeBend'))*calfLength,
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
			x:Math.cos(this.pos('shouldersTip'))*shouldersWidth/-2,
			y:shouldersHeight + Math.sin(this.pos('shouldersTip'))*shouldersWidth/2,
		};
		var nearElbow = {
			x: nearShoulder.x + Math.sin(this.pos('nearUpperArmLift'))*upperArmLength,
			y: nearShoulder.y + Math.cos(this.pos('nearUpperArmLift'))*upperArmLength,
		};
		var nearWrist = {
			x: nearElbow.x + Math.sin(this.pos('nearForearmLift'))*forearmLength,
			y: nearElbow.y + Math.cos(this.pos('nearForearmLift'))*forearmLength,
		};
		var farShoulder = {
			x:Math.cos(this.pos('shouldersTip'))*shouldersWidth/2,
			y:shouldersHeight - Math.sin(this.pos('shouldersTip'))*shouldersWidth/2,
		};
		var farElbow = {
			x: farShoulder.x + Math.sin(this.pos('farUpperArmLift'))*upperArmLength,
			y: farShoulder.y + Math.cos(this.pos('farUpperArmLift'))*upperArmLength,
		};
		var farWrist = {
			x: farElbow.x + Math.sin(this.pos('farForearmLift'))*forearmLength,
			y: farElbow.y + Math.cos(this.pos('farForearmLift'))*forearmLength,
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
		var nippleLength = this.bio('nippleLength') * 4;
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


		var facing, headFacing;
		if (upperBodyAngle) {
			facing = 12;
			headFacing = 1;
		} else {
			facing = -12;
			headFacing = -1;
		};
		var headTilt = this.pos('headTip') * 180/Math.PI;
		var headSlide = this.pos('headSlide') * 20/Math.PI;
// 		var nodOffset = 10*this.pos('headNod')/Math.PI
		var nodOffset = 0;
		var eyeSize = this.bio('eyeSize') * 8;
		var eyeDistance = this.bio('eyeDistance') * headWidth/5;
		var nearEyeCenter = {
			x: headCenter.x+facing-eyeDistance,
			y: headCenter.y+nodOffset,
		};
		var farEyeCenter = {
			x: headCenter.x+facing+eyeDistance,
			y: headCenter.y+nodOffset,
		};
		var noseFacing = 1;
		if (facing < 0) {
			noseFacing = -1;
		};
		var noseWidth = this.bio('noseWidth')*4;
		var noseLength = this.bio('noseLength')*facing*0.2;
		var noseHeight = this.bio('noseHeight')*headHeight/4;
		var noseCenter = {
			x: headCenter.x+facing*headWidth/50+noseLength,
			y: headCenter.y-noseWidth+nodOffset+noseHeight,
		};
		var noseBaseCenter = {
			x:headCenter.x+facing,
			y:headCenter.y+headHeight/4-noseWidth+nodOffset,
		};
		var noseBridge = {
			x: headCenter.x+facing,
			y: headCenter.y+nodOffset,
		};
		var cheekboneSize = this.bio('cheekboneSize')*3;
		var nearCheekbone = {
			x: nearEyeCenter.x-eyeSize - this.bio('cheekboneWidth')*3,
			y: nearEyeCenter.y + headHeight/12 + this.bio('cheekboneHeight')*5,
		};
		var farCheekbone = {
			x: farEyeCenter.x+eyeSize + this.bio('cheekboneWidth')*3,
			y: farEyeCenter.y + headHeight/12 + this.bio('cheekboneHeight')*5,
		};
		var mouthHeight = 5*(this.pos('mouthOpen') + Math.PI)/Math.PI;
		var topOfMouth = {
			x: headCenter.x + facing*1.2,
			y: headCenter.y + headHeight/3+nodOffset,
		};
		var chin = {
			x: topOfMouth.x,
			y: topOfMouth.y + mouthHeight + headHeight/8,
		};
		var nearEarCenter = {
			x: headCenter.x-headWidth*0.4,
			y: headCenter.y,
		};
		var farEarCenter = {
			x: headCenter.x+headWidth*0.4,
			y: headCenter.y,
		};
		var nearJawbone = {
			x: headCenter.x-headWidth*0.3,
			y: headCenter.y+headHeight*0.2,
		};
		var farJawbone = {
			x: headCenter.x+headWidth*0.3,
			y: headCenter.y+headHeight*0.2,
		};
		var templeSize = this.bio('templeSize')*5;
		var nearTemple = {
			x: nearEyeCenter.x-eyeSize - this.bio('templeWidth')*2,
			y: nearEyeCenter.y - this.bio('templeHeight')*5,
		};
		var farTemple = {
			x: farEyeCenter.x + eyeSize + this.bio('templeWidth')*2,
			y: farEyeCenter.y - this.bio('templeHeight')*5,
		};
		var mouthPurse = headWidth*0.04 + headWidth*0.04*(this.pos('mouthPurse') + Math.PI)/Math.PI;
		var mouthSmile = (1+this.pos('mouthSmile')/Math.PI)/4;
		var mouthGrimace = (this.pos('mouthGrimace')/Math.PI)*headHeight/60;
		
		var genitalsFacing = -1;
		if (lowerBodyAngle) {
			genitalsFacing = 1;
		};
		var genitalsTop = {
			x: 0 + genitalsFacing*10,
			y: pelvisHeight,
		};
		var genitalsBottom = {
			x: 0,
			y: pelvisHeight + hipsWidth*0.4,
		};
		var erectionAngle = Math.min(Math.max(this.pos('phallusErection'),Math.PI * 0.2),Math.PI*0.8);
		var phallusTip = {
			x: genitalsTop.x + genitalsFacing * Math.sin(erectionAngle) * phallusLength,
			y: genitalsTop.y + Math.cos(erectionAngle) * phallusLength,
		};
		
		var neckWidth = this.bio('neckWidth')*1.4;
		var nearNeck = {
			x:neckWidth*neckBase.x + farShoulder.x*(1-neckWidth),
			y:neckWidth*neckBase.y + farShoulder.y*(1-neckWidth) - neckHeight/2,
		};
		var farNeck = {
			x:neckWidth*neckBase.x + nearShoulder.x*(1-neckWidth),
			y:neckWidth*neckBase.y + nearShoulder.y*(1-neckWidth) - neckHeight/2,
		};

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
			y:shouldersHeight+torsoHeight*0.9 + Math.max(bellySize-40,0),
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
		var buttLift = buttSize - this.bio('hipsWidth')*30;
		if (lowerBodyAngle) {
			var buttSway = buttSize*-0.5;
		} else {
			var buttSway = buttSize*0.5;
		};

		
		// Shapes
		
		var hairBack = document.createElementNS('http://www.w3.org/2000/svg','g');
		hairBack.id = 'hairBack_'+this.id;
		hairBack.setAttribute('fill',hairColor);
		hairBack.setAttribute('transform','translate('+headSlide+',0) rotate('+headTilt+','+headCenter.x+','+headCenter.y+')');
		
		var butt = document.createElementNS('http://www.w3.org/2000/svg','g');
		butt.id = 'butt_'+this.id;
		butt.setAttribute('fill',skinTone);
		butt.setAttribute('stroke','inherit');
		var nearButtock = document.createElementNS('http://www.w3.org/2000/svg','circle');
		butt.appendChild(nearButtock);
		nearButtock.setAttribute('cx',(3*nearHip.x+spineBase.x)/4 + buttSway);
		nearButtock.setAttribute('cy',(3*nearHip.y+spineBase.y)/4 - buttLift);
		nearButtock.setAttribute('r',buttSize);
		var farButtock = document.createElementNS('http://www.w3.org/2000/svg','circle');
		butt.appendChild(farButtock);
		farButtock.setAttribute('cx',(3*farHip.x+spineBase.x)/4 + buttSway);
		farButtock.setAttribute('cy',(3*farHip.y+spineBase.y)/4 - buttLift);
		farButtock.setAttribute('r',buttSize);
		
		var farCalf = document.createElementNS('http://www.w3.org/2000/svg','g');
		farCalf.id = 'farCalf_'+this.id;
		farCalf.setAttribute('fill',skinTone);
		farCalf.setAttribute('stroke','inherit');
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farCalf.appendChild(rect);
		rect.setAttribute('x',(farKnee.x+farKnee.x+farAnkle.x)/3-calfWidth * 0.5);
		rect.setAttribute('y',(farKnee.y+farKnee.y+farAnkle.y)/3-calfLength/3);
		rect.setAttribute('height',0.66 * calfLength);
		rect.setAttribute('width',calfWidth);
		rect.setAttribute('rx',calfWidth*0.5);
		rect.setAttribute('ry',calfLength/2);
		tilt = this.pos('farKneeBend') * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(farKnee.x+farKnee.x+farAnkle.x)/3+' '+(farKnee.y+farKnee.y+farAnkle.y)/3+')');
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farCalf.appendChild(rect);
		rect.setAttribute('x',(farKnee.x+farAnkle.x)/2-calfWidth * 0.25);
		rect.setAttribute('y',(farKnee.y+farAnkle.y)/2-calfLength/2);
		rect.setAttribute('height',calfLength);
		rect.setAttribute('width',calfWidth * 0.5);
		rect.setAttribute('rx',calfWidth * 5);
		rect.setAttribute('ry',calfLength);
		tilt = this.pos('farKneeBend') * -180/Math.PI;
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
		circle.setAttribute('r',thighWidth * 0.3);
		
		var nearCalf = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearCalf.id = 'nearCalf_'+this.id;
		nearCalf.setAttribute('fill',skinTone);
		nearCalf.setAttribute('stroke','inherit');
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearCalf.appendChild(rect);
		rect.setAttribute('x',(nearKnee.x+nearKnee.x+nearAnkle.x)/3-calfWidth*0.5);
		rect.setAttribute('y',(nearKnee.y+nearKnee.y+nearAnkle.y)/3-calfLength/3);
		rect.setAttribute('height',0.66 * calfLength);
		rect.setAttribute('width',calfWidth);
		rect.setAttribute('rx',calfWidth * 0.5);
		rect.setAttribute('ry',calfLength/2);
		tilt = this.pos('nearKneeBend') * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(nearKnee.x+nearKnee.x+nearAnkle.x)/3+' '+(nearKnee.y+nearKnee.y+nearAnkle.y)/3+')');
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearCalf.appendChild(rect);
		rect.setAttribute('x',(nearKnee.x+nearAnkle.x)/2-calfWidth * 0.25);
		rect.setAttribute('y',(nearKnee.y+nearAnkle.y)/2-calfLength/2);
		rect.setAttribute('height',calfLength);
		rect.setAttribute('width',calfWidth * 0.5);
		rect.setAttribute('rx',calfWidth * 5);
		rect.setAttribute('ry',calfLength);
		tilt = this.pos('nearKneeBend') * -180/Math.PI;
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
		circle.setAttribute('r',thighWidth * 0.3);
		
		var farThigh = document.createElementNS('http://www.w3.org/2000/svg','g');
		farThigh.id = 'farThigh_'+this.id;
		farThigh.setAttribute('fill',skinTone);
		farThigh.setAttribute('stroke','inherit');
		tilt = this.pos('farThighLift') * -180/Math.PI;
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farThigh.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',farHip.x);
		circle.setAttribute('cy',farHip.y);
		circle.setAttribute('r',thighWidth*0.25);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farThigh.appendChild(rect);
		rect.setAttribute('x',farHip.x-thighWidth * 0.5 * 0.75);
		rect.setAttribute('y',farHip.y);
		rect.setAttribute('height',thighLength);
		rect.setAttribute('width',thighWidth * 0.75);
		rect.setAttribute('rx',thighWidth * 0.25);
		rect.setAttribute('ry',thighLength/2);
		rect.setAttribute('transform','rotate('+tilt+' '+farHip.x+' '+farHip.y+')');
		var farHamstring = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farThigh.appendChild(farHamstring);
		farHamstring.id = 'farHamstring';
		farHamstring.setAttribute('x',farHip.x-thighWidth * 0.5 - thighWidth * 0.16 * pelvisFacing);
		farHamstring.setAttribute('y',farHip.y - thighWidth*0.5);
		farHamstring.setAttribute('height',thighLength*0.66+thighWidth*0.5);
		farHamstring.setAttribute('width',thighWidth);
		farHamstring.setAttribute('rx',thighWidth);
		farHamstring.setAttribute('ry',thighLength/2);
		farHamstring.setAttribute('transform','rotate('+tilt+' '+farHip.x+' '+farHip.y+')');
		if (!lowerBodyAngle) {
			var hipBlock = document.createElementNS('http://www.w3.org/2000/svg','circle');
			farThigh.appendChild(hipBlock);
			hipBlock.setAttribute('stroke','none');
			hipBlock.setAttribute('cx',farHip.x-thighWidth*0.1);
			hipBlock.setAttribute('cy',farHip.y-thighWidth*0.2);
			hipBlock.setAttribute('r',thighWidth * 0.25);
		} else {
			farThigh.appendChild(farButtock);
		};
		var knee = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farThigh.appendChild(knee);
		knee.setAttribute('stroke','none');
		knee.setAttribute('cx',farKnee.x);
		knee.setAttribute('cy',farKnee.y);
		knee.setAttribute('r',thighWidth * 0.3);
		
		var nearThigh = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearThigh.id = 'nearThigh_'+this.id;
		nearThigh.setAttribute('fill',skinTone);
		nearThigh.setAttribute('stroke','inherit');
		tilt = this.pos('nearThighLift') * -180/Math.PI;
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearThigh.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',nearHip.x);
		circle.setAttribute('cy',nearHip.y);
		circle.setAttribute('r',thighWidth*0.25);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearThigh.appendChild(rect);
		rect.setAttribute('x',nearHip.x-thighWidth * 0.5 * 0.75);
		rect.setAttribute('y',nearHip.y);
		rect.setAttribute('height',thighLength);
		rect.setAttribute('width',thighWidth * 0.75);
		rect.setAttribute('rx',thighWidth * 0.25);
		rect.setAttribute('ry',thighLength/2);
		rect.setAttribute('transform','rotate('+tilt+' '+nearHip.x+' '+nearHip.y+')');
		var nearHamstring = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearThigh.appendChild(nearHamstring);
		nearHamstring.id = 'nearHamstring';
		nearHamstring.setAttribute('x',nearHip.x-thighWidth * 0.5 - thighWidth * 0.16 * pelvisFacing);
		nearHamstring.setAttribute('y',nearHip.y - thighWidth*0.5);
		nearHamstring.setAttribute('height',thighLength*0.66+thighWidth*0.5);
		nearHamstring.setAttribute('width',thighWidth);
		nearHamstring.setAttribute('rx',thighWidth);
		nearHamstring.setAttribute('ry',thighLength/2);
		nearHamstring.setAttribute('transform','rotate('+tilt+' '+nearHip.x+' '+nearHip.y+')');
		if (lowerBodyAngle) {
			var hipBlock = document.createElementNS('http://www.w3.org/2000/svg','circle');
			nearThigh.appendChild(hipBlock);
			hipBlock.setAttribute('stroke','none');
			hipBlock.setAttribute('cx',nearHip.x+thighWidth*0.1);
			hipBlock.setAttribute('cy',nearHip.y-thighWidth*0.2);
			hipBlock.setAttribute('r',thighWidth * 0.25);
		} else {
			nearThigh.appendChild(nearButtock);			
		};
		var knee = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearThigh.appendChild(knee);
		knee.setAttribute('stroke','none');
		knee.setAttribute('cx',nearKnee.x);
		knee.setAttribute('cy',nearKnee.y);
		knee.setAttribute('r',thighWidth * 0.3);
		
		var armWidth = this.bio('armWidth') * 15;	
		var tricepWidth = this.bio('bicep') * 10 ;
		var bicepWidth = this.bio('bicep') * 10 ;
		var farBicepFlex = 2 - Math.pow(Math.pow(farWrist.x - farShoulder.x,2)+Math.pow(farWrist.y - farShoulder.y,2),.5) / (upperArmLength + forearmLength);
		var farTricepFlex = (1 + Math.abs(this.pos('farUpperArmLift'))) / 2;
		var farBicepPosition = (this.pos('farForearmLift') - this.pos('farUpperArmLift'))/Math.PI;
		if (farBicepPosition > 1) {farBicepPosition = 1 - farBicepPosition;};
		if (farBicepPosition < -1) {farBicepPosition = 2 + farBicepPosition;};
		var nearBicepFlex = 2 - Math.pow(Math.pow(nearWrist.x - nearShoulder.x,2)+Math.pow(nearWrist.y - nearShoulder.y,2),.5) / (upperArmLength + forearmLength);
		var nearTricepFlex = (1 + Math.abs(this.pos('nearUpperArmLift'))) / 2;
		var nearBicepPosition = (this.pos('nearForearmLift') - this.pos('nearUpperArmLift'))/Math.PI;
		if (nearBicepPosition > 1) {nearBicepPosition = 1 - nearBicepPosition;};
		if (nearBicepPosition < -1) {nearBicepPosition = 2 + nearBicepPosition;};
		var shoulderWidth = armWidth*0.75;
		
		var farUpperArm = document.createElementNS('http://www.w3.org/2000/svg','g');
		farUpperArm.id = 'farUpperArm_'+this.id;
		farUpperArm.setAttribute('fill',skinTone);
		farUpperArm.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farUpperArm.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',farShoulder.x);
		circle.setAttribute('cy',farShoulder.y);
		circle.setAttribute('r',shoulderWidth);
		var arm = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farUpperArm.appendChild(arm);
		arm.setAttribute('x',(farShoulder.x+farElbow.x)/2-armWidth);
		arm.setAttribute('y',(farShoulder.y+farElbow.y)/2-upperArmLength/2);
		arm.setAttribute('height',upperArmLength * 1.05);
		arm.setAttribute('width',armWidth*2);
		arm.setAttribute('rx',armWidth);
		arm.setAttribute('ry',upperArmLength);
		tilt = this.pos('farUpperArmLift') * -180/Math.PI;
		arm.setAttribute('transform','rotate('+tilt+' '+(farShoulder.x+farElbow.x)/2+' '+(farShoulder.y+farElbow.y)/2+')');
		var tricep = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farUpperArm.appendChild(tricep);
		tricep.setAttribute('x',farShoulder.x + 0.25*armWidth/farTricepFlex);
		tricep.setAttribute('y',farShoulder.y - armWidth*0.5);
		tricep.setAttribute('height',0.5 * upperArmLength / farTricepFlex);
		tricep.setAttribute('width',tricepWidth * farTricepFlex);
		tricep.setAttribute('rx',tricepWidth*1.33);
		tricep.setAttribute('ry',0.3 * upperArmLength);
		tilt = this.pos('farUpperArmLift') * -180/Math.PI;
		tricep.setAttribute('transform','rotate('+tilt+' '+farShoulder.x+' '+farShoulder.y+')');
		var bicep = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farUpperArm.appendChild(bicep);
		bicep.setAttribute('x',farShoulder.x - (0.5*bicepWidth * farBicepFlex) + farBicepPosition*armWidth*0.5);
		bicep.setAttribute('y',farShoulder.y + upperArmLength*0.5);
		bicep.setAttribute('height',0.5 * upperArmLength );
		bicep.setAttribute('width',bicepWidth * farBicepFlex);
		bicep.setAttribute('rx',bicepWidth*1.33);
		bicep.setAttribute('ry',upperArmLength);
		tilt = this.pos('farUpperArmLift') * -180/Math.PI;
		bicep.setAttribute('transform','rotate('+tilt+' '+farShoulder.x+' '+farShoulder.y+')');

		var nearUpperArm = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearUpperArm.id = 'nearUpperArm_'+this.id;
		nearUpperArm.setAttribute('fill',skinTone);
		nearUpperArm.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearUpperArm.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',nearShoulder.x);
		circle.setAttribute('cy',nearShoulder.y);
		circle.setAttribute('r',shoulderWidth);
		var arm = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearUpperArm.appendChild(arm);
		arm.setAttribute('x',(nearShoulder.x+nearElbow.x)/2-armWidth);
		arm.setAttribute('y',(nearShoulder.y+nearElbow.y)/2-upperArmLength/2);
		arm.setAttribute('height',upperArmLength * 1.05);
		arm.setAttribute('width',armWidth*2);
		arm.setAttribute('rx',armWidth);
		arm.setAttribute('ry',upperArmLength);
		tilt = this.pos('nearUpperArmLift') * -180/Math.PI;
		arm.setAttribute('transform','rotate('+tilt+' '+(nearShoulder.x+nearElbow.x)/2+' '+(nearShoulder.y+nearElbow.y)/2+')');
		var tricep = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearUpperArm.appendChild(tricep);
		tricep.setAttribute('x',nearShoulder.x - 0.25*armWidth/nearTricepFlex - tricepWidth*nearTricepFlex);
		tricep.setAttribute('y',nearShoulder.y - armWidth*0.5);
		tricep.setAttribute('height',0.5 * upperArmLength / nearTricepFlex);
		tricep.setAttribute('width',tricepWidth * nearTricepFlex);
		tricep.setAttribute('rx',tricepWidth*1.33);
		tricep.setAttribute('ry',0.3 * upperArmLength);
		tilt = this.pos('nearUpperArmLift') * -180/Math.PI;
		tricep.setAttribute('transform','rotate('+tilt+' '+nearShoulder.x+' '+nearShoulder.y+')');
		var bicep = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearUpperArm.appendChild(bicep);
		bicep.setAttribute('x',nearShoulder.x - (0.5*bicepWidth * nearBicepFlex) + nearBicepPosition*armWidth*0.5);
		bicep.setAttribute('y',nearShoulder.y + upperArmLength*0.5);
		bicep.setAttribute('height',0.5 * upperArmLength );
		bicep.setAttribute('width',bicepWidth * nearBicepFlex);
		bicep.setAttribute('rx',bicepWidth*1.33);
		bicep.setAttribute('ry',upperArmLength);
		tilt = this.pos('nearUpperArmLift') * -180/Math.PI;
		bicep.setAttribute('transform','rotate('+tilt+' '+nearShoulder.x+' '+nearShoulder.y+')');		

		var handLength = this.bio('handLength')*30;
		var handWidth = this.bio('handWidth') * handLength * 0.8;
		var nearHandTilt = this.pos('nearHandTilt') * -180/Math.PI;
		
		var farLowerArm = document.createElementNS('http://www.w3.org/2000/svg','g');
		farLowerArm.id = 'farLowerArm_'+this.id;
		farLowerArm.setAttribute('fill',skinTone);
		farLowerArm.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farLowerArm.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',farElbow.x);
		circle.setAttribute('cy',farElbow.y);
		circle.setAttribute('r',7 * this.bio('armWidth'));
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farLowerArm.appendChild(rect);
		rect.setAttribute('x',(farElbow.x+farWrist.x)/2-this.bio('armWidth') * 10);
		rect.setAttribute('y',(farElbow.y+farWrist.y)/2-forearmLength/1.8);
		rect.setAttribute('height',forearmLength * 1);
		rect.setAttribute('width',this.bio('armWidth') * 20);
		rect.setAttribute('rx',this.bio('armWidth') * 20);
		rect.setAttribute('ry',forearmLength);
		tilt = this.pos('farForearmLift') * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(farElbow.x+farWrist.x)/2+' '+(farElbow.y+farWrist.y)/2+')');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farLowerArm.appendChild(circle);
// 		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',farWrist.x);
		circle.setAttribute('cy',farWrist.y);
		circle.setAttribute('r',handWidth*0.33);

		var nearLowerArm = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearLowerArm.id = 'nearLowerArm_'+this.id;
		nearLowerArm.setAttribute('fill',skinTone);
		nearLowerArm.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearLowerArm.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',nearElbow.x);
		circle.setAttribute('cy',nearElbow.y);
		circle.setAttribute('r',7 * this.bio('armWidth'));
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearLowerArm.appendChild(rect);
		rect.setAttribute('x',(nearElbow.x+nearWrist.x)/2-this.bio('armWidth') * 10);
		rect.setAttribute('y',(nearElbow.y+nearWrist.y)/2-forearmLength/1.8);
		rect.setAttribute('height',forearmLength * 1.1);
		rect.setAttribute('width',this.bio('armWidth') * 20);
		rect.setAttribute('rx',this.bio('armWidth') * 20);
		rect.setAttribute('ry',forearmLength);
		tilt = this.pos('nearForearmLift') * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(nearElbow.x+nearWrist.x)/2+' '+(nearElbow.y+nearWrist.y)/2+')');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearLowerArm.appendChild(circle);
// 		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',nearWrist.x);
		circle.setAttribute('cy',nearWrist.y);
		circle.setAttribute('r',handWidth*0.25);
		
		var nearHandTurnDX = Math.sin(this.pos('nearHandTurn')/Math.PI);
		var nearHandCurl = 0.5 * Math.abs(this.pos('nearHandCurl') * 180 / Math.PI) * -1;
		var nearNailRoll = Math.abs(this.pos('nearHandCurl'));

		var nearHand = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearHand.id = 'nearHand_'+this.id;
		nearHand.setAttribute('fill',skinTone);
		nearHand.setAttribute('stroke','inherit');
		var nearPalm = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearHand.appendChild(nearPalm);
		var palmTurnDX = nearHandTurnDX;
		x = nearWrist.x - handWidth * 0.35*palmTurnDX;
		y = nearWrist.y;
		d = 'M '+x+','+y+' ';
		c1x = x + handWidth * 0.1*palmTurnDX;
		c1y = y - handLength * 0.1;
		x = x + handWidth * 0.7*palmTurnDX;
		y = y;
		c2x = x - handWidth * 0.1*palmTurnDX;
		c2y = y - handLength * 0.1;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x + handWidth * 0.1*palmTurnDX;
		c1y = y + handLength * 0.1;
		x = x;
		y = y + handLength;
		c2x = x + handWidth * 0.1*palmTurnDX;
		c2y = y - handLength * 0.1;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x - handWidth * 0.1*palmTurnDX;
		c1y = y + handLength * 0.1;
		x = x - handWidth*palmTurnDX;
		y = y - handLength * 0.1;
		c2x = x + handWidth * 0.1*palmTurnDX;
		c2y = y + handLength * 0.1;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x - handWidth * 0.1*palmTurnDX;
		c1y = y - handLength * 0.1;
		x = x + handWidth * 0.3*palmTurnDX;
		y = y - handLength * 0.9;
		c2x = x - handWidth * 0.1*palmTurnDX;
		c2y = y + handLength * 0.1;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		d += ' z';
		nearPalm.setAttribute('d',d);
		var nearPalmSide = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearHand.appendChild(nearPalmSide);
		x = nearWrist.x - handWidth * 0.25;
		y = nearWrist.y;
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y + handLength * 0.5;
		x = x + handWidth *0.2;
		y = y + handLength;
		c2x = x - handWidth * 0.1;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x + handWidth * 0.1;
		c1y = y;
		x = x + handWidth *0.3;
		y = y - handLength;
		c2x = x;
		c2y = y + handLength * 0.5;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';		
		nearPalmSide.setAttribute('d',d);
		nearHand.setAttribute('transform','rotate('+nearHandTilt+' '+nearWrist.x+' '+nearWrist.y+')');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearHand.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',nearWrist.x);
		circle.setAttribute('cy',nearWrist.y);
		circle.setAttribute('r',handWidth*0.25);
		var nearThumb = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearThumb.id = 'nearThumb'+this.id;
		nearThumb.setAttribute('fill',skinTone);
		nearThumb.setAttribute('stroke','inherit');
		nearThumb.setAttribute('transform','rotate('+nearHandTilt+' '+nearWrist.x+' '+nearWrist.y+')');
		var nearThumbProximal = {
			x: nearWrist.x+handWidth*0.3*nearHandTurnDX,
			y: nearWrist.y+handLength*0.2,
			length: handLength*0.7,
		};
		var thumbProximal = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearThumb.appendChild(thumbProximal);
		thumbProximal.setAttribute('x',nearThumbProximal.x-handWidth*0.15);
		thumbProximal.setAttribute('y',nearThumbProximal.y);
		thumbProximal.setAttribute('height',nearThumbProximal.length);
		thumbProximal.setAttribute('width',handWidth*0.3);
		thumbProximal.setAttribute('rx',handWidth*0.1);
		thumbProximal.setAttribute('ry',handLength*0.5);
		var tilt = -15 - 60*Math.max(0,this.pos('nearHandSplay'))/Math.PI;
		thumbProximal.setAttribute('transform','rotate('+(tilt*nearHandTurnDX)+' '+nearThumbProximal.x+' '+nearThumbProximal.y+')');
		var thumbDistal = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearThumb.appendChild(thumbDistal);
		phalange = {
			x: nearThumbProximal.x - Math.sin((tilt*nearHandTurnDX) * Math.PI / 180) * nearThumbProximal.length,
			y: nearThumbProximal.y + Math.cos((tilt*nearHandTurnDX) * Math.PI / 180) * nearThumbProximal.length,
			length: handLength*0.4,
		};
		thumbDistal.setAttribute('x',phalange.x-handWidth*0.1);
		thumbDistal.setAttribute('y',phalange.y - handLength * 0.05);
		thumbDistal.setAttribute('height',phalange.length);
		thumbDistal.setAttribute('width',handWidth*0.2);
		thumbDistal.setAttribute('rx',handWidth*0.05);
		thumbDistal.setAttribute('ry',handLength*0.5);
		var tilt = 20 - 90*Math.max(0,this.pos('nearHandSplay'))/Math.PI;
		thumbDistal.setAttribute('transform','rotate('+(tilt*nearHandTurnDX)+' '+phalange.x+' '+phalange.y+')');
		thumbNailWidth = handWidth * 0.17 * nearHandTurnDX/0.85;
		var thumbNail = document.createElementNS('http://www.w3.org/2000/svg','path');
		if (nearHandTurnDX > 0) {
			nearThumb.appendChild(thumbNail);
		} else {
			nearThumb.prepend(thumbNail);
		};
		thumbNail.setAttribute('fill',nailColor);
		thumbNail.setAttribute('stroke','black');
		thumbNail.setAttribute('stroke-width',0.5);
		thumbNail.setAttribute('transform','rotate('+(tilt*nearHandTurnDX)+' '+phalange.x+' '+phalange.y+')');
		x = phalange.x - handWidth * 0.1;
		if (nearHandTurnDX < 0) {
			x -= thumbNailWidth;
		};
		y = phalange.y + phalange.length*0.4;
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = x;
		y = y + phalange.length*0.3;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y +  phalange.length * 0.2 * this.bio('nailsLength');
		x = x + thumbNailWidth;
		y = y ;
		c2x = x;
		c2y = y + phalange.length * 0.2 * this.bio('nailsLength');;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = x;
		y = y - phalange.length*0.3;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = x - thumbNailWidth;
		y = y;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		thumbNail.setAttribute('d',d);

		var nearHandArray = [
			document.createElementNS('http://www.w3.org/2000/svg','g'),
			document.createElementNS('http://www.w3.org/2000/svg','g'),
			document.createElementNS('http://www.w3.org/2000/svg','g'),
			document.createElementNS('http://www.w3.org/2000/svg','g'),
			document.createElementNS('http://www.w3.org/2000/svg','g'),
		];
		for (var i in nearHandArray) {
			nearHandArray[i].id = 'nearFinger_'+i+'_'+this.id;
			nearHandArray[i].setAttribute('fill',skinTone);
			nearHandArray[i].setAttribute('stroke','inherit');
			nearHandArray[i].setAttribute('transform','rotate('+nearHandTilt+' '+nearWrist.x+' '+nearWrist.y+')');
		};
		var splayMaxAngles = [45,25,-5,-30];
		var digitLengths = [
			[0.4,0.5,0.6,0.45],
			[0.3,0.4,0.4,0.35],
			[0.2,0.3,0.3,0.25],
		];
		var proximals = [];
		var intermediates = [];
		var distals = [];
		for (var i=0;i<4;i++) {
			var proximal = document.createElementNS('http://www.w3.org/2000/svg','rect');
			nearHandArray[i].appendChild(proximal);
			var phalange = {
				x: nearWrist.x + (i*handWidth*0.29 - handWidth * 0.57)*nearHandTurnDX,
				y: nearWrist.y + handLength*0.8 + handLength*0.025*i,
				length: handLength*digitLengths[0][i],
				splay: splayMaxAngles[i] * Math.max(0,this.pos('nearHandSplay')/Math.PI)*nearHandTurnDX,
				curl: nearHandCurl,
			};
			proximals.push(phalange);
			proximal.setAttribute('x',phalange.x - handWidth*0.1);
			proximal.setAttribute('y',phalange.y);
			proximal.setAttribute('height',phalange.length);
			proximal.setAttribute('width',handWidth*0.2);
			proximal.setAttribute('rx',handWidth*0.05);
			proximal.setAttribute('ry',handLength*0.15);
			proximal.setAttribute('transform','rotate('+(phalange.splay+phalange.curl)+' '+phalange.x+' '+phalange.y+')');
			var intermediate = {
				x:phalange.x - Math.sin((phalange.curl + phalange.splay) * Math.PI / 180) * phalange.length*0.8,
				y:phalange.y + Math.cos((phalange.curl + phalange.splay) * Math.PI / 180) * phalange.length*0.8,
			};
			intermediates.push(intermediate);
		};
		for (var i in intermediates) {
			var intermediate = document.createElementNS('http://www.w3.org/2000/svg','rect');
			nearHandArray[i].appendChild(intermediate);
			var phalange = {
				x: intermediates[i].x,
				y: intermediates[i].y,
				length: handLength*digitLengths[1][i],
				splay: proximals[i].splay,
				curl: nearHandCurl*2,
			};
			intermediates[i] = phalange;
			intermediate.setAttribute('x',phalange.x - handWidth*0.09);
			intermediate.setAttribute('y',phalange.y);
			intermediate.setAttribute('height',phalange.length);
			intermediate.setAttribute('width',handWidth*0.18);
			intermediate.setAttribute('rx',handWidth*0.065);
			intermediate.setAttribute('ry',handLength*0.15);
			intermediate.setAttribute('transform','rotate('+(phalange.splay+phalange.curl)+' '+phalange.x+' '+phalange.y+')');
			var distal = {
				x:proximals[i].x - (Math.sin((proximals[i].splay + proximals[i].curl) * Math.PI / 180) * proximals[i].length*0.8) - (Math.sin((phalange.splay + phalange.curl) * Math.PI / 180) * phalange.length*0.8),
				y:proximals[i].y + (Math.cos((proximals[i].splay + proximals[i].curl) * Math.PI / 180) * proximals[i].length*0.8) + (Math.cos((phalange.splay + phalange.curl) * Math.PI / 180) * phalange.length*0.8),
			};
			distals.push(distal);
		}
		for (var i in distals) {
			var distal = document.createElementNS('http://www.w3.org/2000/svg','rect');
			nearHandArray[i].appendChild(distal);
			var phalange = {
				x: distals[i].x,
				y: distals[i].y,
				length: handLength*digitLengths[2][i],
				splay: proximals[i].splay,
				curl: nearHandCurl*3,
			};
			distals[i] = phalange;
			distal.setAttribute('x',phalange.x - handWidth*0.075);
			distal.setAttribute('y',phalange.y);
			distal.setAttribute('height',phalange.length);
			distal.setAttribute('width',handWidth*0.15);
			distal.setAttribute('rx',handWidth*0.05);
			distal.setAttribute('ry',handLength*0.15);
			distal.setAttribute('transform','rotate('+(phalange.splay+phalange.curl)+' '+phalange.x+' '+phalange.y+')');

			var nail = document.createElementNS('http://www.w3.org/2000/svg','path');
			if ((nearHandTurnDX < 0 && Math.abs(this.pos('nearHandCurl')) < Math.PI/3) || (nearHandTurnDX > 0 && Math.abs(this.pos('nearHandCurl')) > Math.PI/3) ) {
				nearHandArray[i].prepend(nail);
			} else {
				nearHandArray[i].appendChild(nail);
			};
			nail.setAttribute('fill',nailColor);
			nail.setAttribute('stroke','black');
			nail.setAttribute('stroke-width',0.5);
			nail.setAttribute('transform','rotate('+(distals[i].splay+distals[i].curl)+' '+distals[i].x+' '+distals[i].y+')');
			x = distals[i].x - handWidth*0.065;
			y = distals[i].y + distals[i].length * 0.7;
			d = 'M '+x+','+y+' ';
			c1x = x;
			c1y = y;
			x = x;
			y = y + distals[i].length * 0.3;
			c2x = x;
			c2y = y;
			d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
			c1x = x;
			c1y = y + distals[i].length * 0.2 * this.bio('nailsLength');
			x = x + handWidth*0.13 * Math.abs(nearHandTurnDX);
			y = y;
			c2x = x;
			c2y = y + distals[i].length * 0.2 * this.bio('nailsLength');
			d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
			c1x = x;
			c1y = y;
			x = x;
			y = y - distals[i].length * 0.3;
			c2x = x;
			c2y = y;
			d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
			c1x = x;
			c1y = y - distals[i].length * 0.1;
			x = x - handWidth*0.13 * Math.abs(nearHandTurnDX);
			y = y;
			c2x = x;
			c2y = y - distals[i].length * 0.1;
			d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
			d += 'z';
			nail.setAttribute('d',d);
		};
		var palmFacing = this.pos('nearHandTurn') < 0 && Math.abs(this.pos('nearHandCurl')) > Math.PI/3;
		if (palmFacing) {
			nearHandArray.unshift(nearHand);
			nearHandArray.unshift(nearThumb);
		} else {
			nearHandArray.push(nearThumb);
			nearHandArray.push(nearHand);
		};
		var nearJointCovers = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearHandArray.push(nearJointCovers);
		nearJointCovers.setAttribute('transform','rotate('+nearHandTilt+' '+nearWrist.x+' '+nearWrist.y+')');
		if (!palmFacing) {
			for (i in proximals) {
				var proximal = document.createElementNS('http://www.w3.org/2000/svg','rect');
				proximal.setAttribute('fill',skinTone);
				proximal.setAttribute('stroke','none');
				proximal.setAttribute('x',proximals[i].x - handWidth*0.1);
				proximal.setAttribute('y',proximals[i].y);
				proximal.setAttribute('height',proximals[i].length);
				proximal.setAttribute('width',handWidth*0.2);
				proximal.setAttribute('rx',handWidth*0.05);
				proximal.setAttribute('ry',handLength*0.15);
				proximal.setAttribute('transform','rotate('+(proximals[i].splay+proximals[i].curl)+' '+proximals[i].x+' '+proximals[i].y+')');
				nearJointCovers.appendChild(proximal);
			};
		};
		var thumbProximal = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearJointCovers.appendChild(thumbProximal);
		thumbProximal.setAttribute('fill',skinTone);
		thumbProximal.setAttribute('stroke','none');
		thumbProximal.setAttribute('x',nearThumbProximal.x-handWidth*0.15);
		thumbProximal.setAttribute('y',nearThumbProximal.y);
		thumbProximal.setAttribute('height',nearThumbProximal.length);
		thumbProximal.setAttribute('width',handWidth*0.3);
		thumbProximal.setAttribute('rx',handWidth*0.1);
		thumbProximal.setAttribute('ry',handLength*0.5);
		var tilt = -15 - 60*Math.max(0,this.pos('nearHandSplay'))/Math.PI;
		thumbProximal.setAttribute('transform','rotate('+(tilt*nearHandTurnDX)+' '+nearThumbProximal.x+' '+nearThumbProximal.y+')');

		var farHand = document.createElementNS('http://www.w3.org/2000/svg','g');
		farHand.id = 'farHand_'+this.id;
		farHand.setAttribute('fill',skinTone);
		farHand.setAttribute('stroke','inherit');


		var farElbowJoint = document.createElementNS('http://www.w3.org/2000/svg','use');
		farElbowJoint.id = 'farElbowJoint_'+this.id;
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farElbowJoint.appendChild(circle);
		circle.setAttribute('cx',farElbow.x);
		circle.setAttribute('cy',farElbow.y);
		circle.setAttribute('r',7 * this.bio('armWidth'));
				
		var nearElbowJoint = document.createElementNS('http://www.w3.org/2000/svg','use');
		nearElbowJoint.id = 'nearElbowJoint_'+this.id;
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearElbowJoint.appendChild(circle);
		circle.setAttribute('cx',nearElbow.x);
		circle.setAttribute('cy',nearElbow.y);
		circle.setAttribute('r',7 * this.bio('armWidth'));
		
		var torso = document.createElementNS('http://www.w3.org/2000/svg','g');
		torso.id = 'torso_'+this.id;
		torso.setAttribute('fill',skinTone);
		torso.setAttribute('stroke','inherit');
		var pelvisBacking = document.createElementNS('http://www.w3.org/2000/svg','polyline');
		torso.appendChild(pelvisBacking);
		var pointsArray = [
			{x:nearHip.x,y:Math.min(nearHip.y,farHip.y)},
			{x:farHip.x,y:Math.min(nearHip.y,farHip.y)},
			{x:farHip.x,y:Math.max(nearHip.y,farHip.y)},
			genitalsBottom,
			{x:nearHip.x,y:Math.max(nearHip.y,farHip.y)},
		];
		var pointsString = '';
		for (var i of pointsArray) {
			pointsString += i.x + ',' + i.y + ' ';
		};
		pelvisBacking.setAttribute('points',pointsString);
// 		pelvisBacking.setAttribute('x',nearHip.x);
// 		pelvisBacking.setAttribute('y',Math.min(nearHip.y,farHip.y));
// 		pelvisBacking.setAttribute('height',Math.abs(nearHip.y-farHip.y));
// 		pelvisBacking.setAttribute('width',Math.abs(farHip.x-nearHip.x));
		pelvisBacking.setAttribute('stroke','none');
		var chest = document.createElementNS('http://www.w3.org/2000/svg','path');
		chest.setAttribute('stroke','none');
		torso.appendChild(chest);
		var farSide = document.createElementNS('http://www.w3.org/2000/svg','path');
		farSide.setAttribute('fill','none');
		torso.appendChild(farSide);
		var nearSide = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearSide.setAttribute('fill','none');
		torso.appendChild(nearSide);
		var x = nearHip.x;
		var y = nearHip.y;
		var d = 'M '+x+','+y+' ';
		var nearD = 'M '+x+','+y+' ';
		var farD = 'M '+(farShoulder.x+shoulderWidth*Math.pow(2,0.5)*0.5)+','+(farShoulder.y+shoulderWidth*Math.pow(2,0.5)*0.5)+' ';
		var nearControl = (nearHip.y - nearShoulder.y)/2;
		var farControl = (farHip.y - farShoulder.y)/2;
		// Up To Near Shoulder
		c1x = x;
		c1y = y - nearControl;
		x = nearShoulder.x-shoulderWidth*Math.pow(2,0.5)*0.5;
		y = nearShoulder.y+shoulderWidth*Math.pow(2,0.5)*0.5;
		c2x = x;
		c2y = y + nearControl;
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
		x = farShoulder.x+shoulderWidth*Math.pow(2,0.5)*0.5;
		y = farShoulder.y+shoulderWidth*Math.pow(2,0.5)*0.5;
		c2x = x-10;
		c2y = y;
		d += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		// To Far Hip
		c1x = x;
		c1y = y + farControl;
		x = farHip.x;
		y = farHip.y;
		c2x = x;
		c2y = y - farControl;
		d += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		farD += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		// To Near Hip
		c1x = x;
		c1y = y;
		x = nearHip.x;
		y = nearHip.y;
		c2x = x;
		c2y = y;
		d += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		d += ' z';
		chest.setAttribute('d',d);
		nearSide.setAttribute('d',nearD);
		farSide.setAttribute('d',farD);
		var hip = document.createElementNS('http://www.w3.org/2000/svg','path');
		torso.appendChild(hip);
		x = neckBase.x;
		y = pelvisHeight -  bellySize;
		d = 'M '+x+','+y+' ';
		if (lowerBodyAngle) {
			c1x = x - bellySize*0.55;
			c1y = y;
			x = nearHip.x - thighWidth*0.5;
			y = nearHip.y - thighWidth*0.25;
			c2x = x;
			c2y = y - thighWidth * 0.5 * 0.55;
			d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
			c1x = x;
			c1y = y + 0.55 * thighWidth*0.33;
			x = nearHip.x;
			y = nearHip.y + thighWidth*0.33;
			c2x = x - 0.55 * thighWidth;
			c2y = y;
			d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
			torso.appendChild(nearButtock);
		} else {
			c1x = x + bellySize * 0.55;
			c1y = y;
			x = farHip.x + thighWidth*0.5;
			y = farHip.y - thighWidth*0.25;
			c2x = x;
			c2y = y - thighWidth * 0.5 * 0.55;
			d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
			c1x = x;
			c1y = y + 0.55 * thighWidth*0.33;
			x = farHip.x;
			y = farHip.y + thighWidth*0.33;
			c2x = x + 0.55 * thighWidth;
			c2y = y;
			d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
			torso.appendChild(farButtock);
		};
		d += 
		hip.setAttribute('d',d);

		var shoulders = document.createElementNS('http://www.w3.org/2000/svg','g');
		shoulders.id = 'shoulders_'+this.id;
		shoulders.setAttribute('fill',skinTone);
		shoulders.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		shoulders.appendChild(circle);
		circle.setAttribute('cx',farShoulder.x);
		circle.setAttribute('cy',farShoulder.y);
		circle.setAttribute('r',shoulderWidth);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		shoulders.appendChild(circle);
		circle.setAttribute('cx',nearShoulder.x);
		circle.setAttribute('cy',nearShoulder.y);
		circle.setAttribute('r',shoulderWidth);
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
		farBreast.id = 'farBreast_'+this.id;
		farBreast.setAttribute('fill',skinTone);
		farBreast.setAttribute('stroke','inherit');
		var shoulderTipDegrees = this.pos('shouldersTip') * -180/Math.PI;
		var nippleBack = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farBreast.appendChild(nippleBack);
		nippleBack.setAttribute('fill',areolaeTone);
		nippleBack.setAttribute('cx',farAreolae.x);
		nippleBack.setAttribute('cy',farAreolae.y);
		nippleBack.setAttribute('r',nippleWidth/2);
// 		var block = document.createElementNS('http://www.w3.org/2000/svg','rect');
//		farBreast.appendChild(block);
// 		block.setAttribute('stroke','none');
// 		block.setAttribute('x',farBreastAnchor.x-9);
// 		block.setAttribute('y',farBreastAnchor.y-5);
// 		block.setAttribute('width',10);
// 		block.setAttribute('height',this.bio('breastSag')*30);
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
		farBreastClipPath.id = 'farBreastClipPath_'+this.id;
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
		areolae.setAttribute('r',Math.max(nippleWidth/2,this.bio('areolaeWidth') * breastSize/3));
		areolae.setAttribute('clip-path','url(#farBreastClipPath_'+this.id+')');
		var nipple = document.createElementNS('http://www.w3.org/2000/svg','path');
		farBreast.appendChild(nipple);
		nipple.setAttribute('fill',areolaeTone);
		if (this.bio('nippleLength') >= 1) {
			nipple.setAttribute('stroke','black');
			nipple.setAttribute('stroke-width',1);
			nipple.setAttribute('stroke-linecap','round');
		};
		var d = 'M ' + farNippleTop.x + ',' + farNippleTop.y + ' ';
		d += 'c ' + (nippleLength*0.5) + ',' + (nippleWidth*-0.1) + ' ' + (nippleLength*0.75) + ',' + (nippleWidth*-0.2) + ' ' + nippleLength + ',0 ';
		d += 'c ' + (0.55*nippleWidth*torsoFacing) + ',' + 0 + ' ' + (0.55*nippleWidth*torsoFacing) + ',' + nippleWidth + ' ' + 0 + ',' + nippleWidth ;
		d += 'c ' + (nippleLength*-0.25) + ',' + (nippleWidth*0.2) + ' ' + (nippleLength*-0.5) + ',' + (nippleWidth*0.1) + ' ' + (nippleLength*-1) + ',0 ';
		nipple.setAttribute('d',d);
		if (upperBodyAngle) {
			tilt = Math.atan2(farAreolae.y - farBreastCenter.y,farAreolae.x - farBreastCenter.x) * 180 / Math.PI;
		} else {
			tilt = Math.atan2(farBreastCenter.y - farAreolae.y,farBreastCenter.x - farAreolae.x) * 180 / Math.PI;
		};
		nipple.setAttribute('transform','rotate('+tilt+' '+farAreolae.x+' '+farAreolae.y+')');
		var neckBottom = document.createElementNS('http://www.w3.org/2000/svg','path');
		farBreast.appendChild(neckBottom);
		neckBottom.setAttribute('d','M '+farBreastAnchor.x+','+farBreastAnchor.y+' L '+farNeck.x+','+farNeck.y+' ');
		neckBottom.setAttribute('stroke',skinTone);
		neckBottom.setAttribute('stroke-width',6);
		neckBottom.setAttribute('stroke-linecap','round');
		
		var nearBreast = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearBreast.id = 'nearBreast_'+this.id;
		nearBreast.setAttribute('fill',skinTone);
		nearBreast.setAttribute('stroke','inherit');
		var nippleBack = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearBreast.appendChild(nippleBack);
		nippleBack.setAttribute('fill',areolaeTone);
		nippleBack.setAttribute('cx',nearAreolae.x);
		nippleBack.setAttribute('cy',nearAreolae.y);
		nippleBack.setAttribute('r',nippleWidth/2);
// 		var block = document.createElementNS('http://www.w3.org/2000/svg','rect');
// 		nearBreast.appendChild(block);
// 		block.setAttribute('stroke','none');
// 		block.setAttribute('x',nearBreastAnchor.x-1);
// 		block.setAttribute('y',nearBreastAnchor.y-5);
// 		block.setAttribute('width',10);
// 		block.setAttribute('height',this.bio('breastSag')*30);
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
		nearBreastClipPath.id = 'nearBreastClipPath_'+this.id;
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
		areolae.setAttribute('r',Math.max(nippleWidth/2,this.bio('areolaeWidth') * breastSize/3));
		areolae.setAttribute('clip-path','url(#nearBreastClipPath_'+this.id+')');
		var nipple = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearBreast.appendChild(nipple);
		nipple.setAttribute('fill',areolaeTone);
		if (this.bio('nippleLength') >= 1) {
			nipple.setAttribute('stroke','black');
			nipple.setAttribute('stroke-width',1);
			nipple.setAttribute('stroke-linecap','round');
		};
		var d = 'M ' + nearNippleTop.x + ',' + nearNippleTop.y + ' ';
		d += 'c ' + (nippleLength*0.5) + ',' + (nippleWidth*-0.1) + ' ' + (nippleLength*0.75) + ',' + (nippleWidth*-0.2) + ' ' + nippleLength + ',0 ';
		d += 'c ' + (0.55*nippleWidth*torsoFacing) + ',' + 0 + ' ' + (0.55*nippleWidth*torsoFacing) + ',' + nippleWidth + ' ' + 0 + ',' + nippleWidth ;
		d += 'c ' + (nippleLength*-0.25) + ',' + (nippleWidth*0.2) + ' ' + (nippleLength*-0.5) + ',' + (nippleWidth*0.1) + ' ' + (nippleLength*-1) + ',0 ';
		nipple.setAttribute('d',d);
		nipple.setAttribute('transform','rotate('+tilt+' '+nearAreolae.x+' '+nearAreolae.y+')');
		var neckBottom = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearBreast.appendChild(neckBottom);
		neckBottom.setAttribute('d','M '+nearBreastAnchor.x+','+nearBreastAnchor.y+' L '+nearNeck.x+','+nearNeck.y+' ');
		neckBottom.setAttribute('stroke',skinTone);
		neckBottom.setAttribute('stroke-width',6);
		neckBottom.setAttribute('stroke-linecap','round');
		
		var belly = document.createElementNS('http://www.w3.org/2000/svg','g');
		belly.id = 'belly_'+this.id;
		belly.setAttribute('stroke','inherit');
		belly.setAttribute('fill',skinTone);
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
		nearPath.id = 'nearPath';
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
		if (this.bio('belly') < 1) {
			var nearTopAb = {
				x: nearBreastAnchor.x + bellyOffset,
				y: Math.min(nearBreastCenter.y + breastSize,nearBreastAnchor.y + torsoHeight*0.4),
			};
			var farTopAb = {
				x: farBreastAnchor.x + bellyOffset,
				y: Math.min(farBreastCenter.y + breastSize,farBreastAnchor.y + torsoHeight*0.4),
			};
			var centerX = (farTopAb.x + nearTopAb.x)/2;
			var abBulge = bellySize/7;
			var centerBulge = abBulge * -1;
			if (upperBodyAngle) {
				centerBulge *= -1;
			};
			var stepX = 3;
			var stepY = (Math.max(farTopAb.y,nearTopAb.y) - (genitalsTop.y-torsoHeight*0.08)) / -4 ;
			for (var i=3;i>=0;i--) {
				var opacity = (1-this.bio('belly'))/(1+i);
				var abStroke = document.createElementNS('http://www.w3.org/2000/svg','path');
				abStroke.id = 'abStroke_'+i;
				abStroke.setAttribute('stroke','black');
				abStroke.setAttribute('stroke-width',1);
				abStroke.setAttribute('stroke-opacity',opacity);
				abStroke.setAttribute('fill','none');
				var thisAbY = nearTopAb.y + stepY * i;
				var diffX = stepX * i;
				d = 'M '+(nearTopAb.x+diffX)+','+thisAbY+' ';
				d += 'C '+(nearTopAb.x-abBulge+diffX)+','+thisAbY+' '+(nearTopAb.x-abBulge+diffX)+','+(thisAbY+stepY)+' '+(nearTopAb.x+diffX)+','+(thisAbY+stepY)+' ';
				d += 'C '+(nearTopAb.x+diffX)+','+(thisAbY+stepY+abBulge)+' '+centerX+','+(thisAbY+stepY+abBulge)+' '+centerX+','+(thisAbY+stepY)+' ';
				d += 'C '+(centerX+centerBulge)+','+(thisAbY+stepY)+' '+(centerX+centerBulge)+','+thisAbY+' '+centerX+','+thisAbY+' ';
				d += 'C '+(centerX+centerBulge)+','+thisAbY+' '+(centerX+centerBulge)+','+(thisAbY+stepY)+' '+centerX+','+(thisAbY+stepY)+' ';
				d += 'C '+centerX+','+(thisAbY+stepY+abBulge)+' '+(farTopAb.x-diffX)+','+(thisAbY+stepY+abBulge)+' '+(farTopAb.x-diffX)+','+(thisAbY+stepY)+' ';
				d += 'C '+(farTopAb.x+abBulge-diffX)+','+(thisAbY+stepY)+' '+(farTopAb.x+abBulge-diffX)+','+thisAbY+' '+(farTopAb.x-diffX)+','+thisAbY+' ';
				abStroke.setAttribute('d',d);
				var abBack = document.createElementNS('http://www.w3.org/2000/svg','path');
				abBack.id = 'abBack_'+i;
				abBack.setAttribute('d',d);
				abs.appendChild(abBack);
				abs.appendChild(abStroke);
			};
		};
		var navel = document.createElementNS('http://www.w3.org/2000/svg','g');
		belly.appendChild(navel);
		navel.setAttribute('stroke','black');
		navel.setAttribute('stroke-width',1);
		navel.setAttribute('stroke-linecap','round');
		navel.setAttribute('fill-opacity',0.2);
		navel.setAttribute('fill','black');
		var topNavel = document.createElementNS('http://www.w3.org/2000/svg','path');
		navel.appendChild(topNavel);
		x = bellyOffset;
		y = (2*farBellyTop.y + 2*nearBellyTop.y + 4*farBellyBottom.y + 4*nearBellyBottom.y) / 12;
		d = 'M '+x+','+y+' ';
		dc1x = bellySize*0.125;
		dc1y = 0;
		dx = 0;
		dy = bellySize*0.25;
		dc2x = bellySize*0.125;
		dc2y = dy;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		topNavel.setAttribute('d',d);
		var bottomNavel = document.createElementNS('http://www.w3.org/2000/svg','path');
		navel.appendChild(bottomNavel);
		d = 'M '+(x+bellySize/14)+','+(y+bellySize*0.09)+' ';
		dc1x = bellySize*-0.125;
		dc1y = 0;
		dx = 0;
		dy = bellySize*0.25;
		dc2x = bellySize*-0.125;
		dc2y = dy;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		bottomNavel.setAttribute('d',d);
		
		var genitals = document.createElementNS('http://www.w3.org/2000/svg','g');
		genitals.id = 'genitals_'+this.id;
		genitals.setAttribute('fill',skinTone);
		genitals.setAttribute('stroke','inherit');
		var genitalsBacking = document.createElementNS('http://www.w3.org/2000/svg','circle');
// 		genitals.appendChild(genitalsBacking);
		genitalsBacking.setAttribute('stroke','none');
		genitalsBacking.setAttribute('cx',genitalsTop.x);
		genitalsBacking.setAttribute('cy',genitalsTop.y);
		genitalsBacking.setAttribute('r',hipsWidth*0.08);
		var genitalsHeight = genitalsBottom.y - genitalsTop.y;
		var labioscrotalDrop;
		if (genitalsHeight > labioscrotalSize * 1.2) {
			labioscrotalDrop = genitalsHeight * 0.5;
		} else {
			labioscrotalDrop = labioscrotalSize * 0.5;
		};
		var farScrotum = document.createElementNS('http://www.w3.org/2000/svg','path');
		genitals.appendChild(farScrotum);
		x = genitalsTop.x+genitalsFacing*labioscrotalSize/8;
		y = genitalsTop.y;
		d = 'M '+x+','+y+' ';
		c1x = x + genitalsFacing*labioscrotalSize/16;
		c1y = y + labioscrotalSize/4;
		x = x + labioscrotalSize/4 * genitalsFacing;
		y = y + labioscrotalDrop;
		c2x = x;
		c2y = y - labioscrotalSize/4;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y + labioscrotalSize/4;
		x = (x + labioscrotalSize * genitalsFacing * -0.25 + genitalsBottom.x)/2;
		y = y + labioscrotalDrop;
		c2x = x - genitalsFacing * labioscrotalSize * -0.25;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x + genitalsFacing *labioscrotalSize * -0.25;
		c1y = y;
		x = genitalsBottom.x - labioscrotalSize*0.25*genitalsFacing;
		y = genitalsBottom.y;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		farScrotum.setAttribute('d',d);
		var nearScrotum = document.createElementNS('http://www.w3.org/2000/svg','path');
		genitals.appendChild(nearScrotum);
		nearScrotum.setAttribute('stroke','black');
		x = genitalsTop.x-genitalsFacing*labioscrotalSize/8;
		y = genitalsTop.y;
		d = 'M '+x+','+y+' ';
		c1x = x + genitalsFacing*labioscrotalSize/16;
		c1y = y + labioscrotalSize/4;
		x = x + labioscrotalSize/4 * genitalsFacing;
		y = y + labioscrotalDrop;
		c2x = x;
		c2y = y - labioscrotalSize/4;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y + labioscrotalSize/4;
		x = (x + labioscrotalSize * genitalsFacing * -0.25 + genitalsBottom.x)/2;
		y = y + labioscrotalDrop;
		c2x = x - genitalsFacing * labioscrotalSize * -0.25;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x + genitalsFacing *labioscrotalSize * -0.25;
		c1y = y;
		x = genitalsBottom.x - labioscrotalSize*0.25*genitalsFacing;
		y = genitalsBottom.y;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = genitalsTop.x-genitalsFacing*hipsWidth*0.5;
		y = genitalsTop.y;
 		c2x = x;
		c2y = y + genitalsBottom.y - genitalsTop.y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		nearScrotum.setAttribute('d',d);
				
		var phallus = document.createElementNS('http://www.w3.org/2000/svg','g');
		phallus.id = 'phallus_'+this.id;
		phallus.setAttribute('fill',skinTone);
		phallus.setAttribute('stroke','inherit');
		var phallusBase = document.createElementNS('http://www.w3.org/2000/svg','circle');
		phallus.appendChild(phallusBase);
		phallusBase.setAttribute('cx',genitalsTop.x);
		phallusBase.setAttribute('cy',Math.min((genitalsBottom.y + genitalsTop.y)/2,genitalsTop.y+phallusGirth/2));
		phallusBase.setAttribute('r',Math.min((genitalsBottom.y - genitalsTop.y)/2,phallusGirth*0.6));
		phallusBase.setAttribute('stroke','none');
		var shaft = document.createElementNS('http://www.w3.org/2000/svg','path');
		phallus.appendChild(shaft);
		var phallusHeadTop = {
			x:phallusTip.x,
			y:phallusTip.y,
		};
		var phallusHeadBottom = {
			x:phallusTip.x,
			y:phallusTip.y,
		};
		if (genitalsFacing > 0 && erectionAngle < Math.PI/2) {
			phallusHeadTop.x += 0.8 * glansSize * Math.cos(erectionAngle);
			phallusHeadTop.y -= 0.8 * glansSize * Math.sin(erectionAngle);
			phallusHeadBottom.x -= 0.8 * glansSize * Math.cos(erectionAngle);
			phallusHeadBottom.y += 0.8 * glansSize * Math.sin(erectionAngle);
		} else if (genitalsFacing > 0 && erectionAngle > Math.PI/2) {
			phallusHeadTop.x += 0.8 * glansSize * Math.cos(erectionAngle);
			phallusHeadTop.y -= 0.8 * glansSize * Math.sin(erectionAngle);
			phallusHeadBottom.x -= 0.8 * glansSize * Math.cos(erectionAngle);
			phallusHeadBottom.y += 0.8 * glansSize * Math.sin(erectionAngle);
		} else if (genitalsFacing < 0 && erectionAngle < Math.PI/2) {
			phallusHeadTop.x -= 0.8 * glansSize * Math.cos(erectionAngle);
			phallusHeadTop.y -= 0.8 * glansSize * Math.sin(erectionAngle);
			phallusHeadBottom.x += 0.8 * glansSize * Math.cos(erectionAngle);
			phallusHeadBottom.y += 0.8 * glansSize * Math.sin(erectionAngle);
		} else {
			phallusHeadTop.x -= 0.8 * glansSize * Math.cos(erectionAngle);
			phallusHeadTop.y -= 0.8 * glansSize * Math.sin(erectionAngle);
			phallusHeadBottom.x += 0.8 * glansSize * Math.cos(erectionAngle);
			phallusHeadBottom.y += 0.8 * glansSize * Math.sin(erectionAngle);
		}
		var erectionControl = (erectionAngle - Math.PI/2)*genitalsFacing*phallusGirth*0.5;
		erectionControl = Math.min(hipsWidth/6,erectionControl);
		erectionControl = Math.max(hipsWidth/-6,erectionControl);
		x = genitalsTop.x - erectionControl;
		y = genitalsTop.y;
		d = 'M '+x+','+y+' ';
		c1x = x + 0.3*phallusLength*genitalsFacing;
		c1y = y;
		x = phallusHeadTop.x;
		y = phallusHeadTop.y;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = phallusHeadBottom.x;
		y = phallusHeadBottom.y;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = genitalsTop.x + erectionControl;
		y = Math.min(genitalsTop.y + phallusGirth,genitalsBottom.y);
		c2x = x + 0.3*phallusLength*genitalsFacing;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		shaft.setAttribute('d',d);
// 		var phallusHead = document.createElementNS('http://www.w3.org/2000/svg','circle');
// 		phallus.appendChild(phallusHead);
// 		phallusHead.setAttribute('cx',phallusTip.x);
// 		phallusHead.setAttribute('cy',phallusTip.y);
// 		phallusHead.setAttribute('r',phallusGirth);
// 		phallusHead.setAttribute('fill','none');
// 		phallusHead.setAttribute('stroke','red');
// 		phallusHead.setAttribute('stroke-width',3);
		var glans = document.createElementNS('http://www.w3.org/2000/svg','path');
		phallus.appendChild(glans);
		x = phallusTip.x + glansSize;
		y = phallusTip.y - glansSize/3;
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y + glansSize/3;
		x = phallusTip.x;
		y = phallusTip.y + glansSize;
		c2x = x + glansSize/4;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x - glansSize/4;
		c1y = y;
		x = phallusTip.x - glansSize;
		y = phallusTip.y - glansSize/3;
		c2x = x;
		c2y = y + glansSize/3;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y - phallusGirth/2;
		x = phallusTip.x + glansSize;
		y = phallusTip.y - glansSize/3;
		c2x = x;
		c2y = y - glansSize/2;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		glans.setAttribute('d',d);
		var erectionDegrees = erectionAngle * 180 / Math.PI;
		if (genitalsFacing == 1) {
			erectionDegrees = 360 - erectionDegrees;
		};
		glans.setAttribute('transform','rotate('+erectionDegrees+' '+phallusTip.x+' '+phallusTip.y+')');
				
		var farFoot = document.createElementNS('http://www.w3.org/2000/svg','g');
		farFoot.id = 'farFoot_'+this.id;
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
			{x:(farToes.x+2*farAnkle.x)/3,y:(farToes.y+2*farAnkle.y)/3},
			farAnkle,
		];
		var footPointsString = '';
		for (var i in footPoints) {
			footPointsString += footPoints[i].x + ',' + footPoints[i].y + ' ';
		};
		tendon.setAttribute('points',footPointsString);
		var tilt = this.pos('farFootPoint') * -180/Math.PI / 6;
		heel.setAttribute('transform','rotate('+tilt+' '+farAnkle.x+' '+farAnkle.y+')');
		bigToe.setAttribute('transform','rotate('+tilt+' '+farAnkle.x+' '+farAnkle.y+')');
		footFront.setAttribute('transform','rotate('+tilt+' '+farAnkle.x+' '+farAnkle.y+')');
				
		var nearFoot = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearFoot.id = 'nearFoot_'+this.id;
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
			{x:(nearToes.x+2*nearAnkle.x)/3,y:(nearToes.y+2*nearAnkle.y)/3},
			nearAnkle,
		];
		var footPointsString = '';
		for (var i in footPoints) {
			footPointsString += footPoints[i].x + ',' + footPoints[i].y + ' ';
		};
		tendon.setAttribute('points',footPointsString);	
		var tilt = this.pos('nearFootPoint') * -180/Math.PI / 6;
		heel.setAttribute('transform','rotate('+tilt+' '+nearAnkle.x+' '+nearAnkle.y+')');
		bigToe.setAttribute('transform','rotate('+tilt+' '+nearAnkle.x+' '+nearAnkle.y+')');
		footFront.setAttribute('transform','rotate('+tilt+' '+nearAnkle.x+' '+nearAnkle.y+')');
					
		var headGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		headGroup.id = 'headGroup_'+this.id;
		headGroup.setAttribute('transform','translate('+headSlide+',0) rotate('+headTilt+','+headCenter.x+','+headCenter.y+')');
		headGroup.setAttribute('fill',skinTone);
		headGroup.setAttribute('stroke','inherit');
		var skull = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
		headGroup.appendChild(skull);
		skull.setAttribute('cx',headCenter.x);
		skull.setAttribute('cy',headCenter.y-headHeight/2+headWidth/2);
		skull.setAttribute('rx',headWidth/2);
		skull.setAttribute('ry',headWidth/2);
		var skullPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath');
		skullPath.id = 'skullPath_'+this.id;
		defs.appendChild(skullPath);
		var skull = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
		skullPath.appendChild(skull);
		skull.setAttribute('cx',headCenter.x);
		skull.setAttribute('cy',headCenter.y-headHeight/2+headWidth/2);
		skull.setAttribute('rx',headWidth/2);
		skull.setAttribute('ry',headWidth/2);
		var face = document.createElementNS('http://www.w3.org/2000/svg','path');
		headGroup.appendChild(face);
		var facePath = document.createElementNS('http://www.w3.org/2000/svg','path');
		skullPath.appendChild(facePath);
		if (facing > 0) {
			startX = farEyeCenter.x + eyeSize;
			startY = farEyeCenter.y
			cheekboneX = farCheekbone.x;
			cheekboneY = farCheekbone.y;
			jawX = nearJawbone.x;
			jawY = nearJawbone.y;
			earX = nearEarCenter.x;
			earY = nearEarCenter.y;
			templeX = farTemple.x;
			templeY = farTemple.y;
		} else {
			startX = nearEyeCenter.x - eyeSize;
			startY = nearEyeCenter.y
			cheekboneX = nearCheekbone.x;
			cheekboneY = nearCheekbone.y;
			jawX = farJawbone.x;
			jawY = farJawbone.y;
			earX = farEarCenter.x;
			earY = farEarCenter.y;
			templeX = nearTemple.x;
			templeY = nearTemple.y;
		};
		x = startX;
		y = startY;
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = cheekboneX;
		y = cheekboneY;
		c2x = x;
		c2y = y-cheekboneSize;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y+cheekboneSize;
		x = chin.x;
		y = chin.y;
		c2x = x+this.bio('jawWidth')*facing;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x+this.bio('jawWidth')*facing*-2;
		c1y = y;
		x = jawX;
		y = jawY;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = earX;
		y = earY;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		d += 'L '+headCenter.x+','+(headCenter.y-headHeight*0.48)+' ';
		c1x = headCenter.x + headWidth*facing*0.05;
		c1y = headCenter.y - headHeight*0.48;
		x = templeX;
		y = templeY;
		c2x = x;
		c2y = y-templeSize;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y+templeSize;
		x = startX;
		y = startY;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		face.setAttribute('d',d);
		facePath.setAttribute('d',d);
		
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
		nearEye.setAttribute('stroke','firebrick');
		nearEye.setAttribute('stroke-width',1);
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
		nearEyePupil.setAttribute('cx',nearEyeCenter.x+this.pos('eyePositionX')/Math.PI*eyeSize);
		nearEyeIris.setAttribute('cx',nearEyeCenter.x+this.pos('eyePositionX')/Math.PI*eyeSize);
		nearEyeHighlight.setAttribute('cx',nearEyeCenter.x+eyeSize/4+this.pos('eyePositionX')/Math.PI*eyeSize);
		nearEyePupil.setAttribute('cy',nearEyeCenter.y+this.pos('eyePositionY')/Math.PI*eyeSize);
		nearEyeIris.setAttribute('cy',nearEyeCenter.y+this.pos('eyePositionY')/Math.PI*eyeSize);
		nearEyeHighlight.setAttribute('cy',nearEyeCenter.y-eyeSize/4+this.pos('eyePositionY')/Math.PI*eyeSize);
		nearEyePupil.setAttribute('r',eyeSize/4);
		nearEyeIris.setAttribute('r',eyeSize/2);
		nearEyeHighlight.setAttribute('r',eyeSize/4);
		nearEyePupil.setAttribute('fill','black');
		nearEyeIris.setAttribute('fill',eyeColor);
		nearEyeHighlight.setAttribute('fill','white');
		var nearEyeLidsClipPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath');
		nearEyeLidsClipPath.id = 'nearEyeLidsClipPath_'+this.id;
		defs.appendChild(nearEyeLidsClipPath);
		var nearEyeLids = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearEyeLidsClipPath.appendChild(nearEyeLids);
		var nearEyeLidsStroke = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearEyeGroup.appendChild(nearEyeLidsStroke);
		nearEyeLidsStroke.setAttribute('stroke','black');
		nearEyeLidsStroke.setAttribute('stroke-width',0.75);
		nearEyeLidsStroke.setAttribute('fill','none');
		d = 'M '+(nearEyeCenter.x+eyeSize)+','+nearEyeCenter.y+' ';
		d += 'C '+(nearEyeCenter.x+eyeSize)+','+ (nearEyeCenter.y+this.pos('nearEyeInnerLid')*10/Math.PI) +' '+(nearEyeCenter.x-eyeSize)+','+ (nearEyeCenter.y+this.pos('nearEyeOuterLid')*10/Math.PI) +' '+(nearEyeCenter.x-eyeSize)+','+nearEyeCenter.y+' ';
		d += 'C '+(nearEyeCenter.x-eyeSize)+','+ (nearEyeCenter.y+this.pos('nearEyeLowerLid')*-10/Math.PI) +' '+(nearEyeCenter.x+eyeSize)+','+ (nearEyeCenter.y+this.pos('nearEyeLowerLid')*-10/Math.PI) +' '+(nearEyeCenter.x+eyeSize)+','+nearEyeCenter.y+' ';
		nearEyeLids.setAttribute('d',d);
		nearEyeLidsStroke.setAttribute('d',d);
		nearEyeLids.setAttribute('transform','rotate('+(150*(this.bio('eyeTilt')-1))+' '+nearEyeCenter.x+' '+nearEyeCenter.y+')');
		nearEyeLidsStroke.setAttribute('transform','rotate('+(150*(this.bio('eyeTilt')-1))+' '+nearEyeCenter.x+' '+nearEyeCenter.y+')');
		nearEyeBall.setAttribute('clip-path','url(#nearEyeLidsClipPath_'+this.id+')');
		
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
		farEye.setAttribute('stroke','firebrick');
		farEye.setAttribute('stroke-width',1);
		farEye.setAttribute('fill','white');
		farEye.setAttribute('cx',headCenter.x+facing+eyeDistance);
		farEye.setAttribute('cy',headCenter.y+nodOffset);
		farEye.setAttribute('r',eyeSize);
		var farEyePupil = document.createElementNS('http://www.w3.org/2000/svg','circle');
		var farEyeIris = document.createElementNS('http://www.w3.org/2000/svg','circle');
		var farEyeHighlight = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farEyeBall.appendChild(farEyeIris);
		farEyeBall.appendChild(farEyePupil);
		farEyeBall.appendChild(farEyeHighlight);
		farEyePupil.setAttribute('cx',farEyeCenter.x+this.pos('eyePositionX')/Math.PI*eyeSize);
		farEyeIris.setAttribute('cx',farEyeCenter.x+this.pos('eyePositionX')/Math.PI*eyeSize);
		farEyeHighlight.setAttribute('cx',farEyeCenter.x+eyeSize/4+this.pos('eyePositionX')/Math.PI*eyeSize);
		farEyePupil.setAttribute('cy',farEyeCenter.y+this.pos('eyePositionY')/Math.PI*eyeSize);
		farEyeIris.setAttribute('cy',farEyeCenter.y+this.pos('eyePositionY')/Math.PI*eyeSize);
		farEyeHighlight.setAttribute('cy',farEyeCenter.y-eyeSize/4+this.pos('eyePositionY')/Math.PI*eyeSize);
		farEyePupil.setAttribute('r',eyeSize/4);
		farEyeIris.setAttribute('r',eyeSize/2);
		farEyeHighlight.setAttribute('r',eyeSize/4);
		farEyePupil.setAttribute('fill','black');
		farEyeIris.setAttribute('fill',eyeColor);
		farEyeHighlight.setAttribute('fill','white');
		var farEyeLidsClipPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath');
		farEyeLidsClipPath.id = 'farEyeLidsClipPath_'+this.id;
		defs.appendChild(farEyeLidsClipPath);
		var farEyeLids = document.createElementNS('http://www.w3.org/2000/svg','path');
		farEyeLidsClipPath.appendChild(farEyeLids);
		var farEyeLidsStroke = document.createElementNS('http://www.w3.org/2000/svg','path');
		farEyeGroup.appendChild(farEyeLidsStroke);
		farEyeLidsStroke.setAttribute('stroke','black');
		farEyeLidsStroke.setAttribute('stroke-width',0.75);
		farEyeLidsStroke.setAttribute('fill','none');
		d = 'M '+(farEyeCenter.x-eyeSize)+','+farEyeCenter.y+' ';
		d += 'C '+(farEyeCenter.x-eyeSize)+','+ (farEyeCenter.y+this.pos('farEyeInnerLid')*10/Math.PI) +' '+(farEyeCenter.x+eyeSize)+','+ (farEyeCenter.y+this.pos('farEyeOuterLid')*10/Math.PI) +' '+(farEyeCenter.x+eyeSize)+','+farEyeCenter.y+' ';
		d += 'C '+(farEyeCenter.x+eyeSize)+','+ (farEyeCenter.y+this.pos('farEyeLowerLid')*-10/Math.PI) +' '+(farEyeCenter.x-eyeSize)+','+ (farEyeCenter.y+this.pos('farEyeLowerLid')*-10/Math.PI) +' '+(farEyeCenter.x-eyeSize)+','+farEyeCenter.y+' ';
		farEyeLids.setAttribute('d',d);
		farEyeLidsStroke.setAttribute('d',d);
		farEyeLids.setAttribute('transform','rotate('+(-150*(this.bio('eyeTilt')-1))+' '+farEyeCenter.x+' '+farEyeCenter.y+')');
		farEyeLidsStroke.setAttribute('transform','rotate('+(-150*(this.bio('eyeTilt')-1))+' '+farEyeCenter.x+' '+farEyeCenter.y+')');
		farEyeBall.setAttribute('clip-path','url(#farEyeLidsClipPath_'+this.id+')');
		

		var mouthGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		headGroup.appendChild(mouthGroup);

		var lips = document.createElementNS('http://www.w3.org/2000/svg','path');
		mouthGroup.appendChild(lips);
		lips.setAttribute('fill',lipColor);
		if (this.bio('lipSize') > 1) {
			lips.setAttribute('stroke','black');
			lips.setAttribute('stroke-width',0.75);
			lips.setAttribute('stroke-linecap','round');
		};
		x = topOfMouth.x;
		y = topOfMouth.y-lipSize*0.5;
		d = 'M '+x+','+y+' ';
		dc1x = mouthPurse/2;
		dc1y = -1 * lipSize;
		dx = mouthPurse*(1+mouthSmile) + lipSize*0.25;
		dy = mouthSmile*mouthHeight*-0.5;
		dc2x = dx - mouthPurse/2;
		dc2y = dy;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		dc1x = mouthPurse/2;
		dc1y = 0;
		dx = mouthPurse * mouthSmile * -1;
		dy = mouthHeight*(1+mouthSmile) + lipSize;
		dc2x = dx + Math.abs(mouthGrimace);
		dc2y = dy - mouthGrimace;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		dc1x = -1 * Math.abs(mouthGrimace);
		dc1y = mouthGrimace + lipSize;
		dx = mouthPurse * -2 - lipSize*0.5;
		dy = 0;
		dc2x = dx + Math.abs(mouthGrimace);
		dc2y = dy + mouthGrimace + lipSize;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		dc1x = -1 * Math.abs(mouthGrimace);
		dc1y = mouthGrimace * -1;
		dx = mouthPurse * mouthSmile * -1;
		dy = mouthHeight * -1 * (1+mouthSmile) - lipSize;
		dc2x = dx - mouthPurse/2;
		dc2y = dy;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		dc1x = mouthPurse/2;
		dc1y = 0;
		dx = mouthPurse*(1+mouthSmile) + lipSize*0.25;
		dy = mouthSmile*mouthHeight*0.5;
		dc2x = dx - mouthPurse/2;
		dc2y = dy - lipSize;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		lips.setAttribute('d',d);

		var mouth = document.createElementNS('http://www.w3.org/2000/svg','path');
		mouthGroup.appendChild(mouth);
		mouth.setAttribute('stroke','black');
		mouth.setAttribute('stroke-width',0.75);
		mouth.setAttribute('stroke-linecap','round');
		mouth.setAttribute('fill',mouthColor);
		x = topOfMouth.x;
		y = topOfMouth.y;
		d = 'M '+x+','+y+' ';
		dc1x = mouthPurse/2;
		dc1y = 0;
		dx = mouthPurse*(1+mouthSmile);
		dy = mouthSmile*mouthHeight*-0.5;
		dc2x = dx - mouthPurse/2;
		dc2y = dy;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		dc1x = mouthPurse/2;
		dc1y = 0;
		dx = mouthPurse * mouthSmile * -1;
		dy = mouthHeight*(1+mouthSmile);
		dc2x = dx + Math.abs(mouthGrimace);
		dc2y = dy - mouthGrimace;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		dc1x = -1 * Math.abs(mouthGrimace);
		dc1y = mouthGrimace;
		dx = mouthPurse * -2;
		dy = 0;
		dc2x = dx + Math.abs(mouthGrimace);
		dc2y = dy + mouthGrimace;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		dc1x = -1 * Math.abs(mouthGrimace);
		dc1y = mouthGrimace * -1;
		dx = mouthPurse * mouthSmile * -1;
		dy = mouthHeight * -1 * (1+mouthSmile);
		dc2x = dx - mouthPurse/2;
		dc2y = dy;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		dc1x = mouthPurse/2;
		dc1y = 0;
		dx = mouthPurse*(1+mouthSmile);
		dy = mouthSmile*mouthHeight*0.5;
		dc2x = dx - mouthPurse/2;
		dc2y = dy;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		mouth.setAttribute('d',d);
		mouthClipPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath');
		defs.appendChild(mouthClipPath);
		mouthClipPath.id = 'mouthClipPath_'+this.id;
		mouthPath = document.createElementNS('http://www.w3.org/2000/svg','path');
		mouthClipPath.appendChild(mouthPath);
		mouthPath.setAttribute('d',d);
		
		var bottomTeeth = document.createElementNS('http://www.w3.org/2000/svg','rect');
		mouthGroup.appendChild(bottomTeeth);
		bottomTeeth.setAttribute('fill','ivory');
		bottomTeeth.setAttribute('x',topOfMouth.x-mouthPurse*2);
		bottomTeeth.setAttribute('y',topOfMouth.y+mouthHeight*0.8);
		bottomTeeth.setAttribute('height',headHeight*0.1);
		bottomTeeth.setAttribute('width',mouthPurse*4);
		bottomTeeth.setAttribute('clip-path','url(#mouthClipPath_'+this.id+')');
		
		var topTeeth = document.createElementNS('http://www.w3.org/2000/svg','rect');
		mouthGroup.appendChild(topTeeth);
		topTeeth.setAttribute('fill','ivory');
		topTeeth.setAttribute('stroke','black');
		topTeeth.setAttribute('stroke-width',0.25);
		topTeeth.setAttribute('x',topOfMouth.x-mouthPurse*2);
		topTeeth.setAttribute('y',topOfMouth.y-headHeight*0.04);
		topTeeth.setAttribute('height',headHeight*0.05);
		topTeeth.setAttribute('width',mouthPurse*4);
		topTeeth.setAttribute('clip-path','url(#mouthClipPath_'+this.id+')');
		
		// Lip Highlights (needs complementary shadow)
// 		if (this.bio('lipSize') > 1) {
// 			var nearLipHighlight = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
// 			headGroup.appendChild(nearLipHighlight);
// 			nearLipHighlight.setAttribute('cx',topOfMouth.x+mouthPurse*0.5+facing/10);
// 			nearLipHighlight.setAttribute('cy',topOfMouth.y+mouthHeight+lipSize*0.5+mouthGrimace*0.5+mouthSmile);
// 			nearLipHighlight.setAttribute('rx',mouthPurse*0.2);
// 			nearLipHighlight.setAttribute('ry',lipSize*0.2);
// 			nearLipHighlight.setAttribute('fill','white');
// 			nearLipHighlight.setAttribute('stroke','none');
// 			nearLipHighlight.setAttribute('opacity','0.3');
// 		
// 			var farLipHighlight = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
// 			headGroup.appendChild(farLipHighlight);
// 			farLipHighlight.setAttribute('cx',topOfMouth.x-mouthPurse*0.5+facing/10);
// 			farLipHighlight.setAttribute('cy',topOfMouth.y+mouthHeight+lipSize*0.5+mouthGrimace*0.5+mouthSmile);
// 			farLipHighlight.setAttribute('rx',mouthPurse*0.2);
// 			farLipHighlight.setAttribute('ry',lipSize*0.2);
// 			farLipHighlight.setAttribute('fill','white');
// 			farLipHighlight.setAttribute('stroke','none');
// 			farLipHighlight.setAttribute('opacity','0.3');
// 		};
				
		var noseGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		headGroup.appendChild(noseGroup);
		var nosePoint = document.createElementNS('http://www.w3.org/2000/svg','path');
		noseGroup.appendChild(nosePoint);
		nosePoint.setAttribute('stroke','black');
		nosePoint.setAttribute('stroke-width',1);
		nosePoint.setAttribute('stroke-linecap','round');
		nosePoint.setAttribute('fill','none');
		var noseFront = document.createElementNS('http://www.w3.org/2000/svg','path');
		noseGroup.appendChild(noseFront);
// 		noseFront.setAttribute('fill','green');
		x = noseCenter.x;
		y = noseCenter.y+noseWidth;
		d = 'M '+x+','+y+' ';
		pointD = 'M '+x+','+y+' ';
		c1x = x + 0.75*noseWidth*noseFacing;
		c1y = y;
		x = noseCenter.x + noseWidth*noseFacing;
		y = noseCenter.y;
		c2x = x;
		c2y = y+0.75*noseWidth;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		pointD += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		var tipX = x;
		var tipY = y;
		c1x = x;
		c1y = y-0.5522847*noseWidth;
		x = noseBridge.x+noseWidth*noseFacing;
		y = noseBridge.y;
		c2x = x;
		c2y = y+headHeight/12;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		pc1x = x;
		pc1y = y;
		var weight = Math.min(Math.max(this.biometrics.noseLength+5,0),11);
		px = (x*weight+tipX*(11-weight))/11;
		py = (y*weight+tipY*(11-weight))/11;
		pc2x = px;
		pc2y = py;
		pointD += 'C' + pc1x + "," + pc1y + " " + pc2x + "," + pc2y + " " + px + "," + py + " ";
		c1x = x+noseWidth*noseFacing;
		c1y = y-noseWidth*3;
		x = noseBridge.x-noseWidth*noseFacing;
		y = noseBridge.y;
		c2x = x-noseWidth*noseFacing;
		c2y = y-noseWidth*3;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		c1x = x;
		c1y = y;
		x = noseCenter.x-noseWidth*noseFacing;
		y = noseCenter.y;
		c2x = x;
		c2y = y;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		c1x = x;
		c1y = y+0.5522847*noseWidth;
		x = noseCenter.x;
		y = noseCenter.y+noseWidth;
		c2x = x-0.5522847*noseWidth*noseFacing;
		c2y = y;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		noseFront.setAttribute('d',d);
		nosePoint.setAttribute('d',pointD);
		
		var noseAla = document.createElementNS('http://www.w3.org/2000/svg','path');
		noseGroup.appendChild(noseAla);
		noseAla.setAttribute('stroke','black');
		noseAla.setAttribute('stroke-width',0.75);
		noseAla.setAttribute('stroke-linecap','round');
		noseAla.setAttribute('fill','none');
		x = headCenter.x+facing*0.9;
		y = noseCenter.y;
		d = 'M '+x+','+y+' C '+(x-noseFacing*noseWidth*0.3)+','+y+' '+(x-noseFacing*noseWidth*0.6)+','+(y+noseWidth)+' '+(x)+','+(y+noseWidth);
		noseAla.setAttribute('d',d);
		
		var nostril = document.createElementNS('http://www.w3.org/2000/svg','path');
		noseGroup.appendChild(nostril);
		nostril.setAttribute('stroke','black');
		nostril.setAttribute('stroke-width',0.75);
		nostril.setAttribute('stroke-linecap','round');
		nostril.setAttribute('fill','none');
		var nostrilLift = Math.min(2,-1 * this.pos('headNod') + Math.PI/6);
		x = headCenter.x+facing;
		y = noseCenter.y+noseWidth*0.6;
		d = 'M '+x+','+y+' ';
		d += 'C '+x+','+(y-nostrilLift*3)+' '+(noseCenter.x-noseFacing)+','+(y-nostrilLift)+' '+(noseCenter.x-noseFacing)+','+y+' ';
		nostril.setAttribute('d',d);
				
		var noseShadow = document.createElementNS('http://www.w3.org/2000/svg','path');
		noseShadow.setAttribute('fill','black');
		noseShadow.setAttribute('opacity',0.2);
		noseShadow.setAttribute('stroke','none');
		noseGroup.appendChild(noseShadow);
		x = noseCenter.x + noseWidth*noseFacing;
		y = noseCenter.y;
		var control = 0.03 * headHeight * this.bio('noseWidth');
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y+control;
		x = headCenter.x+facing*0.8;
		y = y;
		c2x = x;
		c2y = y+control;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		c1x = x;
		c1y = y+control*5;
		x = noseCenter.x + noseWidth*noseFacing;
		y = y;
		c2x = x;
		c2y = y+control*5;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		noseShadow.setAttribute('d',d);
		noseShadow.setAttribute('transform','rotate('+(-1*headTilt)+' '+(x+headCenter.x+facing)/2+' '+noseCenter.y+')');
		
		var nearEyebrowArch = 3 * this.pos('nearEyebrowArch') / Math.PI;
		var farEyebrowArch = 3 * this.pos('farEyebrowArch') / Math.PI;

		var nearEyebrowBack = document.createElementNS('http://www.w3.org/2000/svg','path');
		headGroup.appendChild(nearEyebrowBack);
		x = nearEyeCenter.x-eyeSize*1.2;
		y = nearTemple.y;
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y + nearEyebrowArch;
		x = nearEyeCenter.x+eyeSize*0.8;
		y = nearTemple.y;
		c2x = x - browSize;
		c2y = y + nearEyebrowArch;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x - browSize;
		c1y = y - headHeight/8;
		x = nearEyeCenter.x-eyeSize*1.2;
		y = nearTemple.y;
		c2x = x;
		c2y = y - headHeight/8;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		nearEyebrowBack.setAttribute('d',d);
		
		var nearEyebrow = document.createElementNS('http://www.w3.org/2000/svg','path');
		headGroup.appendChild(nearEyebrow);
		nearEyebrow.setAttribute('fill',hairColor);
		nearEyebrow.setAttribute('stroke','black');
		nearEyebrow.setAttribute('stroke-width',0.5);
		x = nearEyeCenter.x-eyeSize*1.2;
		y = nearTemple.y;
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y + nearEyebrowArch;
		x = nearEyeCenter.x+eyeSize*0.8;
		y = nearTemple.y;
		c2x = x - browSize;
		c2y = y + nearEyebrowArch;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x + browSize;
		c1y = y - nearEyebrowArch;
		x = nearEyeCenter.x+eyeSize*0.8;
		y = nearTemple.y - browSize;
		c2x = x + browSize;
		c2y = y - nearEyebrowArch;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x - browSize;
		c1y = y + nearEyebrowArch;
		x = nearEyeCenter.x-eyeSize*1.2;
		y = nearTemple.y;
		c2x = x;
		c2y = y + nearEyebrowArch;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		nearEyebrow.setAttribute('d',d);
				
		var farEyebrowBack = document.createElementNS('http://www.w3.org/2000/svg','path');
		headGroup.appendChild(farEyebrowBack);
		x = farEyeCenter.x+eyeSize*1.2;
		y = farTemple.y;
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y + farEyebrowArch;
		x = farEyeCenter.x-eyeSize*0.8;
		y = farTemple.y;
		c2x = x + browSize;
		c2y = y + farEyebrowArch;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x + browSize;
		c1y = y - headHeight/8;
		x = farEyeCenter.x+eyeSize*1.2;
		y = farTemple.y;
		c2x = x;
		c2y = y - headHeight/8;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		farEyebrowBack.setAttribute('d',d);
		
		var farEyebrow = document.createElementNS('http://www.w3.org/2000/svg','path');
		headGroup.appendChild(farEyebrow);
		farEyebrow.setAttribute('fill',hairColor);
		farEyebrow.setAttribute('stroke','black');
		farEyebrow.setAttribute('stroke-width',0.5);
		x = farEyeCenter.x+eyeSize*1.2;
		y = farTemple.y;
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y + farEyebrowArch;
		x = farEyeCenter.x-eyeSize*0.8;
		y = farTemple.y;
		c2x = x + browSize;
		c2y = y + farEyebrowArch;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x - browSize;
		c1y = y - farEyebrowArch;
		x = farEyeCenter.x-eyeSize*0.8;
		y = farTemple.y - browSize;
		c2x = x - browSize;
		c2y = y - farEyebrowArch;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x + browSize;
		c1y = y + farEyebrowArch;
		x = farEyeCenter.x+eyeSize*1.2;
		y = farTemple.y;
		c2x = x;
		c2y = y + farEyebrowArch;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		farEyebrow.setAttribute('d',d);
		
				
		// Face Guides
// 		var faceGuides = document.createElementNS('http://www.w3.org/2000/svg','g');
// 		headGroup.appendChild(faceGuides);
// 		faceGuides.setAttribute('stroke','black');
// 		faceGuides.setAttribute('stroke-width',0.05);
// 		faceGuides.setAttribute('fill','none');
// 		var verticalGuide = document.createElementNS('http://www.w3.org/2000/svg','path');
// 		faceGuides.appendChild(verticalGuide);
// 		facing = headWidth/3;
// 		if (!upperBodyAngle) {
// 			facing *= -1;
// 		};
// 		d = 'M '+headCenter.x+','+(headCenter.y-headHeight/2)+' ';
// 		d += 'C '+(headCenter.x+facing)+','+(headCenter.y-headHeight/2)+' '+(headCenter.x+facing)+','+(headCenter.y+headHeight/2)+' '+' '+(headCenter.x)+','+(headCenter.y+headHeight/2);
// 		verticalGuide.setAttribute('d',d);
// 		var middleGuide = document.createElementNS('http://www.w3.org/2000/svg','path');
// 		faceGuides.appendChild(middleGuide);
// 		var nearFacing, farFacing;
// 		var facing = 10*this.pos('headNod')/Math.PI;
// 		if (upperBodyAngle) {
// 			nearFacing = facing;
// 			farFacing  = 2*facing;
// 		} else {
// 			nearFacing = 2*facing;
// 			farFacing  = facing;
// 		};
// 		d = 'M '+(headCenter.x+headWidth/2)+','+(headCenter.y)+' ';
// 		d += 'C '+(headCenter.x+headWidth/2)+','+(headCenter.y+farFacing)+' '+(headCenter.x-headWidth/2)+','+(headCenter.y+nearFacing)+' '+' '+(headCenter.x-headWidth/2)+','+(headCenter.y);
// 		middleGuide.setAttribute('d',d);
// 		var noseGuide = document.createElementNS('http://www.w3.org/2000/svg','path');
// 		faceGuides.appendChild(noseGuide);
// 		var facing = 10*this.pos('headNod')/Math.PI;
// 		if (!upperBodyAngle) {
// 			facing *= -1;
// 		};
// 		d = 'M '+(headCenter.x+headWidth/2)+','+(headCenter.y + headHeight/4)+' ';
// 		d += 'C '+(headCenter.x+headWidth/2)+','+(headCenter.y + headHeight/4+farFacing)+' '+(headCenter.x-headWidth/2)+','+(headCenter.y + headHeight/4+nearFacing)+' '+' '+(headCenter.x-headWidth/2)+','+(headCenter.y + headHeight/4);
// 		noseGuide.setAttribute('d',d);
// 		var mouthGuide = document.createElementNS('http://www.w3.org/2000/svg','path');
// 		faceGuides.appendChild(mouthGuide);
// 		var facing = 10*this.pos('headNod')/Math.PI;
// 		if (!upperBodyAngle) {
// 			facing *= -1;
// 		};
// 		d = 'M '+(headCenter.x+headWidth/2)+','+(headCenter.y + headHeight/3)+' ';
// 		d += 'C '+(headCenter.x+headWidth/2)+','+(headCenter.y + headHeight/3+farFacing)+' '+(headCenter.x-headWidth/2)+','+(headCenter.y + headHeight/3+nearFacing)+' '+' '+(headCenter.x-headWidth/2)+','+(headCenter.y + headHeight/3);
// 		mouthGuide.setAttribute('d',d);

		var hairlineHeight = (this.biometrics.hairlineHeight+10)/20 * (headCenter.y - headHeight/2 - (farTemple.y + nearTemple.y)/2);
		var hairlinePeak = this.bio('hairlinePeak')*5;
		var nearScalpTemple = {
			x: nearTemple.x,
			y: headCenter.y-headHeight/2-hairlineHeight,
		};
		var farScalpTemple = {
			x: farTemple.x,
			y: headCenter.y-headHeight/2-hairlineHeight,
		};
		var scalpTop = {
			x: headCenter.x-headWidth*0.1,
			y: headCenter.y-headHeight*0.8,
		};
				
		var scalp = document.createElementNS('http://www.w3.org/2000/svg','g');
		headGroup.appendChild(scalp);
		scalp.setAttribute('fill',hairColor);
		var scalpHairline = document.createElementNS('http://www.w3.org/2000/svg','path');
		scalp.appendChild(scalpHairline);
		x = scalpTop.x;
		y = scalpTop.y;
		d = 'M '+x+','+y+' ';
		c1x = x - headWidth*0.5*0.55;
		c1y = y;
		x = nearScalpTemple.x;
		y = nearScalpTemple.y;
		c2x = x;
		c2y = y+hairlineHeight/2;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = (nearTemple.x+farTemple.x)/2;
		y = headCenter.y-headHeight/2-hairlineHeight-headHeight*0.05;
		c2x = x - headWidth/10;
		c2y = y-hairlinePeak;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x + headWidth/10;
		c1y = y-hairlinePeak;
		x = farScalpTemple.x;
		y = farScalpTemple.y;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y+hairlineHeight/2;
		x = scalpTop.x;
		y = scalpTop.y;
		c2x = x + headWidth*0.5*0.55;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		d += 'z';
		scalpHairline.setAttribute('d',d);
		scalpHairline.setAttribute('clip-path','url(#skullPath_'+this.id+')');
		var scalpSide = document.createElementNS('http://www.w3.org/2000/svg','path');
		scalp.appendChild(scalpSide);
		var sideEar, sideTemple;
		if (facing > 0) {
			sideEar = nearEarCenter;
			sideTemple = nearScalpTemple;
		} else {
			sideEar = farEarCenter;
			sideTemple = farScalpTemple;
		};
		x = sideEar.x;
		y = sideEar.y+headHeight/8;
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = sideTemple.x;
		y = sideTemple.y;
		c2x = x - facing*0.8;
		c2y = y + headHeight*0.1;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = scalpTop.x;
		y = scalpTop.y;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x - facing*2;
		c1y = y;
		x = sideEar.x;
		y = sideEar.y+headHeight/8;
		c2x = x-facing*3;
		c2y = y-headHeight/2;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		scalpSide.setAttribute('d',d);
		scalpSide.setAttribute('clip-path','url(#skullPath_'+this.id+')');
		
		var earWidth = this.bio('earWidth')*15;
		var earHeight = this.bio('earHeight')*20;
		var earPoint = 5 - this.bio('earPoint');
		var earLobe = this.bio('earLobe')*2;
		var ear = document.createElementNS('http://www.w3.org/2000/svg','g');
		headGroup.appendChild(ear);
		ear.setAttribute('stroke','black');
		ear.setAttribute('stroke-width',1);
		ear.setAttribute('stroke-linecap','round');
		var outerEar = document.createElementNS('http://www.w3.org/2000/svg','path');
		ear.appendChild(outerEar);
		x = sideEar.x + earWidth*0.5*headFacing;
		y = sideEar.y;
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = x - earWidth*0.75*headFacing;
		y = y - earHeight*0.2;
		c2x = x + earPoint*headFacing;
		c2y = y - earPoint;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x - earPoint*headFacing;
		c1y = y + earPoint;
		x = x + earWidth*0.25*headFacing;
		y = y + earHeight;
		c2x = x - earWidth*0.1*headFacing;
		c2y = y-earLobe;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x + earWidth*0.1*headFacing;
		c1y = y+earLobe;
		x = x + earWidth*0.5*headFacing;
		y = y;
		c2x = x - earLobe*headFacing;
		c2y = y+earLobe;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		outerEar.setAttribute('d',d);
		var innerEar = document.createElementNS('http://www.w3.org/2000/svg','path');
		ear.appendChild(innerEar);
		innerEar.setAttribute('stroke-width',0.75);
		x = sideEar.x + earWidth*0.5*headFacing;
		y = sideEar.y + earHeight*0.5;
		d = 'M '+x+','+y+' ';
		c1x = x - earWidth*0.2*headFacing;
		c1y = y - earHeight*0.1;
		x = x - earWidth*0.1*headFacing;
		y = y - earHeight*0.3;
		c2x = x - earWidth*0.2*headFacing;
		c2y = y + earHeight*0.1;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y - earHeight*0.1;
		x = x - earWidth*0.41*headFacing;
		y = y - earHeight*0.3;
		c2x = x + earWidth*0.1*headFacing;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		innerEar.setAttribute('d',d);

		var hair = document.createElementNS('http://www.w3.org/2000/svg','g');
		hair.id = 'hair_'+this.id;
		hair.setAttribute('transform','translate('+headSlide+',0) rotate('+headTilt+','+headCenter.x+','+headCenter.y+')');
		
		var neck = document.createElementNS('http://www.w3.org/2000/svg','g');
		neck.id = 'neck_'+this.id;
		neck.setAttribute('fill',skinTone);
		neck.setAttribute('stroke','inherit');
		var neckPath = document.createElementNS('http://www.w3.org/2000/svg','polyline');
		neck.appendChild(neckPath);
		var neckPoints = [
			nearNeck,
			{x:headCenter.x+headSlide,y:headCenter.y},
			farNeck,
		];
		var neckPointsString = '';
		for (var i in neckPoints) {
			neckPointsString += neckPoints[i].x + ',' + neckPoints[i].y + ' ';
		};
		neckPath.setAttribute('points',neckPointsString);
		
		// Order the Stack
		
		var lapSizedBreasts = Math.max(nearBreastCenter.y + breastSize,farBreastCenter.y + breastSize) > Math.min(nearHip.y - this.bio('hipsWidth') * 30,farHip.y - this.bio('hipsWidth') * 30);
		var bigBelly = farBellyBottom.y > farHaunch.y || nearBellyBottom.y > nearHaunch.y;
		
		var bodyParts = [hairBack,shoulders];
		
		if (lowerBodyAngle) {
			bodyParts = bodyParts.concat([butt,farFoot,farCalf,farThigh]);
		} else {
			bodyParts = bodyParts.concat([butt,nearFoot,nearCalf,nearThigh]);
		};
		
		if (upperBodyAngle) {
			bodyParts = bodyParts.concat([farElbowJoint,farUpperArm,farLowerArm,farHand]);
		} else {
			bodyParts = bodyParts.concat([nearElbowJoint,nearUpperArm,nearLowerArm]);
			bodyParts = bodyParts.concat(nearHandArray);
		};
		
		torso.appendChild(belly);
		bodyParts = bodyParts.concat([torso,neck,genitals,phallus]);

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
		
		bodyParts = bodyParts.concat([headGroup,hair]);
		
		if (upperBodyAngle) {
			bodyParts = bodyParts.concat([nearElbowJoint,nearUpperArm,nearLowerArm]);
			bodyParts = bodyParts.concat(nearHandArray);
		} else {
			bodyParts = bodyParts.concat([farElbowJoint,farUpperArm,farLowerArm,farHand]);
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
				stroke.setAttribute('stroke-width',3);
				svg.appendChild(stroke);
			};
			svg.appendChild(i);
		};

//		Wireframe (Old)
// 		var wireframe = document.createElementNS('http://www.w3.org/2000/svg','g');
// 		svg.appendChild(wireframe);
// 		wireframe.setAttribute('fill','none');
// 		wireframe.setAttribute('stroke','red');
// 		wireframe.setAttribute('stroke-width',3);
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
// 		var spine = document.createElementNS('http://www.w3.org/2000/svg','line');
// 		wireframe.appendChild(spine);
// 		spine.setAttribute('x1',neckBase.x);
// 		spine.setAttribute('y1',neckBase.y);
// 		spine.setAttribute('x2',spineBase.x);
// 		spine.setAttribute('y2',spineBase.y);
// 		spine.setAttribute('points',pointsString);
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
// 		var head = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
// 		wireframe.appendChild(head);
// 		head.setAttribute('cx',0);
// 		head.setAttribute('cy',shouldersHeight - neckHeight - headHeight/2);
// 		head.setAttribute('rx',headWidth/2);
// 		head.setAttribute('ry',headHeight/2);

		
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
		var moneyShot = document.createElementNS('http://www.w3.org/2000/svg','rect');
		moneyShot.id = 'moneyShot';
		moneyShot.setAttribute('x',genitalsBottom.x - 100);
		moneyShot.setAttribute('y',genitalsBottom.y - 100);
		moneyShot.setAttribute('width',200);
		moneyShot.setAttribute('height',200);
		moneyShot.setAttribute('fill','none');
		shots.appendChild(moneyShot);
		var handShot = document.createElementNS('http://www.w3.org/2000/svg','rect');
		handShot.id = 'handShot';
		handShot.setAttribute('x',nearWrist.x - 75);
		handShot.setAttribute('y',nearWrist.y - 75);
		handShot.setAttribute('width',150);
		handShot.setAttribute('height',150);
		handShot.setAttribute('fill','none');
		shots.appendChild(handShot);
					
		return svg;
	};
};


function MorfologyGarment() {
	this.type = ['bodysuit','top','bottom','hat','shoeLeft', 'shoeRight', 'gloveLeft', 'gloveRight'][Math.random() * 5 << 0];
	this.collarHeight = Math.random(); // used for bottoms waist
	this.sleveHeight = Math.random();
	this.sleveFlare = Math.random();
	this.sleeveElbowTight = Math.random();
	this.waistHeight = Math.random();
	this.waistFlare = Math.random();
	this.leggingHeight = Math.random();
	this.leggingFlare = Math.random();
	this.leggingKneeTight = Math.random();
	this.hemHeight = Math.random(); // shirt hem, skirt hem, dress hem
	this.hemFlare = Math.random();
	this.color = 'red';
};
