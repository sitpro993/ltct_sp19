const handleValidateSale = (data) => {
  if (data.name === null || data.name.length < 1) return -1;
  if (data.timeStart > data.timeEnd) {
    return -1;
  }
  return 1;
};
const validateSaleDefault = {
  handleValidateSale,
};
export default validateSaleDefault;
