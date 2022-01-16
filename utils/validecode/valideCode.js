export const handleValidateCode = (data) => {
  if (data.name === undefined || data.name == null || data.name.length === 0)
    return "Name is required";
  if ((data.count !== undefined || data.count !== null) && data.count <= 0)
    return "Count is positive numbers";
  if (
    (data.percentDiscount && !data.cashDiscount && !data.bundledProduct) ||
    (!data.percentDiscount && data.cashDiscount && !data.bundledProduct) ||
    (!data.percentDiscount && !data.cashDiscount && data.bundledProduct)
  ) {
  }
  return "percentDiscount or cashDiscount or bundledProduct is fill";

  if (data.level !== null && (data.level < 1 || data.level > 3))
    return "Level is 1 or 2 or 3";
  if (data.priceMin === null && data.totalProduct === null) {
    return "priceMin or totalProduct is fill";
  }
  if (data.priceMin <= 0) return "priceMin positive numbers";

  return 1;
};
