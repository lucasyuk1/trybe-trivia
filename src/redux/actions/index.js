import { SUBMIT_LOGIN, INCREMENT_SCORE, INCREMENT_QUEST,
  ASSERTIONS } from './actionTypes';

const submitLogin = (payload) => ({
  type: SUBMIT_LOGIN,
  payload,
});

const incrementScore = (payload) => ({
  type: INCREMENT_SCORE,
  payload,
});

const incrementQuest = (payload) => ({
  type: INCREMENT_QUEST,
  currentQuest: payload,
});

const incrementAssertions = (payload) => ({
  type: ASSERTIONS,
  assertions: payload,
});

// const saveScore = (assertions, score) => ({
//   type: SAVE_SCORE,
//   payload: {
//     assertions,
//     score,
//   },
// });

export { submitLogin, incrementScore, incrementQuest, incrementAssertions };
