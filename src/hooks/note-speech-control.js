import { useEffect, useState } from "react";
import { grammar } from "../config/speechConfig";
import * as commands from "../constants/voice-command";
import { playText } from "../utils/speechSynthesis";

const useNoteControlBySpeech = (
  note,
  ingredientsButton,
  saveButton,
  deleteButton,
  setIsVisible,
  openNoteList,
  video,
  ingredients
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
        playText(commands.SIRI_SAY_PLAY_VIDEO);
        setTimeout(() => {
          video.playVideo();
        }, 2000);
      } else if (speechToText.includes(commands.STOP_VIDEO)) {
        playText(commands.SIRI_SAY_PAUSE_VIDEO);
        setTimeout(() => {
          video.pauseVideo();
        }, 2000);
      } else if (speechToText.includes(commands.SEEK_FORWARD)) {
        video.seekTo(video.getCurrentTime() + commands.SEEK_TIME, true);
      } else if (speechToText.includes(commands.SEEK_BACKWARD)) {
        video.seekTo(video.getCurrentTime() - commands.SEEK_TIME, true);
      } else if (speechToText.includes(commands.TO_INGREDIENTS)) {
        ingredientsButton.click();
      } else if (speechToText.includes(commands.SAVE_NOTE)) {
        saveButton.click();
        playText(commands.SIRI_SAY_SAVED_NOTE);
      } else if (speechToText.includes(commands.DELETE_NOTE)) {
        deleteButton.click();
        playText(commands.SIRI_SAY_DELETED_NOTE);
      } else if (speechToText.includes(commands.SET_PRIVATE)) {
        setIsVisible(false);
        playText(commands.SIRI_SAY_NOTE_PRIVATE);
      } else if (speechToText.includes(commands.SET_PUBLIC)) {
        setIsVisible(true);
        playText(commands.SIRI_SAY_NOTE_PUBLIC);
      } else if (speechToText.includes(commands.TO_NOTELIST)) {
        openNoteList("notes");
      } else if (speechToText.includes(commands.READ_NOTE)) {
        playText(commands.SIRI_READ_NOTE);
        playText(note.value);
      } else if (speechToText.includes(commands.READ_INGREDIENTS)) {
        playText(commands.SIRI_READ_INGREDIENTS);
        ingredients.forEach((ingredient) => {
          const ingredientText = ingredient.split("-").join(" ");
          playText(ingredientText);
        });
      }
      setCommanding(false);
    }
    return () => recognition.stop();
  }, [speechToText]);

  return [recognition, speechToText, isCommanding];
};

export default useNoteControlBySpeech;
