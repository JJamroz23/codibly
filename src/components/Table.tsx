import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useErrorSnack,
  useSetSearchParams,
} from "../hooks";
import {
  fetchProducts,
  Product,
  selectProductsState,
  setPage,
} from "../store/slices/productsSlice";
import Loader from "./Loader";
import ProductModal from "./Modal";

const TableBox = () => {
  const dispatch = useAppDispatch();
  const { loading, items, total, searchId, page, perPage, error } =
    useAppSelector(selectProductsState);

  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  useSetSearchParams({
    perPage,
    page,
    searchId,
  });

  useErrorSnack(error);

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchId, page]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <TableContainer
        sx={{
          border: "1px solid",
          borderRadius: "5px",
          boxShadow: "8px 8px 24px 0px rgba(66, 68, 90, 0.3)",
        }}
      >
        <Table aria-label="simple table" sx={{ background: "#c5c2c2" }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>ID</b>
              </TableCell>
              <TableCell align="right">
                <b>NAME</b>
              </TableCell>
              <TableCell align="right">
                <b>YEAR</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!items.length ? (
              <TableRow>
                <TableCell>No products found</TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    background: `${item.color}`,
                  }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">{item.year}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ProductModal
        item={selectedItem}
        closeModal={() => setSelectedItem(null)}
      />
      <Pagination
        count={total}
        page={page}
        onChange={(event, newPage) => dispatch(setPage(newPage))}
      />
    </>
  );
};

export default TableBox;
