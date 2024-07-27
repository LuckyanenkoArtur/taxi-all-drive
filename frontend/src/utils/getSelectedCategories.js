import driverLicenseCategories from "../data/driverLicenseCategoryData";

function getSelectedCategories(categoryString) {
  const categories = categoryString.split(",");
  return driverLicenseCategories.filter((item) =>
    categories.includes(item.category)
  );
}

export default getSelectedCategories;
