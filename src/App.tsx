import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./hooks";
import {
  fetchProducts,
  selectProductsState,
} from "./store/slices/productsSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const { loading, items } = useAppSelector(selectProductsState);

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(items);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <div>{item.id}</div>
          <div>{item.name}</div>
          <div>{item.year}</div>
        </div>
      ))}
    </div>
  );
};

export default App;
