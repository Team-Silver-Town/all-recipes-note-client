import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { grammar } from "../config/speechConfig";
import * as commands from "../constants/voice-command";

const useRankingControlBySpeech = (
  showLatestRanking,
  showTotalRanking,
  showKoreanRanking,
  showForeignRanking,
  showNoteRanking,
  showTipRanking
) => {
  const [speechToText, setSpeechToText] = useState("");
  const [isCommanding, setCommanding] = useState(false);
  const navigate = useNavigate();

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
      if (speechToText.includes(commands.RANKING_LATEST)) {
        showLatestRanking.click();
      } else if (speechToText.includes(commands.RANKING_RECIPES)) {
        showTotalRanking.click();
      } else if (speechToText.includes(commands.RANKING_KOREAN)) {
        showKoreanRanking.click();
      } else if (speechToText.includes(commands.RANKING_KOREAN)) {
        showForeignRanking.click();
      } else if (speechToText.includes(commands.RANKING_NOTE)) {
        showNoteRanking.click();
      } else if (speechToText.includes(commands.RANKING_TIP)) {
        showTipRanking.click();
      } else if (speechToText.includes(commands.TO_RECIPES)) {
        navigate("/recipes");
      } else if (speechToText.includes(commands.TO_HOME)) {
        navigate("/");
      }
      setCommanding(false);
    }

    return () => recognition.stop();
  }, [speechToText]);

  return [recognition, speechToText, isCommanding];
};

export default useRankingControlBySpeech;
