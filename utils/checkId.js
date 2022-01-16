import Code from "../models/codeModel.js"
import Sale from "../models/saleModel.js"
const checkCode = async (data) => {
  var checkCode = null
  await Code.findOne({
    discountCode: data,
  }).then(result => checkCode = result)
  if (checkCode) return -1
  return 1
}
const checkSale = async (data) => {
  var check = null
  await Sale.findOne({
    _id: data,
  }).then(result => check = result)
  if (!check) return -1
  return 1
}

const checkIdDefault = {
  checkCode,
  checkSale
}
export default checkIdDefault
