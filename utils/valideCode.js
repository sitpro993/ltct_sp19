const handleValidateCode = (data) => {
  if (data.name === null || data.name.length === 0 || data.name === undefined)
    return -1;
  if (
    data.discountType === null ||
    data.discountType === undefined ||
    data.discountType < 1 ||
    data.discountType > 3 ||
    typeof data.discountValue !== "number"
  )
    return -1;

  if (
    data.discountValue === null ||
    data.discountValue === undefined ||
    typeof data.discountValue !== "number" ||
    data.discountValue < 0
  )
    return -1;

  if (
    data.discountType === 1 &&
    (typeof data.subConditions !== "number" ||
      data.discountValue <= 0 ||
      data.discountValue > 100)
  )
    return -1;

  if (
    data.discountType === 2 &&
    (data.subConditions !== null || data.subConditions !== undefined)
  )
    return -1;

  if (
    data.conditionType === null ||
    data.conditionType === undefined ||
    data.conditionType <= 0
  )
    return -1;

  if (data.count === null || data.count === undefined || data.count < 1)
    return -1;

  if (
    data.conditionType === null ||
    data.conditionType === undefined ||
    data.conditionType < 1 ||
    data.conditionType > 3
  )
    return -1;
  if (
    data.conditionValue === null ||
    data.conditionValue === undefined ||
    data.conditionValue < 0
  )
    return -1;

  return 1;
};

const valideCodeDefault = {
  handleValidateCode,
};
export default valideCodeDefault;
