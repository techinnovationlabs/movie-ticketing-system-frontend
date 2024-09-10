export const convertToScreenTableData = (dbData, type) => {
  debugger;
  const cnvtdData =
    type === "Array"
      ? dbData.map((data) => ({
          key: data._id,
          name: data.name,
          categories: data.category.map((cat) => cat.name).toString(),
          nPrice: data.category.find((cat) => cat.name === "NORMAL").adultPrice,
          pPrice: data.category.find((cat) => cat.name === "PREMIUM")
            .adultPrice,
          size: data.size,
        }))
      : {
          key: dbData._id,
          name: dbData.name,
          categories: dbData.category.map((cat) => cat.name).toString(),
          nPrice: dbData.category.find((cat) => cat.name === "NORMAL")
            .adultPrice,
          pPrice: dbData.category.find((cat) => cat.name === "PREMIUM")
            .adultPrice,
          size: dbData.size,
        };
  console.log(cnvtdData);
  return cnvtdData;
};
