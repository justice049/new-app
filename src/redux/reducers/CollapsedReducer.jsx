const initialState = {
  isCollapsed: false,
}

export default function CollApsedReducer(state = initialState, action) {
//   console.log('CollApsedReducer收到 action：', action)

  switch (action.type) {
    case 'change_collapsed':
      return {
        ...state,
        isCollapsed: !state.isCollapsed,
      }
    default:
      return state
  }
}
