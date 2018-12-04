import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import PostsReducer from "./reducer_posts";

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer
});
// actually the reducer is only one
// but we make more than one so combineReducers
// will make them one and now all the actions will
// pass through all the reducers in this way
export default rootReducer;
