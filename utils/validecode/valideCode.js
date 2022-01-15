export const handleValidateCode = (data) => {
    if (data.name === undefined || data.name == null || data.name.length) return -1
    if (data.description === undefined || data.description == null || data.description.length) return -1
    if (data.count === undefined || data.count == null || data.count <= 0) return -1
    if ((data.percentDiscount === null && data.cashDiscount === null && data.discountCode === null) || (data.percentDiscount === undefined && data.cashDiscount === undefined && data.discountCode === undefined)) return -1
    if (data.level < 1 || data.level > 3) return -1
    if (data.priceMin <= 0) return -1

    return 1
}
