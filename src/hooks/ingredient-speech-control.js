import { useEffect, useState } from "react";
import { grammar } from "../config/speechConfig";
import * as commands from "../constants/voice-command";
import { parseIngredientsFromSpeech } from "../utils/voiceHelper";

const useIngredientControlbySpeech = (
  setIngredient,
  setPortion,
  setUnit,
  doneButton,
  addButton
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
      const { ingredient, portion, unit } =
        parseIngredientsFromSpeech(speechToText);

      setIngredient(ingredient);
      setPortion(portion);
      setUnit(unit);
    }
    return () => recognition.stop();
  }, [speechToText]);

  return [recognition, speechToText, isCommanding];
};

export default useIngredientControlbySpeech;
