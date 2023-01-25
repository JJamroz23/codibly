import { screen } from "@testing-library/react";
import Loader from "../Loader";

describe("<Loader />", () => {
  it("should render component", () => {
    renderer(<Loader />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
