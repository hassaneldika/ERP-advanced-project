/**
 * Format select
 * @param array
 * @param newArray
 */
const StructureSelect = (array, newArray) => {
  for (let i = 0; i < array.length; i++) {
    newArray.push({
      value: array[i].email,
      label: `${array[i].first_name} ${array[i].email}`,
    });
  }
};

export default StructureSelect;
