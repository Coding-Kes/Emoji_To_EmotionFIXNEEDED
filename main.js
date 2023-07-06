
prediction_1 = ""
prediction_2 = ""

Webcam.set({
    height:300,
    width:350,
    image_format:"png",
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5.version: ', ml5.version);

classifer =
ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/qsTqKuX8r/model.json",modelLoaded);

function modelLoaded()
{
    console.log("modelLoaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " +prediction_1;
    speak_data_2 = "The second prediction is " +prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}

 function predict_emotion()
 {
    img = document.getElementById('captured_image');
    classifer.classify(img, gotResult);
 }

 function gotResult(error, results)
 {
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);

        document.getElementById("result_emotion_name1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;

        prediction_1 = result[0].label;
        prediction_2 = results[1].label;

        speak();

        if(results[0].label == "Happy")
        {
            document.getElementById("update_emotion1").innerHTML = "&#128522;";
        }
        if(results[0].label == "Generic")
        {
            document.getElementById("update_emotion1").innerHTML = "&#128528;";
        }
        if(results[0].label == "Sad")
        {
            document.getElementById("update_emotion1").innerHTML = "&#128532;";
        }
        if(results[0].label == "Angry")
        {
            document.getElementById("update_emotion1").innerHTML = "&#128548;";
        }


        if(results[1].label == "Happy")
        {
            document.getElementById("update_emotion2").innerHTML = "&#128522;";
        }
        if(results[1].label == "Generic")
        {
            document.getElementById("update_emotion2").innerHTML = "&#128528;";
        }
        if(results[1].label == "Sad")
        {
            document.getElementById("update_emotion2").innerHTML = "&#128532;";
        }
        if(results[1].label == "Angry")
        {
            document.getElementById("update_emotion2").innerHTML = "&#128548;";
        }
    }
 }

