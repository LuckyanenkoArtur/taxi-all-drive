import React, { useState, useEffect } from "react";

//  Import PrimeReact components
import { AutoComplete } from "primereact/autocomplete";

const personAutocompleteInput = (props) => {
  const {
    personsData,
    selectedPerson,
    setSelectedPerson,
    disabled = false,
  } = props;
  const [filteredPerson, setFilteredPerson] = useState(null);

  const search = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredPersons;

      if (!event.query.trim().length) {
        _filteredPersons = [...personsData];
      } else {
        _filteredPersons = personsData.filter((client) => {
          return client.fullname
            .toLowerCase()
            .includes(event.query.toLowerCase());
        });
      }

      setFilteredPerson(_filteredPersons);
    }, 250);
  };

  return (
    <AutoComplete
      field="fullname"
      value={selectedPerson}
      suggestions={filteredPerson}
      completeMethod={search}
      onChange={(e) => setSelectedPerson(e.value)}
      disabled={disabled}
    />
  );
};

export default personAutocompleteInput;
