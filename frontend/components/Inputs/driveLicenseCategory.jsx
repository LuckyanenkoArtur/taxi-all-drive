// Import React Fuctionnality
import React, { useState } from "react";

//  Import PrimeReact components
import { MultiSelect } from "primereact/multiselect";

// Import Data options
import driverLicnceCategoryData from "../../data/driverLicenseCategoryData";

const DriveLicenseCategory = (props) => {
  const {
    driverLicenseCategory,
    setDriverLicenseCategory,
    disabled = false,
  } = props;
  return (
    <MultiSelect
      value={driverLicenseCategory}
      onChange={(e) => {
        setDriverLicenseCategory(e.value);
      }}
      options={driverLicnceCategoryData}
      optionLabel="category"
      placeholder="Категории прав"
      maxSelectedLabels={6}
      size="small"
      disabled={disabled}
    />
  );
};

export default DriveLicenseCategory;
