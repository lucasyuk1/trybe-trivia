import { SUBMIT_LOGIN } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '', // nome-da-pessoa,
  assertions: '', // número-de-acertos,
  score: '', // pontuação
  gravatarEmail: '', // email-da-pessoa,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_LOGIN:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
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
