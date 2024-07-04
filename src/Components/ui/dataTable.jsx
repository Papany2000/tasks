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
          ".MuiDataGrid-columnHeaderTitle": { fontWeight: "bold", fontSize: '16px' },
          "& .MuiDataGrid-virtualScrollerRenderZone": {                                          // полосатая заливка
            "& .MuiDataGrid-row": {
              "&:nth-child(2n-1)": { backgroundColor: "rgba(235, 235, 235, .7)" }
            }
          },
        }}
      />
    </div>
  );
};

export default DataTable;
