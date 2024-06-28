import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ rows, columns }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        editMode="row"
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        sx={{
          ".MuiDataGrid-columnHeaderTitle": { fontWeight: "bold" },
          ".MuiDataGrid-cell--textCenter": { color: "lightGree" },
        }}
      />
    </div>
  );
};

export default DataTable;
