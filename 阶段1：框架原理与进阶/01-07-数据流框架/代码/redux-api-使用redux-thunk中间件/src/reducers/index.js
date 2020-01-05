import { combineReducers } from 'redux'
import chatLog from './chatLog'
import statusMessage from './statusMessage'
import changeUserName from './userName'
import posts from './posts'

export default combineReducers({
  chatLog,
  statusMessage,
  userName: changeUserName,
  posts
})

// export default function (state = {}, action = {}) {
//   return {
//     chatLog: chatLog(state.chatLog, action),
//     statusMessage: statusMessage(state.statusMessage, action),
//     userName: userName(state.userName, action)
//   }
// }
