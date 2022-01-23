const validateCode = async (dataCode, handeValidateCode) => {
  const status = await handeValidateCode(dataCode);
  return status;
};
const validatePromotion = async (dataPromotion, handlValidatePromotion) => {
  const status = await handlValidatePromotion(dataPromotion);
  return status;
};
const checkExists = async (id, handleCheckExists) => {
  const status = await handleCheckExists(id);
  return status;
};

const valideDefault = {
  validateCode,
  validatePromotion,
  checkExists,
};

export default valideDefault;
