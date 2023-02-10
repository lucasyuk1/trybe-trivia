import { SUBMIT_LOGIN } from './actionTypes';

const submitLogin = (payload) => ({
  type: SUBMIT_LOGIN,
  payload,
});

// const saveScore = (assertions, score) => ({
//   type: SAVE_SCORE,
//   payload: {
//     assertions,
//     score,
//   },
// });

export { submitLogin };
