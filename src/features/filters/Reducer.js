import {
        FILTER_POS,
        FILTER_NER,
        SELECT_POS,
        SELECT_NER,
      } from './Actions'

const initialState = {
  posOn : false,
  nerOn: false,
  selectedPos: [],
  selectedNer: []
}

// TODO: Add this to the filter pos / ner global actions to turn on everything in the array 
function addAll(data, targetArray) {

}

export default function Filters(state = initialState, action) {

  switch(action.type) {

    case FILTER_POS:
      return { ...state, posOn: !state.posOn }

    case FILTER_NER:
      return { ...state, nerOn: !state.nerOn }

    case SELECT_POS:
      return { ...state,
                selectedPos: state.selectedPos.includes(action.payload) ?
                              [...state.selectedPos.filter(pos => pos !== action.payload)] :
                              [...state.selectedPos, action.payload]
                            }
    case SELECT_NER:
      return { ...state,
              selectedNer: state.selectedNer.includes(action.payload) ?
                            [...state.selectedNer.filter(ner => ner !== action.payload)] :
                            [...state.selectedNer, action.payload]
                          }
    default:
      return initialState;
  }
}
