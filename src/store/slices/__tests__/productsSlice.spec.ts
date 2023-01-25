import {
  getInitialValuesFromUrl,
  getQueryParams,
  ProductsState,
} from "../productsSlice";

describe("productsSlice", () => {
  const data = {
    page: 12,
    perPage: 2,
    searchId: 10,
  };

  describe("getInitialValuesFromUrl(pathname, search)", () => {
    const search = `?perPage=${data.perPage}&page=${data.page}&searchId=${data.searchId}`;
    describe('pathanme does not equal "/"', () => {
      it(`should return object containing 
      page set to 1, searchId set to 0, perPage set to 5`, () => {
        expect(getInitialValuesFromUrl("/abcd", search)).toEqual({
          page: 1,
          searchId: 0,
          perPage: 5,
        });
      });
    });
    describe('pathanme is equal "/"', () => {
      it(`should return object containing 
      page set to page from search string, 
      searchId set to searchId from search string,
      perPage set to perPage search string`, () => {
        expect(getInitialValuesFromUrl("/", search)).toEqual(data);
      });
    });
  });
  describe("getQueryParams(state)", () => {
    describe("state.searchId is falsy", () => {
      it("should return string containing per_page and page params", () => {
        expect(getQueryParams({ ...data, searchId: 0 } as ProductsState)).toBe(
          `?per_page=${data.perPage}&page=${data.page}`
        );
      });
    });
    describe("state.searchId is truthy", () => {
      it("should return string containing per_page, page and id params", () => {
        expect(getQueryParams(data as ProductsState)).toBe(
          `?per_page=${data.perPage}&page=${data.page}&id=${data.searchId}`
        );
      });
    });
  });
});
