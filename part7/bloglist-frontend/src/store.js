import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import authReducer from './reducers/authReducer'
import userReducer from './reducers/userReducer'
import blogReducer, { /* getAllBlogs */ } from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  authUser: authReducer,
  users: userReducer,
  blogs: blogReducer,
  notification: notificationReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store