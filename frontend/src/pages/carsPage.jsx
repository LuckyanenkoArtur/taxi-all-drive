// Import React Fuctionnality
import React, { useState, useEffect, useRef } from "react";

// Import Redux Functionality
import { useGetDriversListMutation } from "../api/redux/features/autocompletes/autocompletesApiSlice";
import { useGetAllVeichelsListMutation } from "../api/redux/features/veichels/veichelsApiSlice";

//  Import PrimeReact components
import { Toast } from "primereact/toast";

//  Import Custom components
import PageHeader from "../components/pageHeader";
import DataTable from "../components/dataTable";
import DataTableManipulationPanel from "../components/dataTableManipulationPanel";
import EditVehicleDialog from "../components/Dialogs/VeichelsPage/editVeichelsDialog";
import AddVehiclesDialog from "../components/Dialogs/VeichelsPage/addVeichelsDialog";
import RemoveVehicleDialog from "../components/Dialogs/VeichelsPage/removeVeichelsDialog";
import Layout from "../layout/layout";

// Import Data
import columns from "../data/veichelsDataTableColumns";

// Import SCSS styles for Registration page
import "./clientsPage.scss";

function carsPage() {
  const [veichels, setVeichels] = useState([{ id: 1 }, { id: 1 }]);
  const [veichelsData, setVeichelsData] = useState([]);

  const [getVeichelsList] = useGetAllVeichelsListMutation();
  const [getVeichels] = useGetDriversListMutation();

  const [dataTableReload, setDataTableReload] = useState(false);

  const [visibleEditDialog, setVisibleEditDialog] = useState(false);
  const [visibleAddDialog, setVisibleAddDialog] = useState(false);
  const [visibleRemoveDialog, setVisibleRemoveDialog] = useState(false);

  const toast = useRef(null);

  useEffect(() => {
    getVeichelsList()
      .unwrap()
      .then((response) => {
        setVeichels(response.data);
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
  }, [dataTableReload]);

  return (
    <>
      <Toast ref={toast} />
      <Layout>
        <PageHeader arrayBreadCrumbs={["Автомобили", "/cars"]} />
        <DataTableManipulationPanel
          editDialog={
            <EditVehicleDialog
              setVisibleEditDialog={setVisibleEditDialog}
              visibleEditDialog={visibleEditDialog}
              setDataTableReload={setDataTableReload}
              toastMainWindow={toast}
              veichelsData={veichelsData}
            />
          }
          addDialog={
            <AddVehiclesDialog
              setVisibleAddDialog={setVisibleAddDialog}
              visibleAddDialog={visibleAddDialog}
              setDataTableReload={setDataTableReload}
              toastMainWindow={toast}
            />
          }
          removeDialog={
            <RemoveVehicleDialog
              setVisibleRemoveDialog={setVisibleRemoveDialog}
              visibleRemoveDialog={visibleRemoveDialog}
              veichelsData={veichelsData}
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
          dataTableData={veichels}
          dataTableEmptyMessage={"Автомабиль не найден"}
        />
      </Layout>
    </>
  );
}
export default carsPage;
