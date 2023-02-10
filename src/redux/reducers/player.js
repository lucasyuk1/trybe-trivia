import { SUBMIT_LOGIN } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '', // nome-da-pessoa,
  assertions: 0, // número-de-acertos,
  score: 0, // pontuação
  gravatarEmail: '', // email-da-pessoa,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_LOGIN:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
      score: 0,
    };
  // case SAVE_SCORE:
  //   return {
  //     ...state,
  //     assertions: action.payload.assertions,
  //     score: action.payload.score,
  //   };
  default:
    return state;
  }
};

export default player;
