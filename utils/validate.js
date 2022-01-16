export const validateCode = async (data, handeData) => {
  const status = await handeData(data);
  return status;
};
export const checkExists = async (data, handleData) => {
  const status = await handleData(data);
  return status;
};
