const initialState = {
    isLoading: false,
  }
  
  export default function LoadingReducer(state = initialState, action) {
  //   console.log('CollApsedReducer收到 action：', action)
  
    let {type,payload} = action

    switch (action.type) {
      case 'change_loading':
        return {
          ...state,
          isLoading: payload
        }
      default:
        return state
    }
  }
  