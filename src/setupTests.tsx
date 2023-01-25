import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";

declare global {
  function renderer(children: ReactNode): void;
}

global.renderer = (children) => {
  render(
    <Provider store={store}>
      <SnackbarProvider maxSnack={1} autoHideDuration={3000}>
        {children}
      </SnackbarProvider>
    </Provider>
  );
};
