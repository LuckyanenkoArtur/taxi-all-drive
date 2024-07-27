// Import React Fuctionnality
import React, { useState, useEffect, useRef } from "react";

// Import Redux Functionality
import { useGetAllDriversListMutation } from "../api/redux/features/drivers/driversApiSlice";
import { useGetVeichelsListMutation } from "../api/redux/features/autocompletes/autocompletesApiSlice";
import { useGetDriversListMutation } from "../api/redux/features/autocompletes/autocompletesApiSlice";

//  Import PrimeReact components
import { Toast } from "primereact/toast";

//  Import Custom components
import PageHeader from "../components/pageHeader";
import DataTable from "../components/dataTable";
import DataTableManipulationPanel from "../components/dataTableManipulationPanel";
import EditDriverDialog from "../components/Dialogs/DriversPage/editDriverDialog";
import AddDriverDialog from "../components/Dialogs/DriversPage/addDriverDialog";
import RemoveDriverDialog from "../components/Dialogs/DriversPage/removeDriverDialog";
import Layout from "../layout/layout";

// Import Data
import columns from "../data/driversDataTableColumns";

// Import SCSS styles for Registration page
import "./clientsPage.scss";

function driversPage() {
  const [drivers, setDrivers] = useState([]);

  const [veichelsData, setVeichelsData] = useState([]);
  const [driversData, setDriversData] = useState([]);

  const [dataTableReload, setDataTableReload] = useState(false);

  const [visibleEditDialog, setVisibleEditDialog] = useState(false);
  const [visibleAddDialog, setVisibleAddDialog] = useState(false);
  const [visibleRemoveDialog, setVisibleRemoveDialog] = useState(false);

  const [getAllDriversList] = useGetAllDriversListMutation();
  const [getVeichels] = useGetVeichelsListMutation();
  const [getDrivers] = useGetDriversListMutation();

  const toast = useRef(null);

  useEffect(() => {
    getAllDriversList()
      .unwrap()
      .then((response) => {
        setDrivers(response.data);
        setDataTableReload(false);
      })
      .catch((error) => {
        console.log(error);
      });

    getVeichels()
      .unwrap()
      .then((response) => {
        setVeichelsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    getDrivers()
      .unwrap()
      .then((response) => {
        setDriversData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataTableReload]);

  return (
    <>
      <Toast ref={toast} />
      <Layout>
        <PageHeader arrayBreadCrumbs={["Водители", "/drivers"]} />
        <DataTableManipulationPanel
          editDialog={
            <EditDriverDialog
              setVisibleEditDialog={setVisibleEditDialog}
              visibleEditDialog={visibleEditDialog}
              veichelsData={veichelsData}
              driversData={driversData}
              setDataTableReload={setDataTableReload}
              toastMainWindow={toast}
            />
          }
          addDialog={
            <AddDriverDialog
              setVisibleAddDialog={setVisibleAddDialog}
              visibleAddDialog={visibleAddDialog}
              veichelsData={veichelsData}
              setDataTableReload={setDataTableReload}
              toastMainWindow={toast}
            />
          }
          removeDialog={
            <RemoveDriverDialog
              setVisibleRemoveDialog={setVisibleRemoveDialog}
              visibleRemoveDialog={visibleRemoveDialog}
              driversData={driversData}
              setDataTableReload={setDataTableReload}
              toastMainWindow={toast}
            />
          }
          setVisibleEditDialog={setVisibleEditDialog}
          setVisibleAddDialog={setVisibleAddDialog}
          setVisibleRemoveDialog={setVisibleRemoveDialog}
        />
        <DataTable
          dataTableColumns={columns}
          dataTableData={drivers}
          dataTableEmptyMessage={"Водитель не найден"}
        />
      </Layout>
    </>
  );
}

export default driversPage;
