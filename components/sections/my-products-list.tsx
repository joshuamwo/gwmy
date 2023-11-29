// renders a list of products that the shop	owner has added
// Path: components/sections/my-products-list.tsx

import { productState } from "@/recoil/atoms";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useRecoilValue } from "recoil";

const products = useRecoilValue(productState);

const columns: GridColDef[] = [{ field: "id", headerName: "ID", width: 70 }];

const rows = [{ id: 1 }];
export default function MyProductsList() {
  return <DataGrid columns={columns} rows={rows} />;
}
