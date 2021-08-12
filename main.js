status = "";
object = "";
objects = [];

function setup()
{
    canvas = createCanvas(450, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 450, 400);
    if (status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++) 
        {
             document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected: " + objects.length;
             console.log(objects[i].label);
             fill("red");
             precent = floor(objects[i].confidence * 100);
             if(objects[i].label == object) 
             {
                document.getElementById("status").innerHTML = "Status: Object Detected";
                video.stop();
             }
        }
    }
}


function gotResult(error, results) 
{
    if (error) 
    {
        console.error(error);
    }
    console.log(results)
    objects = results;
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object = document.getElementById("object_input").value;
    console.log(object);
    speak();
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
}

function speak() 
{
    var synth = window.speechSynthesis;

    speak_data = object + "Detected";

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis)
}