import { SUBMIT_LOGIN } from './actionTypes';

const submitLogin = (name, email) => ({
  type: SUBMIT_LOGIN,
  payload: {
    name,
    email,
  },
});

// const saveScore = (assertions, score) => ({
//   type: SAVE_SCORE,
//   payload: {
//     assertions,
//     score,
//   },
// });

export { submitLogin };
