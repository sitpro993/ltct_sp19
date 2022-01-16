const handleValidateSale = (data) => {
  if (data.timeStart > data.timeEnd) {
    return -1;
  }
  return 1;
};
const validateSaleDefault = {
  handleValidateSale,
};
export default validateSaleDefault;
