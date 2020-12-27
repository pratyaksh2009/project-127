song="";
leftwristx=0;
leftwristy=0;
rightwritx=0;
rightwrity=0;
scoreleftwrist=0;
scorerighttwrist=0;

function preload(){
 song=loadSound("music2.mp3");
}

function setup(){
 canvas=createCanvas(600,500);
 canvas.center();
 video=createCapture(VIDEO);
 video.hide();
 poseNet=ml5.poseNet(video,modelloaded);
 poseNet.on('pose',gotposes);
}

function modelloaded(){
  console.log("posenet is initilized");
}

function draw(){
  image(video,0,0,600,500);
  fill("#ff0000");
  stroke("#ff0000")
  if(scoreleftwrist>0.2){
    circle(leftwristx,leftwristy,20);
    Numberleftwristy=Number(leftwristy);
    remove_disimals=floor(Numberleftwristy);
    Volume=remove_disimals/500;
    document.getElementById("volume").innerHTML="volume"+Volume;
    song.setVolume(Volume);
  }
}

function play(){
 song.play();
 song.setVolume(1);
 song.rate(1);
}

function gotposes(results){
  if(results.length>0){
    console.log(results);
    scoreleftwrist=results[0].pose.keypoints[9].score;
    console.log("scoreleftwrist"+scoreleftwrist);
    rightwritx=results[0].pose.rightWrist.x;
    rightwrity=results[0].pose.rightWrist.y;
    leftwristx=results[0].pose.leftWrist.x;
    leftwritsy=results[0].pose.leftWrist.y;
  }
}
