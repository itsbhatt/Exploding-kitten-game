import { SET_USER } from '../actions/types';

const initialState = {
  score: 0,
  cardsLeft: [],
  defuse: 0,
  suffle: 0,
};

export default function alert(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return [...state, payload];

    default:
      return state;
  }
}
