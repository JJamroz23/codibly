import { fireEvent, screen } from "@testing-library/react";
import ProductModal from "../Modal";

describe("<ProductModal />", () => {
  const props = {
    closeModal: jest.fn(),
    item: {
      id: 1,
      name: "someproductname",
      year: 2000,
      color: "#eee",
      pantone_value: "pantoneValue",
    },
  };
  describe("props.item is falsy", () => {
    it("should not render component", () => {
      renderer(<ProductModal {...props} item={null} />);
      expect(screen.queryByTestId("product-modal")).not.toBeInTheDocument();
    });
  });
  describe("props.item is truthy", () => {
    it("should render component", () => {
      renderer(<ProductModal {...props} />);
      expect(screen.getByTestId("product-modal")).toBeInTheDocument();
    });
    it("should render props.item data", () => {
      renderer(<ProductModal {...props} />);
      expect(screen.getByText(props.item.year)).toBeTruthy();
    });
    it("should call props.closeModal() on action button click", () => {
      renderer(<ProductModal {...props} />);
      const closeButton = screen.getByTestId("product-modal-close-btn");
      fireEvent.click(closeButton);
      expect(props.closeModal).toBeCalled();
    });
  });
});
