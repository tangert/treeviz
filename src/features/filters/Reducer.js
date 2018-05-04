import {
        FILTER_POS,
        FILTER_NER,
        SELECT_POS,
        SELECT_NER,
        UNSELECT_NER,
        UNSELECT_POS
      } from './Actions'

const initialState = {
  posOn : false,
  nerOn: false,
  selectedPos: [],
  selectedNer: []
}

export default function Filters(state = initialState, action) {
  switch(action.type) {
    case FILTER_POS:
      return { ...state, posOn: !state.posOn }
    case FILTER_NER:
      return { ...state, nerOn: !state.nerOn }
    case SELECT_POS:
      return { ...state, selectedPos: [...state.selectedPos, action.payload] }
    case UNSELECT_POS:
      return { ...state, selectedPos: [...state.selectedPos.filter(pos => pos !== action.payload)] }
    case SELECT_NER:
      return { ...state, selectedNer: [...state.selectedNer, action.payload] }
    case UNSELECT_NER:
      return { ...state, selectedNer: [...state.selectedNer.filter(pos => pos !== action.payload)] }
    default:
      return initialState;
  }
}
