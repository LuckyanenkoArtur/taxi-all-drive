export const getSelectedVeichel = (veichelString, veichelsData) => {
  return veichelsData.filter((item) => veichelString.includes(item.veichel));
};
