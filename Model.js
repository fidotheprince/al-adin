const initModel = {
  description: 'Breakfast',
  calories: 480,
  showForm: false,
  nextId: 0,
  editId: null, /*When we're not editing a meal, edit ID won't have a value. The we we indicate the absense of a value in JS is by referencing the null primitive value type*/
  meals: []
};

export default initModel;
