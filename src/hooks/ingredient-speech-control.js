import { useEffect, useState } from "react";
import { grammar } from "../config/speechConfig";
import {
  ADD_INGREDIENT,
  FINISH_ADD_INGREDIENT,
  SIRI_SAY_ADDED_INGREDIENTS,
} from "../constants/voice-command";
import { playText } from "../utils/speechSynthesis";
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
    if (speechToText.includes(ADD_INGREDIENT)) {
      setCommanding(true);
    }

    if (speechToText.includes(FINISH_ADD_INGREDIENT)) {
      doneButton.click();
      playText(SIRI_SAY_ADDED_INGREDIENTS);

      setCommanding(false);
    }

    if (isCommanding) {
      const { ingredient, portion, unit } =
        parseIngredientsFromSpeech(speechToText);

      setIngredient(ingredient);
      setPortion(portion);
      setUnit(unit);

      addButton.click();
    }

    return () => recognition.stop();
  }, [speechToText]);

  return [recognition, speechToText, isCommanding];
};

export default useIngredientControlbySpeech;
