import _ from "lodash";
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from "../actions";
import { bindActionCreators } from "redux";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      // const post = action.payload.data;
      // const newState = { ...state };
      // newState[post.id] = post;
      // return newState;

      // or the following
      // using [] we are not making an array
      // we are doing key interpulation
      // make a new key and use this value
      return { ...state, [action.payload.data.id]: action.payload.data };
    // use object for the state manipulation as it becomes very easy to
    // handle as compared to that if we make our state an array
    // e.g: while fetching post if that particular post already exists in the
    // state object the above syntax will automatically override the previous
    // value of that post while if we dealing with the application state as
    // an array it will be not so easy
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, "id");
    case DELETE_POST:
      // here the action.payload is the id of the post which we have deleted
      // coming from the action creator
      return _.omit(state, action.payload);
    // when we delete some particular post the post actually delted from the
    // api but it rather exists in ur local state so using omit we are going to
    // delete it from our local state also
    default:
      return state;
  }
}
