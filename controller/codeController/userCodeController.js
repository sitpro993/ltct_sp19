import codeDAO from "../../dao/codeDAO.js";
import checkID from "../../utils/checkId.js";
import validate from "../../utils/validate.js";
const getCodeDetailController = async (req, res) => {
  try {
    const code = await codeDAO.getCodeByCode(req.body.code);
    if (!code) {
      res.status(404).json({ error: "Code not found" });
      return;
    }
    res.status(200).json({ data: code });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllController = async (req, res) => {
    try {
      const codes = await codeDAO.getAllCodesUser();
      res.status(200).send({data:codes})
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
}
const getByIdController = async (req, res) => {
    try {
      const status = await validate.validateCode(
        req.params.id,
        checkID.checkValidateId
      )
      if (status === -1) {
        res.status(401).send({ error: "Invalid id" });
        return;
      }
      const code = await codeDAO.getUsedQty(req.params.id);
      if(code === null){
        res.status(404).send({error:"Code not found"})
        return
      }
      res.status(200).send({data:code})
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
}
const updateCountCodeController = async (req, res) => {
  try {
    const status = await validate.validateCode(
      req.body.id,
      checkID.checkValidateId
    );
    if (status === -1) {
      res.status(401).send({ error: "Invalid id" });
      return;
    }
    const code = await codeDAO.updateCountCode(req.body.id);
    if (code === -1) {
      res.status(401).send({ error: "Id does not exist" });
      return 
    }
    res.status(200).send({ success: "Update success"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const userCodeControllerDefault = {
  getCodeDetailController,
  getAllController,
  getByIdController,
  updateCountCodeController,
};

export default userCodeControllerDefault;
