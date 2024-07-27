// Import React Fuctionnality
import React from "react";

//  Import PrimeReact components
import { Dropdown } from "primereact/dropdown";

const paymentMethodsInput = (props) => {
  const {
    selectedPriceMethod,
    setSelectedPriceMethod,
    disabled = false,
  } = props;
  const paymentMethods = [{ name: "Карта" }, { name: "Наличные" }];
  return (
    <Dropdown
      value={selectedPriceMethod}
      onChange={(e) => setSelectedPriceMethod(e.value)}
      options={paymentMethods}
      optionLabel="name"
      editable
      placeholder="Выбирите способ оплаты"
      disabled={disabled}
    />
  );
};

export default paymentMethodsInput;
