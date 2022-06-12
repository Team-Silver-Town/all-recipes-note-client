import fetchApi from "./apiConfig";

export const getNotes = async () => {
  const response = await fetchApi.get("/api/notes");
  return response.data;
};

export const getNote = async (note_id) => {
  const response = await fetchApi.get(`/api/notes/${note_id}`, note_id);
  return response.data;
};

export const getMyNotes = async (userId) => {
  const response = await fetchApi.get(`/api/users/${userId}/notes`);
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

export const updateNoteLike = async (note) => {
  const response = await fetchApi.patch(
    `/api/notes/${note.note_id}/likes`,
    note
  );
  return response.data;
};

export const cancelNoteLike = async (note) => {
  const response = await fetchApi.patch(
    `/api/notes/${note.note_id}/unlikes`,
    note
  );
  return response.data;
};


export const deleteNote = async ({ note_id }) => {
  const response = await fetchApi.delete(`/api/notes/${note_id}`);
  return response.data;
};

export const getTopTenNotes = async () => {
  const response = await fetchApi.get("/api/notes/top10");
  return response.data;
};
