NoseX = 0;
NoseY = 0;
rightWristX = 0;
leftWristX = 0;
difference = 0;

function setup()
{
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 550);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose' , gotPoses)
}

function modelLoaded() 
{
    console.log('PoseNet Is Initialized')
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        NoseX = results[0].pose.nose.x;
        NoseY = results[0].pose.nose.y;
        console.log("noseX = " + NoseX + "NoseY = " + NoseY)

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);

        console.log("Left Wrist = " + leftWristX + "Right Wrist " + rightWristX);
        console.log("difference: " + difference);
    }
}

function draw()
{
    background('#fcec03');
    fill('#f000fc');
    stroke('#74007a');
    square(NoseX , NoseY , difference);
    document.getElementById("square_side").innerHTML = "Width and height of the square will be " + difference + "px";
}