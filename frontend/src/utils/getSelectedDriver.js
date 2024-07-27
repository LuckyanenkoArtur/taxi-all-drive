export const getSelectedDriver = (driverString, driversData) => {
  return driversData.filter((item) => driverString.includes(item.fullname));
};
