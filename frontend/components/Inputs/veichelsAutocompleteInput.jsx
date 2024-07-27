import React, { useState } from "react";

//  Import PrimeReact components
import { AutoComplete } from "primereact/autocomplete";

const veichelsAutocompleteInput = (props) => {
  const { veichelsData, selectedVeichel, setSelectedVeichel } = props;
  const [filteredVeichel, setFilteredVeichel] = useState(null);

  const search = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredVeichels;

      if (!event.query.trim().length) {
        _filteredVeichels = [...veichelsData];
      } else {
        _filteredVeichels = veichelsData.filter((client) => {
          return client.veichel
            .toLowerCase()
            .includes(event.query.toLowerCase());
        });
      }

      setFilteredVeichel(_filteredVeichels);
    }, 250);
  };

  return (
    <AutoComplete
      field="veichel"
      value={selectedVeichel}
      suggestions={filteredVeichel}
      completeMethod={search}
      onChange={(e) => setSelectedVeichel(e.value)}
    />
  );
};

export default veichelsAutocompleteInput;
