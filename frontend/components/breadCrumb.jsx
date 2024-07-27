// Import React Fuctionnality
import React from "react";
import { Link } from "react-router-dom";

// Import PrimeReact UI components
import { BreadCrumb } from "primereact/breadcrumb";

// Import SCSS styles for Registration page
import "./breadCrumb.scss";

function breadCrumb(props) {
  const { arrayBreadCrumbs } = props;
  const items = [
    {
      label: "InputText",
      template: () => (
        <Link to={arrayBreadCrumbs[1]}>
          <a className="font-semibold" style={{ color: "#000000" }}>
            {arrayBreadCrumbs[0]}
          </a>
        </Link>
      ),
    },
  ];
  const home = { icon: "pi pi-home", url: "/" };

  return (
    <div className="page-bread-crumbs">
      <BreadCrumb
        model={items}
        home={home}
        style={{ background: "#fdd75e", border: "none" }}
      />
    </div>
  );
}

export default breadCrumb;
