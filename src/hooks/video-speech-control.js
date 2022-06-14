import { useEffect, useState } from "react";
import { grammar } from "../config/speechConfig";

const useVideoControlBySpeech = (video) => {
  const [speechToText, setSpeechToText] = useState("");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);

  recognition.grammars = speechRecognitionList;
  recognition.continuous = true;
  recognition.lang = "ko-KR";
  recognition.interimResults = true;
  recognition.maxAlternatives = 1000;

  recognition.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        setSpeechToText(transcript.trim());
      }
    }
  };

  const startVideo = () => {
    video.playVideo();
  };

  const seekVideoForward = () => {
    video.seekTo(video.getCurrentTime() + 15, true);
  };

  const seekVideoBackward = () => {
    video.seekTo(video.getCurrentTime() - 15, true);
  };

  const stopVideo = function () {
    video.pauseVideo();
  };

  useEffect(() => {
    console.log(speechToText);
    if (speechToText.includes("영상 시작")) {
      startVideo();
    } else if (speechToText.includes("영상 멈춰")) {
      stopVideo();
    } else if (speechToText.includes("영상 앞으로")) {
      seekVideoForward();
    } else if (speechToText.includes("영상 뒤로")) {
      seekVideoBackward();
    }

    return () => recognition.stop();
  }, [speechToText]);

  return recognition;
};

export default useVideoControlBySpeech;
