import codeDAO from "../dao/codeDAO.js"
import checkID from "../utils/checkId.js"
import validate from "../utils/validate.js"
import validateCode from "../utils/valideCode.js"
const getAllCodesController = async (req, res) => {
  try {
    const codes = await codeDAO.getAllCodes(req)
    res.status(200).send(codes)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const getTrashCodesController = async (req, res) => {
  try {
    const codes = await codeDAO.getTrashCodes(req)
    res.status(200).send(codes)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const getCodeDetailController = async (req, res) => {
  try {
    const code = await codeDAO.getCodeDetail(req)
    if (code) {
      res.send({ code })
    } else {
      res.status(404).send({ message: "code not found" })
    }
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}


const createCodeController = async (req, res) => {
  try {
    let checkCodeStatus = -1
    let checkSaleStatus = -1
    let codeStatus = -1
    let status = -1
    await validate.checkExists(req.body.discountCode, checkID.checkCode).then(
      result => checkCodeStatus = result
    )
    if (checkCodeStatus === -1)
      res.status(401).send({ messgae: "Discount code is exist" })


    await validate.checkExists(req.body.saleId, checkID.checkSale).then(
      result => checkSaleStatus = result
    )
    if (checkSaleStatus === -1)
      res.status(401).send({ messgae: "SaleId is not exist" })


    await validate.validateCode(req.body, validateCode.handleValidateCode).then(
      result => codeStatus = result
    )
    if (codeStatus === -1)
      res.status(401).send({ messgae: "Input data invalid" })


    await codeDAO.createCode(req).then(
      result => status = result
    )
    if (status === -1)
      res.status(401).send({ messgae: "Can't create new code" })


    res.status(201).send({ message: "New code created" })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const destroyCodeController = async (req, res) => {
  try {
    const data = await codeDAO.destroyCode(req)
    res.status(200).send({
      message:
        data.deleteCount > 1
          ? "Deleted 1 item"
          : `Deleted ${data.deleteCount} items`,
      data,
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const editCodeController = async (req, res) => {
  try {
    // viết thêm hàm valide cho edit code 
    const data = await codeDAO.editCode(req)
    res.status(200).send({ message: "Updated Code", data })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const codeControllerDefault = {
  getAllCodesController,
  getTrashCodesController,
  getCodeDetailController,
  createCodeController,
  editCodeController,
  destroyCodeController
}

export default codeControllerDefault