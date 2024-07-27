// Import React Fuctionnality
import React from "react";

// Import PrimeReact UI components
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

// Import SCSS styles for Registration page
import "./dataTable.scss";

function dataTable(props) {
  const { dataTableColumns, dataTableData, dataTableEmptyMessage } = props;
  return (
    <div className="data-table-container">
      <DataTable
        value={dataTableData}
        tableStyle={{ minWidth: "50rem" }}
        size="small"
        showGridlines
        removableSort
        emptyMessage={dataTableEmptyMessage}
        scrollable
        scrollHeight="400px"
        style={{ minWidth: "50rem" }}
      >
        {dataTableColumns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            style={{ minWidth: "100px" }}
            sortable
            filter
          />
        ))}
      </DataTable>
    </div>
  );
}

export default dataTable;
