import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRecoilValue } from "recoil";
import { productState } from "@/recoil/atoms";
import { ThemeProvider, createTheme } from "@mui/material";
import { useTheme } from "next-themes";
import React from "react";
import Box from "@mui/material";

export default function MyProductsList() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "productName", headerName: "Product Name", width: 400 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "stock", headerName: "Stock Available", width: 200 },
  ];

  const products = useRecoilValue(productState);

  const rows = products.map((product) => {
    if (product === null) return null;
    return {
      id: product.id,
      productName: product.product_name,
      price: product.price,
      stock: product.stock_quantity,
    };
  });

  const { resolvedTheme, setTheme } = useTheme();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedTheme === "dark" ? "dark" : "light",
        },
      }),
    [resolvedTheme]
  );

  return (
    <div className=" w-full rounded bg-light dark:bg-dark-200 shadow">
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
            boxShadow: 2,
          }}
        />
      </ThemeProvider>
    </div>
  );
}
