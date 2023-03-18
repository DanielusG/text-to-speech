
let voices = [];
let rate = 1;
let volume = 1;
let pitch = 1;
let voice = 0;
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  
  let voiceSelect = document.querySelector("#voices");
  let i = 0,k=0;
  for(let voice in voices){
    if(voices[voice].lang === "it-IT"){
      voiceSelect.options[k] = new Option(voices[voice].name, i);
      k++;
    }
    i++;
  }
};

document.querySelector("#rate").addEventListener("input", () => {
  const rateL = document.querySelector("#rate").value;
  rate = rateL;
  document.querySelector("#rate-label").innerHTML = rate;
});

document.querySelector("#volume").addEventListener("input", () => {
  const volumeL = document.querySelector("#volume").value;
  volume = volumeL;
  document.querySelector("#volume-label").innerHTML = volume;
});

document.querySelector("#pitch").addEventListener("input", () => {
  const pitchL = document.querySelector("#pitch").value;
  pitch = pitchL;
  document.querySelector("#pitch-label").innerHTML = pitch;
});

document.querySelector("#voices").addEventListener("change", () => {
  voice = voices[document.querySelector("#voices").value];
});

document.querySelector("#start").addEventListener("click", () => {
  let speech = new SpeechSynthesisUtterance();
      speech.lang = "it";
      speech.voice = voices[160];
      speech.text = document.querySelector("textarea").value;
      
      speech.addEventListener("start", (event) => {
        console.log(event.elapsedTime);
      });

      speech.addEventListener("end", (event) => {
        console.log(event.elapsedTime);
        document.querySelector("#durata").innerHTML = event.elapsedTime/1000 + "s";
      });
      
      window.speechSynthesis.speak(speech);
      console.log(listSpeech.length);


});



document.querySelector("#resume").addEventListener("click", () => {
  window.speechSynthesis.resume();
});

document.querySelector("#cancel").addEventListener("click", () => {
  window.speechSynthesis.cancel();
});
let listLines = [];
let listSpeech = []; 
let file = document.getElementById("readfile");
file.addEventListener("change", function () {
var reader = new FileReader();
  reader.onload = function (progressEvent) {
    listLines = this.result.split("\n");
    document.querySelector("#dataset-length").innerHTML = listLines.length;
    for(let i = 0; i < listLines.length; i++){
      let speech = new SpeechSynthesisUtterance();
      speech.lang = "it";
      speech.voice = voices[160];
      speech.text = listLines[i];
      
      speech.addEventListener("start", (event) => {
        console.log(event.elapsedTime);
      });

      speech.addEventListener("end", (event) => {
        console.log(event.elapsedTime);
        document.querySelector("textarea").value += `${listLines[i]}|${event.elapsedTime}\n`;
        document.querySelector("#Progress").innerHTML = `${i}/${listLines.length}`;
        speak();
      });
      
      listSpeech.push(speech);
      console.log(listSpeech.length);
    }
    speak();
    console.log("aaaa")
    
  };
  reader.readAsText(this.files[0]);

});
var index = 0;
function speak() {
  index++;
  if(index >= listSpeech.length)
      return;

  window.speechSynthesis.speak(listSpeech[index]);
}
