const handleValidateCode = (data) => {
  if (data.name === null || data.name.length === 0 || data.name === undefined)
    return -1;
  console.log(1);
  if (
    data.discountType === null ||
    data.discountType === undefined ||
    data.discountType < 1 ||
    data.discountType > 3 ||
    typeof data.discountValue !== "number"
  )
    return -1;
  console.log(2);

  if (
    data.discountValue === null ||
    data.discountValue === undefined ||
    typeof data.discountValue !== "number" ||
    data.discountValue < 0
  )
    return -1;
  console.log(3);

  if (
    data.discountType === 1 &&
    (typeof data.subConditions !== "number" ||
      data.discountValue <= 0 ||
      data.discountValue > 100)
  )
    return -1;
  console.log(4);

  if (data.discountType === 2 && data.subConditions !== -1) return -1;
  console.log(5);

  if (
    data.conditionType === null ||
    data.conditionType === undefined ||
    data.conditionType <= 0
  )
    return -1;
  console.log(6);

  if (data.count === null || data.count === undefined || data.count < 1)
    return -1;
  console.log(7);

  if (
    data.conditionType === null ||
    data.conditionType === undefined ||
    data.conditionType < 1 ||
    data.conditionType > 3
  )
    return -1;
  console.log(8);
  if (
    data.conditionValue === null ||
    data.conditionValue === undefined ||
    data.conditionValue < 0
  )
    return -1;
  console.log(9);

  return 1;
};

const valideCodeDefault = {
  handleValidateCode,
};
export default valideCodeDefault;
