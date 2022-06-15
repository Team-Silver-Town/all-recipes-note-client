import { useEffect, useState } from "react";
import { grammar } from "../config/speechConfig";
import * as commands from "../constants/voice-command";

const useRecipeControlBySpeech = (
  video,
  likeButton,
  dislikeButton,
  toRankingsButton,
  toRecipesButton,
  toMyNoteButton,
  toNoteListButton,
  toTipListButton
) => {
  const [speechToText, setSpeechToText] = useState("");
  const [isCommanding, setCommanding] = useState(false);

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

  useEffect(() => {
    console.log(speechToText);
    if (speechToText.includes(commands.START_COMMAND)) {
      setCommanding(true);
    }

    if (isCommanding) {
      if (speechToText.includes(commands.PLAY_VIDEO)) {
        video.playVideo();
      } else if (speechToText.includes(commands.STOP_VIDEO)) {
        video.pauseVideo();
      } else if (speechToText.includes(commands.SEEK_FORWARD)) {
        video.seekTo(video.getCurrentTime() + commands.SEEK_TIME, true);
      } else if (speechToText.includes(commands.SEEK_BACKWARD)) {
        video.seekTo(video.getCurrentTime() - commands.SEEK_TIME, true);
      } else if (speechToText.includes(commands.OPEN_NOTE)) {
        toMyNoteButton.click();
      } else if (speechToText.includes(commands.TO_NOTELIST)) {
        toNoteListButton.click();
      } else if (speechToText.includes(commands.TO_TIPS)) {
        toTipListButton.click();
      } else if (speechToText.includes(commands.LIKE_RECIPE)) {
        likeButton.click();
      } else if (speechToText.includes(commands.DISLIKE_RECIPE)) {
        dislikeButton.click();
      } else if (speechToText.includes(commands.TO_RECIPES)) {
        toRecipesButton.click();
      } else if (speechToText.includes(commands.TO_RANKINGS)) {
        toRankingsButton.click();
      }
      setCommanding(false);
    }
    return () => recognition.stop();
  }, [speechToText]);

  return {
    recognition,
    speechToText,
    isCommanding,
  };
};

export default useRecipeControlBySpeech;
