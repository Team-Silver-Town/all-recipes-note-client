export const playText = (text) => {
  //44 Yuna,  59 Google 한국
  let voices = [];
  voices = window.speechSynthesis.getVoices();
  const voiceType = voices[59];

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 1;
  utterance.voice = voiceType;
  speechSynthesis.speak(utterance);
};
