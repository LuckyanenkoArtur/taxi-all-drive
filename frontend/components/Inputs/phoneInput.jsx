// Import React Fuctionnality
import React from "react";

//  Import PrimeReact components
import { InputMask } from "primereact/inputmask";

function phoneInput(props) {
  const { phone, setPhone, disabled = false } = props;
  return (
    <InputMask
      id="phone"
      mask="+9 (999) 999 99-99"
      placeholder="+9 (999) 999 99-99"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      disabled={disabled}
    />
  );
}

export default phoneInput;
