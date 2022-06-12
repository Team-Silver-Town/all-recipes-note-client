import { useMutation, useQueryClient } from "react-query";
import {
  cancelRecipeLike,
  createRecipe,
  updateRecipeLike,
} from "../api/recipeApi";

const useRecipeMutation = () => {
  const queryClient = useQueryClient();

  const createRecipeMutation = useMutation(createRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries("recipe");
    },
  });

  const updateRecipeLikeMutation = useMutation(updateRecipeLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("recipe");
    },
  });

  const cancelRecipeLikeMutation = useMutation(cancelRecipeLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("recipe");
    },
  });

  return {
    createRecipeMutation,
    updateRecipeLikeMutation,
    cancelRecipeLikeMutation,
  };
};

export default useRecipeMutation;
