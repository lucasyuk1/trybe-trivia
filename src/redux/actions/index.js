import { SUBMIT_LOGIN, INCREMENT_SCORE } from './actionTypes';

const submitLogin = (payload) => ({
  type: SUBMIT_LOGIN,
  payload,
});

const incrementScore = (payload) => ({
  type: INCREMENT_SCORE,
  payload,
});

// const saveScore = (assertions, score) => ({
//   type: SAVE_SCORE,
//   payload: {
//     assertions,
//     score,
//   },
// });

export { submitLogin, incrementScore };
