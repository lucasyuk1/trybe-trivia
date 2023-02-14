import { SUBMIT_LOGIN, INCREMENT_SCORE, INCREMENT_QUEST,
  ASSERTIONS,
  SAVE_RANKING } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '', // nome-da-pessoa,
  assertions: 0, // número-de-acertos,
  score: 0, // pontuação
  gravatarEmail: '', // email-da-pessoa,
  currentQuest: 0,
  rankingList: [],
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
  case INCREMENT_SCORE:
    return {
      ...state,
      score: action.payload.score,
    };
  case INCREMENT_QUEST:
    return {
      ...state,
      currentQuest: action.currentQuest,
    };
  case ASSERTIONS:
    return {
      ...state,
      assertions: action.assertions,
    };
  case SAVE_RANKING:
    return {
      ...state,
      rankingList: [...state.rankingList, { ...action.userRank }],
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
