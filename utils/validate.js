const validateCode = async (dataCode, handeValidateCode) => {
  let status = -1
  await handeValidateCode(dataCode).then(result => status = result)
  return status
}
const validateSale = async (dataSale, handlValidateSale) => {
  let status = -1
  await handlValidateSale(dataSale).then(result => status = result)
  return status
}
const checkExists = async (id, handleCheckExists) => {
  let status = -1
  await handleCheckExists(id).then(result => status = result)
  return status
}


const valideDefault = {
  validateCode,
  validateSale,
  checkExists
}

export default valideDefault

