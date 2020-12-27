import { SET_USER } from '../actions/types';

const initialState = {
  username: 'xyz',
  game: {
    score: 0,
    totalGames: 0,
    win: 0,
    lose: 0,
  },
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
