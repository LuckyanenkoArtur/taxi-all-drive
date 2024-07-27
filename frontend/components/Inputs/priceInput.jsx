// Import React Fuctionnality
import React from "react";

//  Import PrimeReact components
import { InputNumber } from "primereact/inputnumber";

function priceInput(props) {
  const { price, setPriice, disabled = false } = props;
  return (
    <InputNumber
      inputId="price"
      value={price}
      onValueChange={(e) => setPriice(e.value)}
      mode="currency"
      currency="RUB"
      locale="ru-RU"
      disabled={disabled}
    />
  );
}

export default priceInput;
