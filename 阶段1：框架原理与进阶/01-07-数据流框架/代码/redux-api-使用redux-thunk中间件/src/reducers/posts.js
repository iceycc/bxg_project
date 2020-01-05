export default (state = {
  loading: true,
  posts: []
}, { type, payload }) => {
  switch (type) {
    case 'REQUEST_POSTS':
      return {
        ...state,
        loading: payload
      }
    case 'RECEIVE_POSTS':
      return {
        ...state,
        posts: payload
      }
    default:
      return state
  }
}
