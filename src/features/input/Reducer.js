import { ANALYZE_TEXT_SUCCESS,
         ANALYZE_TEXT_FAILURE,
         ANALYZE_IN_PROGRESS,
         EDIT_TEXT,
         HANDLE_ENTRY_FOCUS } from './Actions'


const initialState = {
  analyzedText: "",
  currentText: "",
  entryIsFocused: false,
  analyzedSuccess: true,
  analyzeInProgress: false,
  documents: [],
  request: {},
};

export default function Input(state = initialState, action) {

  switch(action.type){
    case ANALYZE_TEXT_SUCCESS:

      console.log("PAYLOAD: ", action.payload);
      let newData = JSON.parse(action.payload);

      return { ...state,
        documents: newData,
        request: action.request,
        analyzedText: state.currentText,
        analyzedSuccess: true,
        analyzeInProgress: false
    }

    case ANALYZE_TEXT_FAILURE:

      return { ...state,
        analyzedSuccess: false,
        analyzeInProgress: false
      }

    case ANALYZE_IN_PROGRESS:
      return { ...state,
        analyzeInProgress: true
      }

    case EDIT_TEXT:
      return { ...state, currentText: action.payload }

    case HANDLE_ENTRY_FOCUS:
      return { ...state, entryIsFocused: action.payload }

    default:
      return state;
  }
}
