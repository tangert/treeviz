// Actions.js
// Author: Tyler Angert
import rp from 'request-promise'

const API_URL = 'https://elit.cloud/api/public/decode';

// MARK: Action types
export const EDIT_TEXT = 'EDIT_TEXT';
export const ANALYZE_TEXT = 'ANALYZE_TEXT';
export const ANALYZE_IN_PROGRESS = 'ANALYZE_IN_PROGRESS';
export const ANALYZE_TEXT_SUCCESS = 'ANALYZE_TEXT_SUCCESS';
export const ANALYZE_TEXT_FAILURE = 'ANALYZE_TEXT_FAILURE';
export const HANDLE_ENTRY_FOCUS = 'HANDLE_ENTRY_FOCUS';

// MARK: Action creators

/****TEXT ENTRY FUNCTIONS****/
export function editText(data){
  return {
    type: EDIT_TEXT,
    payload: data
  }
}

//Called when analyzing any piece of text.
export function analyzeText(data){

  return (dispatch) => {

    var options = {
      method: 'POST',
      uri: API_URL,
      form: data,
      headers: {
        'Content-Type': 'application/json',
      },
      resolveWithFullResponse: true
    };

    //In progress
    dispatch(analyzeInProgress());

    return rp(options)
      .then(function (b) {

        let docs = b.body;

        //Send the request body to analyze success
        dispatch(analyzeTextSuccess(docs, data))

      })
      .catch(function (error) {
        console.error("ERROR: ", error);
        dispatch(analyzeTextFailure());
      });
    }
}

export function analyzeInProgress() {
  return {
    type: ANALYZE_IN_PROGRESS
  }
}

// CALLED ONCE THE API RETURNS SUCCESSFULLY
export function analyzeTextSuccess(data, request) {
  console.log("success!");

  return {
    type: ANALYZE_TEXT_SUCCESS,
    payload: data,
    request: request
  }
}

export function analyzeTextFailure() {
  return {
    type: ANALYZE_TEXT_FAILURE
  }
}

export function handleEntryFocus(data) {
  return {
    type: HANDLE_ENTRY_FOCUS,
    payload: data
  }
}
