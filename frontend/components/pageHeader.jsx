// Import React Fuctionnality
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Import PrimeReact UI components
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Sidebar } from "primereact/sidebar";

// Import custom components
import BreadCrumb from "../components/breadCrumb";

// Import Reduxt Functionality
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../api/redux/features/authentication/authApiSlice";
import { logOut } from "../api/redux/features/authentication/authSlice";

// Import SCSS styles for Registration page
import "./pageHeader.scss";

function pageHeader(props) {
  const { arrayBreadCrumbs } = props;
  const [visibleRight, setVisibleRight] = useState(false);
  const dispatch = useDispatch();
  const [sendLogoutData] = useLogoutMutation();

  const onClickExitHandler = () => {
    sendLogoutData()
      .unwrap()
      .then(() => {
        dispatch(logOut());
      });
  };

  return (
    // <div className="page-header">
    <>
      <div className="logo-nav-container">
        <div className="logo-container">
          <Link to="/">TaxiAllDrive 🚖</Link>
        </div>
        <BreadCrumb arrayBreadCrumbs={arrayBreadCrumbs} />
      </div>
      <div className="avatar-container">
        <Sidebar
          visible={visibleRight}
          position="right"
          onHide={() => setVisibleRight(false)}
        >
          <div className="siderbar-navigation-container">
            <Link to="/">
              <Button
                label="Начальная страница"
                className="siderbar-buttons"
                id="taxi-home"
              />
            </Link>
            <Link to="/clients">
              <Button
                label="Клиенты"
                className="siderbar-buttons"
                id="taxi-clients"
              />
            </Link>
            <Link to="/orders">
              <Button
                label="Заказы"
                className="siderbar-buttons"
                id="taxi-orders"
              />
            </Link>
            <Link to="/dispachers">
              <Button
                label="Диспечера"
                className="siderbar-buttons"
                id="taxi-schedule"
              />
            </Link>
            <Link to="/drivers">
              <Button
                label="Водители"
                className="siderbar-buttons"
                id="taxi-drivers"
              />
            </Link>
            <Link to="/cars">
              <Button
                label="Автомобили"
                className="siderbar-buttons"
                id="taxi-cars"
              />
            </Link>
            <Link to="/user-account">
              <Button
                label="Информация об аккаунте"
                className="siderbar-buttons"
                id="account-iinformation"
              />
            </Link>
            <Button
              label="Выйти"
              className="siderbar-buttons"
              id="exit-user-button"
              onClick={onClickExitHandler}
            />
          </div>
        </Sidebar>
        <Avatar
          className="p-overlay-badge"
          icon="pi pi-user"
          size="large"
          style={{
            background: "#fdd75e",
            color: "#000000",
            fontWeight: "bold",
          }}
          onClick={() => setVisibleRight(true)}
        />
      </div>
    </>

    // </div>
  );
}

export default pageHeader;
