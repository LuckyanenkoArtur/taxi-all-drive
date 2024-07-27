// Import React Fuctionnality
import React, { useState } from "react";

//  Import PrimeReact components
import { AutoComplete } from "primereact/autocomplete";

const addressAutocompleteInput = (props) => {
  const { addressData, selectedAddress, setSelectedAddress } = props;
  const [filteredAddress, setFilteredAddress] = useState(null);

  const search = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredAddress;

      if (!event.query.trim().length) {
        _filteredAddress = [...addressData];
      } else {
        _filteredAddress = addressData.filter((address) => {
          return address.address
            .toLowerCase()
            .includes(event.query.toLowerCase());
        });
      }

      setFilteredAddress(_filteredAddress);
    }, 250);
  };

  return (
    <AutoComplete
      field="address"
      value={selectedAddress}
      suggestions={filteredAddress}
      completeMethod={search}
      onChange={(e) => setSelectedAddress(e.value)}
    />
  );
};

export default addressAutocompleteInput;
