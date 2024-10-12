export const getYears = () => {
  const currentYear = new Date().getFullYear();

  const yearsArray = [];
  for (let i = 0; i <= 9; i += 1) {
    yearsArray.push(currentYear - i);
  }
  return yearsArray;
};