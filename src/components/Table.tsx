import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import {
  fetchProducts,
  Product,
  selectProductsState,
} from "../store/slices/productsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import Loader from "./Loader";
import ModalContainer from "./Modal";

const TableBox = () => {
  const dispatch = useAppDispatch();
  const { loading, items } = useAppSelector(selectProductsState);

  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  console.log({ selectedItem });

  return (
    <>
      <TableContainer sx={{ border: "1px solid" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => setSelectedItem(item)}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  background: `${item.color}`,
                }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalContainer
        item={selectedItem}
        closeModal={() => setSelectedItem(null)}
      />
    </>
  );
};

export default TableBox;
