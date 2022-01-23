const handleValidatePrompotion = async (data) => {
  if (data.name === undefined || data.name.length === 0 || data.name === null)
    return -1;
  if (
    data.discountType === undefined ||
      data.discountType === null ||
    !(data.discountType === 1 ||
    data.discountType === 2)
  )
    return -1;
  if (
    data.discountValue === undefined ||
    data.discountValue === null ||
    data.discountValue < 0
  )
    return -1;
  if (
    data.discountType === 1 &&
    (data.discountValue <= 0 || data.discountValue > 100)
  )
    return -1;
  if (
    data.applyProductType === undefined ||
    data.applyProductType === null ||
    !(data.applyProductType === 1 ||
    data.applyProductType === 2)
  )
    return -1;
  if (data.applyProductId.length < 1) return -1;
  return 1;
};

const validatePromotionDefault = {
  handleValidatePrompotion,
};
export default validatePromotionDefault;
