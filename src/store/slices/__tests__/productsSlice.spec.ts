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

  describe("getInitialValuesFromUrl(pathname, string)", () => {
    const search = `?perPage=${data.perPage}&page=${data.page}&searchId=${data.searchId}`;
    describe('window.location.pathanme does not equal "/"', () => {
      it(`should return object containing 
      page set to 1, searchId set to 0, perPage set to 5`, () => {
        expect(getInitialValuesFromUrl("/abcd", search)).toEqual({
          page: 1,
          searchId: 0,
          perPage: 5,
        });
      });
    });
    describe('window.location.pathanme is equal "/"', () => {
      it(`should return object containing 
      page set to page from window.location.search, 
      searchId set to searchId from window.location.search,
      perPage set to perPage window.location.search`, () => {
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
      it("should return string containing per_page and page params", () => {
        expect(getQueryParams(data as ProductsState)).toBe(
          `?per_page=${data.perPage}&page=${data.page}&id=${data.searchId}`
        );
      });
    });
  });
});
