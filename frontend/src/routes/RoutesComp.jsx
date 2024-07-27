// import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// Import pages
import LoginPage from "../pages/loginPage.jsx";

import HomePage from "../pages/homePage.jsx";
import OrdersPage from "../pages/ordersPage.jsx";
import ClientsPage from "../pages/clientsPage.jsx";
import SchedulesPage from "../pages/schedulesPage.jsx";
import DriversPage from "../pages/driversPage.jsx";
import CarsPage from "../pages/carsPage.jsx";

import AccountPage from "../pages/accountPage.jsx";

export const RoutesComp = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <Routes>
      {token ? (
        <>
          <Route path="/">
            <Route index element={<HomePage />} />
          </Route>
          <Route element={<AccountPage />} path="/user-account" />
          <Route element={<ClientsPage />} path="/clients" />
          <Route element={<OrdersPage />} path="/orders" />
          <Route element={<SchedulesPage />} path="/dispachers" />
          <Route element={<DriversPage />} path="/drivers" />
          <Route element={<CarsPage />} path="/cars" />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <Route>
          <Route element={<LoginPage />} path="/login" />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      )}
    </Routes>
  );
};
