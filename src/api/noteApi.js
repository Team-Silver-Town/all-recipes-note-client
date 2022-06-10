import fetchApi from "./apiConfig";

export const getNotes = async () => {
  const response = await fetchApi.get("/api/notes");
  return response.data;
};

export const createNote = async (note) => {
  const response = await fetchApi.post("/api/notes", note);
  return response.data;
};

export const updateNote = async (note) => {
  const response = await fetchApi.patch(`/api/notes/${note._id}`, note);
  return response.data;
};

export const deleteNote = async (note_id) => {
  const response = await fetchApi.delete(`/api/notes/${note_id}`);
  return response.data;
};
