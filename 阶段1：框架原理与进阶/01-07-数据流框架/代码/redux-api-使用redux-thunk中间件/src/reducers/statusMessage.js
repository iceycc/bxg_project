export default function statusMessage (state = '', action) {
  const { type, payload } = action
  switch (type) {
    case 'CHANGE_STATUS':
      return payload
    default:
      return state
  }
}
