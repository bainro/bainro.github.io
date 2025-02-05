(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:



// stage content:
(lib.Untitled1 = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000099").s().p("AhNBOQggggAAguQAAgtAgggQAhggAsAAQAuAAAgAgQAgAgAAAtQAAAuggAgQggAgguAAQgsAAghggg");
	this.shape.setTransform(218.5,130.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#fff").s().p("AhNBOQggggAAguQAAgtAgggQAhggAsAAQAuAAAgAgQAgAgAAAtQAAAuggAgQggAgguAAQgsAAghggg");
	this.shape_1.setTransform(330.5,246.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#fff").s().p("AhNBOQggggAAguQAAgtAgggQAhggAsAAQAuAAAgAgQAgAgAAAtQAAAuggAgQggAgguAAQgsAAghggg");
	this.shape_2.setTransform(275.5,200.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000099").s().p("AhNBOQggggAAguQAAgtAgggQAhggAsAAQAuAAAgAgQAgAgAAAtQAAAuggAgQggAgguAAQgsAAghggg");
	this.shape_3.setTransform(418,259.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	//replay btn
	this.replay_btn = new createjs.Bitmap("./replay.png");
	this.replay_btn.setTransform(10, 10);
	this.replay_btn.scaleX = .25;
	this.replay_btn.scaleY = .25;

	this.timeline.addTween(cjs.Tween.get(this.replay_btn).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#336600").s().p("Egq9AfRMAAAg+hMBV7AAAMAAAA+hgASKi4QApADAzAgQAcARA5AmQBNArBZgMQBdgNAshFQBLAHAqgCQBBgCAwgTQA5gXAjgyQAlg1gLg2QBKgCAygOQBBgTAjgsQAogzgEhSQgEg8gehUQgNgmACgSQACgKAFgMIAJgUQAKgXAFgfQADgSADgmQAGhSgGgvQgIhHglgqQgJgKgagXQgXgUgKgPQgSgYgQg/QgQg8gUgZQgbghgzgPQgigKg9gFQgqg6g/glQg/gmhHgJQgjgEhYADQhOACgrgJQgdgGgpgRIhEgcQhVgfhTAFQhbAFhAAxIggAbQgTAPgQAHQgeAOg5gCQhEgDgXAFQgmAIghAcQgeAZgVAlQgSAggNAqQgIAagNA1QgfgKgjAMQghAKgZAaQgoAqgSBPQgVBdARBeQAEAbAMAvIASBJQAJArALBWQANBLAeAtQAdAsAwAZQAwAaA1gBQgNBJAzBBQAzBABKAFQAdACA6gFQA0gBAbAVQALAIASAWQARAWAMAIQAbASAzgFQBJgIALAAIABAAg");
	this.shape_4.setTransform(276.1,201);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(276.1,200.9,549.9,400.2);
// library properties:
lib.properties = {
	id: '6055C4A2FCD0C04AB11049D1CC5C8BAF',
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['6055C4A2FCD0C04AB11049D1CC5C8BAF'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;