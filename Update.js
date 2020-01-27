import * as R from 'ramda';

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  MEAL_INPUT: 'MEAL_INPUT',
  CALORIES_INPUT: 'CALORIES_INPUT',
  SAVE_MEAL: 'SAVE_MEAL',
  DELETE_MEAL: 'DELETE_MEAL',
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
      return add(msg, model);
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

export default update;
