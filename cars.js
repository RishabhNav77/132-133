img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("downloadijabijateeja.jpg");
}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    object_detector = ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    

}

function draw() {
    image(img,0,0,380,380);
    if(status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
       
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("numberofobjects").innerHTML = "Number Of Objects Detected Are :" + " " + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15 );
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}

function modelloaded() {
    console.log("Model is loaded");
    status = true;
    object_detector.detect(img,gotRESULT);
}

function gotRESULT(error,results) {
    if(error) {
        console.error(error);
    }

    else{
        console.log(results);
        objects = results;
    }
}