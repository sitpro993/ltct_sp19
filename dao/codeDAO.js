import Code from '../models/codeModel'

const createCode = async (req) => {
    const code = new Code({
        saleId: req.body.saleId,
        name: req.body.name,
        description: req.body.description,
        count: req.body.count,
        percentDiscount: req.body.percentDiscount,
        cashDiscount: req.body.cashDiscount,
        bundledProduct: req.body.bundledProduct,
        level: req.body.level,
        priceMin: req.body.priceMin,
        totalProduct: req.body.totalProduct,
        discountCode: req.body.discountCode,
    });
    const createCode = await code.save();
    if (!createCode) return -1;
    return 1;
}

const getAllCodes = async (req) => {
    const column = req.query.column || "name";
    const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
        req.query.sort
    )
        ? req.query.sort
        : "asc";
    return await Code.find({ deleted: false }).sort([[column, sort]]);
}

const getTrashCodes = async (req) => {
    const column = req.query.column || "discountCode"
    const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
        req.query.sort
    )
        ? req.query.sort
        : "asc"
    return await Code.find({ deleted: true }).sort([[column, sort]])
}

const getCodeDetail = async (req) => {
    return await Code.findById(req.params.id)
}

const destroyCode = async (req) => {
    return await Code.deleteMany({
        _id: { $in: req.body.codeIds },
    })
}

const editCode = async (req) => {
    return await Code.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
    })
}

const getCodeByID = async (id) => {
    return await Code.find({ saleId: id })
}

const updateCodeMany = async (req) => {
    return await Code.updateMany(
        { saleId: { $in: req.body.saleIds } },
        { deleted: true, deletedAt: new Date() }
    )
}
// const updateCodeMany = async (req) => {
//     await Code.updateMany(
//         { saleId: { $in: req.body.saleIds } },
//         { deleted: true, deletedAt: new Date() },
//         {
//             new: true,
//           }
//     )
// }

const codeDAODefault = {
    createCode,
    getAllCodes,
    getTrashCodes,
    getCodeDetail,
    destroyCode,
    editCode,
    getCodeByID,
    updateCodeMany
}
export default codeDAODefault