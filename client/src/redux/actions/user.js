import { SET_USER } from './types';

export const getSetUser = (username) => async (dispatch) => {
  try {
    // const res = await fetch(`/users`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username,
    //   }),
    // });
    // const data = await res.json();

    dispatch({
      type: SET_USER,
      payload: {
        username,
        // savedGame: [...data.savedGame],
        // win: data.win,
        // loose: data.loose,
        // gamesPlayed: data.gamesPlayed,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
