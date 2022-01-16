const validateCode = async (dataCode, handeValidateCode) => {
  const status = await handeValidateCode(dataCode);
  return status;
};
const validateSale = async (dataSale, handlValidateSale) => {
  const status = await handlValidateSale(dataSale);
  return status;
};
const checkExists = async (id, handleCheckExists) => {
  const status = await handleCheckExists(id);
  return status;
};

const valideDefault = {
  validateCode,
  validateSale,
  checkExists,
};

export default valideDefault;
