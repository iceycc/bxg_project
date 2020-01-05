export default function userName (state = '', action) {
  const { type, payload } = action
  switch (type) {
    case 'CHANGE_USERNAME':
      return payload
    default:
      return state
  }
}
