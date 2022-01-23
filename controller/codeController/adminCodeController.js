import codeDAO from "../../dao/codeDAO.js";
import checkID from "../../utils/checkId.js";
import validate from "../../utils/validate.js";
import validateCode from "../../utils/valideCode.js";

const getAllCodesController = async (req, res) => {
  try {
    const codes = await codeDAO.getAllCodes(req);
    res.status(200).send({ data: codes });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getTrashCodesController = async (req, res) => {
  try {
    const codes = await codeDAO.getTrashCodes(req);
    res.status(200).send({ data: codes });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getCodeDetailController = async (req, res) => {
  try {
    const status = await validate.validateCode(
      req.params.id,
      checkID.checkValidateId
    );
    if (status === -1) {
      res.status(401).send({ error: "Invalid id" });
      return;
    }
    const code = await codeDAO.getCodeDetail(req);
    if (code) {
      res.send({ data: code });
    } else {
      res.status(404).send({ error: "code not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//done
const createCodeController = async (req, res) => {
  try {
    const codeStatus = await validate.validateCode(
      req.body,
      validateCode.handleValidateCode
    );
    if (codeStatus === -1) {
      res.status(401).send({ error: "Input data invalid" });
      return;
    }

    const status = await codeDAO.createCode(req.body);
    if (status === -1) {
      res.status(401).send({ error: "Can't create new code" });
      return;
    }

    res.status(201).send({ success: "New code created" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//done
const destroyCodeController = async (req, res) => {
  try {
    const status = await validate.validateCode(
      req.body.codeIds,
      checkID.checkValidateIds
    );
    if (status === -1) {
      res.status(401).send({ error: "Invalid id" });
      return;
    }
    const data = await codeDAO.destroyCode(req.body);
    res.status(200).send({
      message:
        data.deletedCount > 1
          ? "Deleted 1 item"
          : `Deleted ${data.deletedCount} items`,
      data,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const editCodeController = async (req, res) => {
  try {
    const status = await validate.validateCode(
      req.body.id,
      checkID.checkValidateId
    );
    if (status === -1) {
      res.status(401).send({ error: "Invalid id" });
      return;
    }
    const codeStatus = await validate.validateCode(
      req.body,
      validateCode.handleValidateCode
    );
    if (codeStatus === -1) {
      res.status(401).send({ error: "Input data invalid" });
      return;
    }

    const data = await codeDAO.editCode(req.body);
    res.status(200).send({ success: "Updated Code",data: data });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//done
const restoreCodeController = async (req, res) => {
  const status = await validate.validateCode(
    req.body.codeIds,
    checkID.checkValidateIds
  );
  if (status === -1) {
    res.status(401).send({ error: "Invalid id" });
    return;
  }
  const data = await codeDAO.restoreCode(req.body);
  res.status(200).send({ success: "Restore Code", data });
};

//done
const deleteCodeController = async (req, res) => {
  const status = await validate.validateCode(
    req.body.codeIds,
    checkID.checkValidateIds
  );
  if (status === -1) {
    res.status(401).send({ error: "Invalid id" });
    return;
  }
  const data = await codeDAO.deleteCode(req.body);
  res.status(200).send({ success: "Deleted Code", data });
};
const codeControllerDefault = {
  getAllCodesController,
  getTrashCodesController,
  getCodeDetailController,
  createCodeController,
  editCodeController,
  destroyCodeController,
  restoreCodeController,
  deleteCodeController,
};

export default codeControllerDefault;
