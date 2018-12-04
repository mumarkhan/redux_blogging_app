import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";

class PostsNew extends Component {
  // field has some events tells that to which Field this is responsible for
  // field.input has some events and some props. It saves us from doing this thing:
  //onChange={field.input.onChange} , onFocus={field.input.onFocus}
  renderField(field) {
    // below is the example of the nested destructing
    // in the field there is a key meta get that key and using that key get the touched and error key values
    // like so meta.touched and meta.error
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={className}>
        {/* label is our own property which we send from the Field tag as shown below */}
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        {/* don't show the errors to the user when he hasn't enter anything yet 
        means when he 
comes to the page for the first time so show him the errors after the touched state */}
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }
  onSubmit(values) {
    // sending the values entered by the user
    // and the callback function which will be called after the successful
    // creation of the new post
    // action creator will use this function
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }
  render() {
    // redux-form gives some extra props one of this is handleSubmit
    const { handleSubmit } = this.props;
    return (
      // first when user will submit the form after entering the values
      // the redux-form side handling will occur means handleSubmit will be called
      // data will be validated and then a callback funtion in our case it is
      // onSubmit() will be called in which data will be submitted.
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        {/* here the label is our own property not the Field's one*/}
        <Field name="title" label="Title" component={this.renderField} />
        <Field
          name="categories"
          label="Categories"
          component={this.renderField}
        />
        <Field
          name="content"
          label="Post Content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">
          Submit{" "}
        </button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}
// when the user submits
// the form this function will be called automatically
// `values` has all the values that the user has
// entered into the form himself
function validate(values) {
  const errors = {};

  // validated the inputs from 'values'
  // the keys that we are picking here
  // like errors.title is actually the name of field that we
  // use above in the `Field tags` so that when the error shows on the web
  // it is close to its own field

  if (!values.title || values.title.length < 3) {
    errors.title = "Enter a title that is atleast 3 characters!";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories";
  }
  if (!values.content) {
    errors.content = "Enter some content please";
  }

  // if errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

// we may have many other forms on a single page so
// the name of the form which we are giving below should be unique
// as "PostsNewForm"
export default reduxForm({
  validate: validate,
  form: "PostsNewForm"
})(
  connect(
    null,
    { createPost }
  )(PostsNew)
);
// here we are not mapping anything to the props so
// just pass null for the time being
