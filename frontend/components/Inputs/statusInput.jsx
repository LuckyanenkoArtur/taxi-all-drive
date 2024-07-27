// Import React Fuctionnality
import React from "react";

//  Import PrimeReact components
import { Dropdown } from "primereact/dropdown";

const statusInput = (props) => {
  const {
    statusData,
    selectedStatus,
    setSelectedStatus,
    disabled = false,
  } = props;
  return (
    <Dropdown
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.value)}
      options={statusData}
      optionLabel="name"
      editable
      placeholder="Выбирите cтатус"
      disabled={disabled}
    />
  );
};

export default statusInput;
