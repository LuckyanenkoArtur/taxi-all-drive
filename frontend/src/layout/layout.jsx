// Import React Fuctionnality
import React from "react";

// Import SCSS styles for Registration page
import "./layout.scss";

const layout = ({ children }) => {
  const [PageHeader, DataTableManipulationPanel, DataTable] = children;
  return (
    <div className="main-page-window">
      <header className="page-header-layout">{PageHeader}</header>
      {DataTableManipulationPanel}
      <main className="data-table">{DataTable}</main>
    </div>
  );
};

export default layout;
