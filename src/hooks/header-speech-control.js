import { useEffect, useState } from "react";
import { grammar } from "../config/speechConfig";
import * as commands from "../constants/voice-command";

const useHeaderSpeechControl = (toHomeLink, toRecipeLink, toRankLink) => {
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
      if (speechToText.includes("홈으로 이동")) {
        toHomeLink.click();
      } else if (speechToText.includes("레시피로 이동")) {
        toRecipeLink.click();
      } else if (speechToText.includes("랭킹으로 이동")) {
        toRankLink.click();
      }

      setCommanding(false);
    }

    return () => recognition.stop();
  }, [speechToText]);

  return [recognition, speechToText, isCommanding];
};

export default useHeaderSpeechControl;
