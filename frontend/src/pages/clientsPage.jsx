// Import React Fuctionnality
import React, { useState, useEffect, useRef } from "react";

//  Import PrimeReact components
import { Toast } from "primereact/toast";

// Import Redux Functionality
import { useGetAllClientsListMutation } from "../api/redux/features/clients/clientsApiSlice";
import { useGetClientsListMutation } from "../api/redux/features/autocompletes/autocompletesApiSlice";

//  Import Custom components
import PageHeader from "../components/pageHeader";
import DataTable from "../components/dataTable";
import DataTableManipulationPanel from "../components/dataTableManipulationPanel";
import EditClientDialog from "../components/Dialogs/ClientsPage/editClientDialog";
import AddClientDialog from "../components/Dialogs/ClientsPage/addClientDialog";
import RemoveClientDialog from "../components/Dialogs/ClientsPage/removeClientDialog";
import Layout from "../layout/layout";

// Import Data
import columns from "../data/clientsDataTableColumns";

// Import SCSS styles for Registration page
import "./clientsPage.scss";

function clientsPage() {
  const [clients, setClients] = useState([]);
  const [clientsData, setClientsData] = useState([]);

  const [getClientsList] = useGetAllClientsListMutation();
  const [getClients] = useGetClientsListMutation();

  const [dataTableReload, setDataTableReload] = useState(false);

  const [visibleEditDialog, setVisibleEditDialog] = useState(false);
  const [visibleAddDialog, setVisibleAddDialog] = useState(false);
  const [visibleRemoveDialog, setVisibleRemoveDialog] = useState(false);

  const toast = useRef(null);

  useEffect(() => {
    getClientsList()
      .unwrap()
      .then((response) => {
        setClients(response.data);
        setDataTableReload(false);
      })
      .catch((error) => {
        console.log(error);
      });

    getClients()
      .unwrap()
      .then((response) => {
        setClientsData(response.data);
      })
      .catch((error) => {});
  }, [dataTableReload]);

  return (
    <>
      <Toast ref={toast} />
      <Layout>
        <PageHeader arrayBreadCrumbs={["Клиенты", "/cliens"]} />
        <DataTableManipulationPanel
          editDialog={
            <EditClientDialog
              setVisibleEditDialog={setVisibleEditDialog}
              visibleEditDialog={visibleEditDialog}
              setDataTableReload={setDataTableReload}
              toastMainWindow={toast}
              clientsData={clientsData}
            />
          }
          addDialog={
            <AddClientDialog
              setVisibleAddDialog={setVisibleAddDialog}
              visibleAddDialog={visibleAddDialog}
              setDataTableReload={setDataTableReload}
              toastMainWindow={toast}
            />
          }
          removeDialog={
            <RemoveClientDialog
              setVisibleRemoveDialog={setVisibleRemoveDialog}
              visibleRemoveDialog={visibleRemoveDialog}
              clientsData={clientsData}
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
          dataTableData={clients}
          dataTableEmptyMessage={"Клиент не найден"}
        />
      </Layout>
    </>
  );
}

export default clientsPage;
