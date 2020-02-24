import * as R from 'ramda';

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  MEAL_INPUT: 'MEAL_INPUT',
  CALORIES_INPUT: 'CALORIES_INPUT',
  SAVE_MEAL: 'SAVE_MEAL',
  DELETE_MEAL: 'DELETE_MEAL',
  EDIT_MEAL: 'EDIT_MEAL',
};

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM, //object point to a property that is a string
    showForm,
  };
}

export function mealInputMsg(description) {
  return {
    type: MSGS.MEAL_INPUT,
    description,
  };
}

export function caloriesInputMsg(calories) {
  return {
    type: MSGS.CALORIES_INPUT,
    calories, //holds the value that is typed in
  };
}

export const saveMealMsg = { type: MSGS.SAVE_MEAL };

export function deleteMealMsg(id) {
  return {
    type: MSGS.DELETE_MEAL,
    id,
  };
};
//editId is the given id of the meal
//clicked on through the edit icon
export function editMealMsg(editId) {
  return {
    type: MSGS.EDIT_MEAL,
    editId,
  };
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.SHOW_FORM: {
      const { showForm } = msg;
      return { ...model, showForm, description: '', calories: 0 };
    }
    case MSGS.MEAL_INPUT: {
      const { description } = msg; //unpacks the msg that's passed in the mealInputMsg
      return { ...model, description };
    }
    case MSGS.CALORIES_INPUT: {
      const calories = R.pipe(
        parseInt,
        R.defaultTo(0),
      )(msg.calories); // this is the data that gets passed through the R.pipe, this is the data that typed
      return { ...model, calories };
    }
    case MSGS.SAVE_MEAL: {
      const { editId } = model;
      // when you click the save button
      // is the edit set to null or not
      // if editId exist (editId is id of meal record clicked)
      // run the edit function
      const updatedModel = editId !== null ?
          edit(msg, model) :
          add(msg, model);
        return updatedModel;
    }
    case MSGS.DELETE_MEAL: {
      const { id } = msg;
      const meals = R.filter(
        meal => meal.id !== id
        , model.meals);
        return { ...model, meals };
    }
    case MSGS.EDIT_MEAL: {
      // this is the editId is the id generated for every new meal
      //record created
      const { editId } = msg;
      const meal = R.find(
        meal => meal.id === editId,
        model.meals);
        //this unpack the description and calories from
        //the meal with the corresponding meal
        //essentially to set them to be edited
        //const meal holds the matching meal from meals array
        const { description, calories } = meal;

        return  {
          ...model,
          editId,
          description,
          calories,
          showForm: true,
        }
    }
  }
  return model;
};

function add(msg, model) {
  const { nextId, description, calories } = model;
  const meal = { id: nextId, description, calories };
  const meals = [...model.meals, meal];
  return {
    ...model,
    meals,
    nextId: nextId + 1,
    description: '',
    calories: 0,
    showForm: false
  }
};

function edit(msg, model) {
  const { description, calories, editId } = model;
  // sets meals variable to the meal(id) that matched the editId unpacked above
  const meals = R.map(meal => {
    if (meal.id === editId) {
      // unpacks description and calories to be edited
      return { ...meal, description, calories };
    }
    //if meal.id doesnt == editId
    //just return the meal
    return meal;
  }, model.meals);
  //resets app to its default state
  return {
    ...model,
    meals,
    description: '',
    calories: 0,
    showForm: false,
    editId: null,
  };
}

export default update;
