
//rescale distance between Earth + Luna
//create better graphics for Earth + Luna
//make responsive to touch

/*
>Earth's radius is 6,371 km
>luna's radius is 1,737 km (little more than 1/4 the Earth's)
>30 Earths could fit between Earth and the luna.
>The time-averaged distance between Earth and luna centers is 385,000.6 km (239,228.3 mi).
>
>
*/

function init() {

    var canvas = document.getElementById("my-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var stage = new createjs.Stage("my-canvas");
    var background = document.getElementById("star-field");
    var bkCtx = background.getContext("2d");

    var backgroundImage = RandomStarsImage(),
        earthImg = document.getElementById("earth"),
        lunaImg = document.getElementById("luna");

    var /*topContainer = new firsara.TransformClip(),*/
        earth = new createjs.Bitmap(earthImg),       
        earthX = background.width,
        earthY = background.height,
        luna = new createjs.Bitmap(lunaImg), 
        radius = 1208,
        inc = 0,
        zoom;
        
    earth.setTransform(earthX, earthY, 0.1, 0.1, 0, 0, 0, 400, 400);
    luna.setTransform(earthX, earthY + radius, 0.1 / 3.67, 0.1 / 3.67, 0, 0, 0, 400, 400);
    stage.addChild(earth, luna);
    //stage.addChild(topContainer);

    canvas.addEventListener("mousewheel", mouseWheelHandler, false);
    canvas.addEventListener("DOMMouseScroll", mouseWheelHandler, false);
    stage.addEventListener("stagemousedown", function (e) {
        var offset = { x: stage.x - e.stageX, y: stage.y - e.stageY };
        stage.addEventListener("stagemousemove", function (ev) {
            stage.x = ev.stageX + offset.x;
            stage.y = ev.stageY + offset.y;
        });
        stage.addEventListener("stagemouseup", function () {
            stage.removeAllEventListeners("stagemousemove");
        });
    });

    createjs.Touch.enable(stage, false, false);
    createjs.Ticker.framerate = 20;
    createjs.Ticker.addEventListener('tick', stage);

    function mouseWheelHandler(e) {
        if (Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) > 0)
            zoom = 1.1;
        else
            zoom = 1 / 1.1;
        var local = stage.globalToLocal(stage.mouseX, stage.mouseY);
        stage.regX = local.x;
        stage.regY = local.y;
        stage.x = stage.mouseX;
        stage.y = stage.mouseY;
        stage.scaleX = stage.scaleY *= zoom;
    }

    function RandomStarsImage() {

        // draw a random starfield on the canvas
        bkCtx.beginPath();
        bkCtx.fillStyle = "black";
        bkCtx.rect(0, 0, background.width, background.height);
        bkCtx.fill();
        bkCtx.beginPath();
        for (var n = 0; n < 200; n++) {
            var x = parseInt(Math.random() * background.width);
            var y = parseInt(Math.random() * background.height);
            var side = Math.random() * 0.6 + 0.3;
            bkCtx.rect(x, y, side, side);
        }
        bkCtx.fillStyle = "white";
        bkCtx.fill();

        // create an new image using the starfield canvas
        var img = document.createElement("img");
        img.src = background.toDataURL();
        return (img);
    }

    //Makes Luna rotate around the Earth
    /*
    luna.addEventListener('tick', (e) => {
        var luna = e.currentTarget;
      luna.x = earthX + radius * Math.cos(inc++/600);
      luna.y = earthY + radius * Math.sin(inc++/600);
    });
    */
}