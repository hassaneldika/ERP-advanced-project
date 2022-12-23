/**
 * Format Date format to dd/mm/yyyy
 * @param date
 * @returns {`${number}/${number}/${number}`}
 */
const formatDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
};

export default formatDate;
