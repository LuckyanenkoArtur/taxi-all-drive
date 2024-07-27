export const getSelectedClient = (clientString, clientsData) => {
  return clientsData.filter((item) => clientString.includes(item.fullname));
};
