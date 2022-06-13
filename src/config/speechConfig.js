const commands = ["영상 멈춰", "영상 시작"];

export const grammar =
  "#JSGF V1.0; grammar colors; public <commands> = " +
  commands.join(" | ") +
  " ;";
