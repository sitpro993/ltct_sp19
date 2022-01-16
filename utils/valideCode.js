const handleValidateCode = (data) => {
  if (data.name === null || data.name.length === 0) return -1;
  if (data.discountCode === null || data.discountCode.length === 0) return -1;
  if (
    data.percentDiscount !== null &&
    (data.cashDiscount !== null || data.bundledProduct !== null)
  )
    return -1;
  if (
    data.cashDiscount !== null &&
    (data.percentDiscount !== null || data.bundledProduct != null)
  )
    return -1;
  if (
    data.bundledProduct !== null &&
    (data.cashDiscount !== null || data.percentDiscount !== null)
  )
    return -1;
  if (
    data.bundledProduct === null &&
    data.cashDiscount === null &&
    data.percentDiscount === null
  )
    return -1;
  if (data.priceMin !== null && data.totalProduct !== null) return -1;
  if (data.priceMin === null && data.totalProduct === null) return -1;
  return 1;
};

const valideCodeDefault = {
  handleValidateCode,
};
export default valideCodeDefault;
