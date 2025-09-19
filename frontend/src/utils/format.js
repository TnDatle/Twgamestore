// src/utils/format.js
export const formatPrice = (price) => {
  if (price === undefined || price === null || price === "") return "Liên hệ";
  const number = Number(price);
  if (isNaN(number)) return "Liên hệ";
  return number.toLocaleString("vi-VN") + "₫";
};
