// Import React Fuctionnality
import React, { useState, useRef, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";

// Import Redux fucntionality
import { useGetUserProfileDetailsMutation } from "../api/redux/features/userprofile/userprofileApiSlice";

// Import PrimeReact UI components
import { Toast } from "primereact/toast";

// Import Custom components
import PageHeader from "../components/pageHeader";
import Layout from "../layout/layout";
import AccountManipulationPanel from "../components/accountManipulationPanel";
import AccountCardInfo from "../components/accountCardInfo";

// Import SCSS styles
import "./accountPage.scss";

const userProfilePage = () => {
  const [getUserProfileDetails] = useGetUserProfileDetailsMutation();
  const deleteAccountToast = useRef(null);

  useEffect(() => {
    getUserProfileDetails()
      .unwrap()
      .then((request) => {
        const {
          id,
          firstname,
          lastname,
          surename,
          age,
          phone,
          email,
          password,
          username,
        } = request.data;
        setFirstname(firstname);
        setLastname(lastname);
        setSurename(surename);
        setAge(age);
        setPhone(phone);
        setEmail(email);
        setUsername(username);
        setPassword(password);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Toast ref={deleteAccountToast} />
      <Layout>
        <PageHeader arrayBreadCrumbs={["Аккаунт", "/account"]} />
        <AccountManipulationPanel />
        <AccountCardInfo />
      </Layout>
    </>
  );
};

export default userProfilePage;
