import { screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { PRODUCTS_URL } from "../../store/slices/productsSlice";
import ProductsTable from "../Table";

describe("<ProductsTable />", () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe("products api responds with data", () => {
    beforeEach(() => {
      server.use(
        rest.get(PRODUCTS_URL, (req, res, ctx) => {
          return res(
            ctx.json({
              data: [
                {
                  id: 1,
                  name: "name1",
                  year: 2000,
                  color: "#ccc",
                  pantone_value: "pantoneVal1",
                },
                {
                  id: 2,
                  name: "name2",
                  year: 2001,
                  color: "#ddd",
                  pantone_value: "pantoneVal2",
                },
              ],
              per_page: 5,
              total_pages: 2,
              total: 10,
            })
          );
        })
      );
    });
    it("should render container", async () => {
      renderer(<ProductsTable />);
      await waitFor(() => {
        expect(screen.getByTestId("products-table")).toBeInTheDocument();
      });
    });

    it("should render two table rows", async () => {
      renderer(<ProductsTable />);
      await waitFor(() => {
        expect(screen.getAllByTestId("products-table-row")).toHaveLength(2);
      });
    });
  });
  describe("products api rejects with error", () => {
    beforeEach(() => {
      server.use(
        rest.get(PRODUCTS_URL, (req, res, ctx) => {
          return res(ctx.status(400), ctx.json({}));
        })
      );
    });
    it("should render one row containing 'No products found'", async () => {
      renderer(<ProductsTable />);
      await waitFor(() => {
        expect(screen.getByText("No products found")).toBeInTheDocument();
      });
    });
  });
});
