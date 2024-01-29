function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifire=ml5.imageClassifier('MobileNet',modelLoaded);
}
function modelLoaded(){
  console.log('modelLoaded');
}
function draw(){
  image(video,0,0,300,300);
  classifire.classify(video,gotResult)
}
var previousResult="";
function gotResult(error,results){
  if(error){
    console.error(error);
  }
  else{
    if((results[0].confidence > 0.5)&&(previousResult!=results[0].label))
  {
    console.log(results);
    previousResult=results[0].label;
    var synth=window.speechSynthesis;
    speak_data="object detected is - "+results[0].label;
    var utterthis=new SpeechSynthesisUtterance(speak_data)
    synth.speak(utterthis)
    document.getElementById("result_object_name").innerHTML=results[0].label;
    document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(3);
  }
  }
}

