// Import React Fuctionnality
import React from "react";

//  Import PrimeReact components
import { InputMask } from "primereact/inputmask";

const dateInput = (props) => {
  const { date, setDate, disabled = false } = props;
  return (
    <InputMask
      id="phone"
      mask="99/99/9999"
      placeholder="99/99/9999"
      slotChar="дд/мм/гггг"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      disabled={disabled}
    />
  );
};

export default dateInput;
