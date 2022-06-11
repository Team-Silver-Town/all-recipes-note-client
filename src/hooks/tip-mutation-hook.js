import { useMutation, useQueryClient } from "react-query";
import {
  cancelTipLike,
  createTip,
  deleteTip,
  updateTip,
  updateTipLike,
} from "../api/tipApi";

const useTipMutation = () => {
  const queryClient = useQueryClient();

  const createTipMutation = useMutation(createTip, {
    onSuccess: () => {
      queryClient.invalidateQueries("tips");
    },
  });

  const updateTipMutation = useMutation(updateTip, {
    onSuccess: () => {
      queryClient.invalidateQueries("tips");
    },
  });

  const deleteTipMutation = useMutation(deleteTip, {
    onSuccess: () => {
      queryClient.invalidateQueries("tips");
    },
  });

  const updateTipLikeMutation = useMutation(updateTipLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("tips");
    },
  });

  const cancelTipLikeMutation = useMutation(cancelTipLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("tips");
    },
  });

  return {
    createTipMutation,
    updateTipMutation,
    deleteTipMutation,
    updateTipLikeMutation,
    cancelTipLikeMutation,
  };
};

export default useTipMutation;
