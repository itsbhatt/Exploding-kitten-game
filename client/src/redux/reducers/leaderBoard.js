import { SET_USER } from '../actions/types';

const initialState = [];

export default function alert(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return [...state, payload];

    default:
      return state;
  }
}
