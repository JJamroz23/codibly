import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { ProductsState } from "../store/slices/productsSlice";

export const getMessage = (err: ProductsState["error"]) => {
  if (typeof err === "string") {
    return err;
  }

  if (err === 400) {
    return "Bad request";
  }

  if (err === 404) {
    return "Not found";
  }

  return "Something went wrong";
};

export const useErrorSnack = (err: ProductsState["error"]) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (err) enqueueSnackbar(getMessage(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [err]);
};
