// Import React Fuctionnality
import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Import PrimeReact UI components
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";

// Import Redux fucntionality
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../api/redux/features/authentication/authApiSlice";
import { logOut } from "../api/redux/features/authentication/authSlice";
import { useDeleteUserProfileMutation } from "../api/redux/features/userprofile/userprofileApiSlice";

import "./accountManipulationPanel.scss";

const accountManipulationPanel = () => {
  const dispatch = useDispatch();
  const [sendLogoutData] = useLogoutMutation();
  const [getUserProfileDelationStatus] = useDeleteUserProfileMutation();

  const onClickDeleteAccountHandler = () => {
    confirmDialog({
      message: "Вы уверены, что хотите удалить аккаунт?",
      header: "Потверждение",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: () => {
        getUserProfileDelationStatus()
          .unwrap()
          .then((request) => {
            if (request.success === 1) {
              deleteAccountToast.current.show({
                severity: "success",
                summary: "Удаление аккаунта",
                detail: "Аккаунт был успешно удален!",
                life: 3000,
              });

              setTimeout(() => {
                dispatch(logOut());
              }, 1000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      reject: () => {
        deleteAccountToast.current.show({
          severity: "warn",
          summary: "Удаление аккаунта",
          detail: "Удаление аккаунта было отменено пользователем!",
          life: 3000,
        });
      },
    });
  };
  const onClickLogOutAccountHandler = () => {
    confirmDialog({
      message: "Вы уверены, завершить работу?",
      header: "Выход",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: () => {
        sendLogoutData()
          .unwrap()
          .then(() => {
            dispatch(logOut());
          });
      },
      reject: () => {},
    });
  };
  const onClickSaveAccountChangesHandler = () => {
    confirmDialog({
      message: "Вы уверены, что хотите сохранить внесенные изменения?",
      header: "Сохрание",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: () => {},
      reject: () => {},
    });
  };

  return (
    <>
      <ConfirmDialog />
      <div className="user-profile-actions">
        {/* <Button
          icon="pi pi-user-minus"
          severity="danger"
          onClick={onClickDeleteAccountHandler}
          className="manipulation-account-buttons"
        />
        <Button
          icon="pi pi-check"
          severity="success"
          className="manipulation-account-buttons"
          onClick={onClickSaveAccountChangesHandler}
        /> */}
        <Button
          icon="pi pi-sign-out"
          severity="info"
          onClick={onClickLogOutAccountHandler}
          className="manipulation-account-buttons"
        />
      </div>
    </>
  );
};

export default accountManipulationPanel;
