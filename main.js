objects = []
video=""
status=""
function setup(){
    canvas=createCanvas(600,450);
    canvas.center()
}
function preload(){
    video=createVideo("video.mp4");
    video.hide();
    
}
function draw(){
    image(video, 0,0,600,450);
    if(status != ""){
        objectDetector.detect(video, gotresult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Objects Detected"
            document.getElementById("num").innerHTML="Objects: " + objects.length;
            fill("#4287f5");
            percent = floor(objects[i].confidence*100)
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill()
            stroke("#4287f5")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
}
function start(){
    objectDetector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects"
}
function modelloaded(){
    console.log("modelloaded");
    status=true;
    video.loop()
    video.speed(1);
    video.volume(0);
}
function gotresult(error, results){
    if(error){
        console.log(error);

    }
    else{
        console.log(results);
        objects = results;
    }
}
