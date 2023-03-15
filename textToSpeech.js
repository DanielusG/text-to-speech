let speech = new SpeechSynthesisUtterance();
speech.lang = "it";

let voices = [];
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[160];
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
  const rate = document.querySelector("#rate").value;
  speech.rate = rate;
  document.querySelector("#rate-label").innerHTML = rate;
});

document.querySelector("#volume").addEventListener("input", () => {
  const volume = document.querySelector("#volume").value;
  speech.volume = volume;
  document.querySelector("#volume-label").innerHTML = volume;
});

document.querySelector("#pitch").addEventListener("input", () => {
  const pitch = document.querySelector("#pitch").value;
  speech.pitch = pitch;
  document.querySelector("#pitch-label").innerHTML = pitch;
});

document.querySelector("#voices").addEventListener("change", () => {
  speech.voice = voices[document.querySelector("#voices").value];
});

document.querySelector("#start").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  speech.addEventListener("start", (event) => {
    console.log(event.elapsedTime);
  });

  speech.addEventListener("end", (event) => {
    console.log(event.elapsedTime);
  });
  speech.addEventListener("boundary", (event) => {
    console.log(
      `Parola: ${speech.text.substring(event.charIndex,event.charIndex+event.charLength)}`
    );
  });
  
  window.speechSynthesis.speak(speech);


});

document.querySelector("#pause").addEventListener("click", () => {
  window.speechSynthesis.pause();
});

document.querySelector("#resume").addEventListener("click", () => {
  window.speechSynthesis.resume();
});

document.querySelector("#cancel").addEventListener("click", () => {
  window.speechSynthesis.cancel();
});
