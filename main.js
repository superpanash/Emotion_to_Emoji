var prediction1="";
var prediction2="";

Webcam.set({

    width : 350 ,
    height : 300 ,
    image_format : "png" ,
    png_quality :  90

});

camera=document.getElementById("camera");

Webcam.attach("#camera");

function snapshot(){

    Webcam.snap(function(data_uri){

        document.getElementById("result").innerHTML="<img id='captured_img' src='"+data_uri+"'>"
    })

}

console.log("ml5 version : ",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/vDh90vT4H/model.json",modelLoaded)

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data1="The first Prediction is :"+prediction1;
    speak_data2="the Second Prediction is : "+prediction2;
    var utter_this=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utter_this);
}

function prediction(){
    img=document.getElementById("captured_img");
    classifier.classify(img,got_result)
}

function got_result(error,results){

if(error){
    console.log(error)
    }

    else{

        console.log(results)
        document.getElementById("result_emotion_name").innerHTML= results[0].label;
        document.getElementById("result_emotion_name2").innerHTML= results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;

        speak()

     if(results[0].label=="Happy"){
        document.getElementById("update_emoji").innerHTML="&#128512;"
     }   


    if(results[0].label=="Sad"){
        document.getElementById("update_emoji").innerHTML="&#128532;"
    }

    if(results[0].label=="Angry"){
        document.getElementById("update_emoji").innerHTML="&#128545;"
    }


    if(results[1].label=="Happy"){
        document.getElementById("update_emoji2").innerHTML="&#128512;"
     }   


    if(results[1].label=="Sad"){
        document.getElementById("update_emoji2").innerHTML="&#128532;"
    }

    if(results[1].label=="Angry"){
        document.getElementById("update_emoji2").innerHTML="&#128545;"
    }



    }

}