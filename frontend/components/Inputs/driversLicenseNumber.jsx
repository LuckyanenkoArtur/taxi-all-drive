// Import React Fuctionnality
import React from "react";

//  Import PrimeReact components
import { InputMask } from "primereact/inputmask";

const driversLicenseNumber = (props) => {
  const {
    driversLicenseNumber,
    setDriversLicenseNumber,
    disabled = false,
  } = props;
  return (
    <InputMask
      id="phone"
      mask="99 99 999999"
      placeholder="99 99 999999"
      value={driversLicenseNumber}
      onChange={(e) => setDriversLicenseNumber(e.target.value)}
      disabled={disabled}
    />
  );
};

export default driversLicenseNumber;
