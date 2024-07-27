import React from "react";

import { InputText } from "primereact/inputtext";

import "./userProfileInfoEntryComponent.scss";

const userProfileInfoEntryComponent = (props) => {
  const { value, setValue, fieldLable } = props;
  return (
    <div className="user-info-entry">
      <div className="user-info-entry-lable">
        <b>{fieldLable}:</b>
      </div>
      <div className="user-info-entry-field">
        <InputText
          readOnly
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default userProfileInfoEntryComponent;
