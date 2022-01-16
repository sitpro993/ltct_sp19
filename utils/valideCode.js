const handleValidateCode = (data) => {
  if(data.percentDiscount !== null && (data.cashDiscount != null || data.bundledProduct != null || data.priceMin < 0)) return -1
  if(data.cashDiscount !== null && (data.percentDiscount != null || data.bundledProduct != null || data.totalProduct < 0)) return -1
  if(data.bundledProduct !== null && (data.cashDiscount != null || data.percentDiscount != null)) return -1

  return 1;
}


const valideCodeDefault = {
  handleValidateCode
}
export default valideCodeDefault
