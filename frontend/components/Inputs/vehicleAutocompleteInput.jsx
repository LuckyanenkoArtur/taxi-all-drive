// Import React Fuctionnality
import React, { useState } from "react";

//  Import PrimeReact components
import { AutoComplete } from "primereact/autocomplete";

const vehicleAutocompleteInput = (props) => {
  const {
    vehiclesData,
    selectedVehicle,
    setSelectedVehicle,
    disabled = false,
  } = props;
  const [filteredVehicle, setFilteredVehicle] = useState(null);

  const search = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredVehicle;

      if (!event.query.trim().length) {
        _filteredVehicle = [...vehiclesData];
      } else {
        _filteredVehicle = vehiclesData.filter((vehicle) => {
          return vehicle.veichel
            .toLowerCase()
            .includes(event.query.toLowerCase());
        });
      }

      setFilteredVehicle(_filteredVehicle);
    }, 250);
  };

  return (
    <AutoComplete
      field="veichel"
      value={selectedVehicle}
      suggestions={filteredVehicle}
      completeMethod={search}
      onChange={(e) => setSelectedVehicle(e.value)}
      disabled={disabled}
    />
  );
};

export default vehicleAutocompleteInput;
