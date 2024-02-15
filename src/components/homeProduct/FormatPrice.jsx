const FormatPrice = ({ price }) => {
  return Intl.NumberFormat('bn-bd', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
  }).format(price / 1);
};

export default FormatPrice;
