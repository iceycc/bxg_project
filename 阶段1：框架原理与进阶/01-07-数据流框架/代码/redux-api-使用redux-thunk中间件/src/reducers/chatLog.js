export default function chatLog (state = [], action) {
  const { type, payload } = action
  switch (type) {
    case 'ADD_CHAT':
      return [...state, payload]
    default:
      return state
  }
}
