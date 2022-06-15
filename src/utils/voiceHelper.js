const koreanSingleDigitCounter = [
  "한",
  "두",
  "세",
  "네",
  "다섯",
  "여섯",
  "일곱",
  "여덟",
  "아홉",
  "열",
];

export const parseIngredientsFromSpeech = (speech) => {
  const tempParse = speech.split(" ");

  let ingredient = "";
  let portion = 0;
  let unit = "";

  if (tempParse.length > 2) {
    ingredient = tempParse[0];
    unit = tempParse[2];

    if (!Number(tempParse[1])) {
      portion = koreanSingleDigitCounter.indexOf(tempParse[1]) + 1;
    } else {
      portion = Number(tempParse[1]);
    }
  } else {
    ingredient = tempParse[0];

    const tempParseSecondArray = tempParse[1].split("");

    let portionString = "";

    for (let i = 0; i < tempParseSecondArray.length; i++) {
      if (
        Number(tempParseSecondArray[i]) ||
        Number(tempParseSecondArray[i]) === 0
      ) {
        portionString += tempParseSecondArray[i];
      } else {
        unit += tempParseSecondArray[i];
      }
    }

    portion = Number(portionString);
  }

  return { ingredient, portion, unit };
};
