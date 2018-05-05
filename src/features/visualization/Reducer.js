import {
        EXPAND_TREE,
        RETRACT_TREE,
        FOCUS_SENTENCE,
        UNFOCUS_SENTENCE,
        SCROLL_UP,
        SCROLL_DOWN
      } from './Actions'

const initialState = {
  treeExpanded: false,
  sentenceFocused: false,
  scrollDirection: "",
}

export default function Visualization(state = initialState, action) {
  switch(action.type) {
    case EXPAND_TREE:
      return { ...state, treeExpanded: !state.treeExpanded }
    case FOCUS_SENTENCE:
      return { ...state, sentenceFocused: !state.sentenceFocused }
    case SCROLL_UP:
      return { ...state, scrollDirection: "up" }
    case SCROLL_DOWN:
      return { ...state, scrollDirection: "down" }
    default:
      return initialState;
  }
}
