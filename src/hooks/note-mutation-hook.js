import { useMutation, useQueryClient } from "react-query";
import {
  createNote,
  updateNote,
  deleteNote,
  updateNoteLike,
  cancelNoteLike,
} from "../api/noteApi";

const useNoteMutation = () => {
  const queryClient = useQueryClient();

  const createNoteMutation = useMutation(createNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("recipe");
    },
  });

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("recipe");
    },
  });

  const deleteNoteMutation = useMutation(deleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("recipe");
    },
  });

  const updateNoteLikeMutation = useMutation(updateNoteLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("note");
      queryClient.invalidateQueries("recipe");
    },
  });

  const cancelNoteLikeMutation = useMutation(cancelNoteLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("note");
      queryClient.invalidateQueries("recipe");
    },
  });

  return {
    createNoteMutation,
    updateNoteMutation,
    deleteNoteMutation,
    updateNoteLikeMutation,
    cancelNoteLikeMutation,
  };
};

export default useNoteMutation;
