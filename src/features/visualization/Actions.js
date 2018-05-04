// Actions.js
// Author: Tyler Angert

// MARK: Action types
// These are all of the actions that take place directly in the visualization
export const EXPAND_TREE = "EXPAND_TREE";
export const RETRACT_TREE = "RETRACT_TREE";

export const FOCUS_SENTENCE = "FOCUS_SENTENCE";
export const UNFOCUS_SENTENCE = "UNFOCUS_SENTENCE";

export const SCROLL_UP = "SCROLL_UP";
export const SCROLL_DOWN = "SCROLL_DOWN";

// MARK: Action creators
export function expandTree(data) {
  return {
    type: EXPAND_TREE,
    payload: data
  }
}

export function retractTree(data) {
  return {
    type: RETRACT_TREE,
    payload: data
  }
}

export function focusSentence(data) {
  return {
    type: FOCUS_SENTENCE,
    payload: data
  }
}

export function unfocusSentence(data) {
  return {
    type: UNFOCUS_SENTENCE,
    payload: data
  }
}

export function scrollUp(data) {
  return {
    type: SCROLL_UP,
    payload: data
  }
}

export function scrollDown(data) {
  return {
    type: SCROLL_DOWN,
    payload: data
  }
}
