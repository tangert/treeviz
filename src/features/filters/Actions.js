// Actions.js
// Author: Tyler Angert

// MARK: Action types
// Used to filter at a global level on / off
export const FILTER_POS = "FILTER_POS"
export const FILTER_NER = "FILTER_NER"

export const SELECT_POS = "SELECT_POS"
export const UNSELECT_POS = "UNSELECT_POS"

export const SELECT_NER = "SELECT_NER"
export const UNSELECT_NER = "UNSELECT_NER"

// MARK: Action creators
export function filterPOS(data) {
  return {
    type: FILTER_POS,
    payload: data
  }
}

export function filterNER(data) {
  return {
    type: FILTER_NER,
    payload: data
  }
}

export function selectPOS(data) {
  return {
    type: SELECT_POS,
    payload: data
  }
}

export function unselectPOS(data) {
  return {
    type: UNSELECT_POS,
    payload: data
  }
}

export function selectNER(data) {
  return {
    type: SELECT_NER,
    payload: data
  }
}

export function unselectNER(data) {
  return {
    type: UNSELECT_NER,
    payload: data
  }
}
