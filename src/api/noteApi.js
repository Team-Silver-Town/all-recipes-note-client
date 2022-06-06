import fetchApi from "./apiConfig";

export const getNotes = async () => {
  const response = await fetchApi.get("/notes");
  return response.data;
};

export const createNote = async (note) => {
  const response = await fetchApi.post("/notes", note);
  return response.data;
};

export const updateNote = async (note) => {
  const response = await fetchApi.patch(`/notes/${note.id}`, note);
  return response.data;
};

export const deleteNote = async (note_id) => {
  const response = await fetchApi.delete(`/notes/${note_id}`);
  return response.data;
};
