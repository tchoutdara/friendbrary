import React from 'react'
import { connect } from 'react-redux'
import { updatePost, addPost } from '../reducers/posts'
import { Form } from 'semantic-ui-react'

class PostForm extends React.Component {
  initialState = { title: '', mood: '', posting: '' }

  state = {...this.initialState}

  static getDerivedStateFromProps(props, state) {
    if (props.id !== state.id)
      return {...props}
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { closeForm, dispatch } = this.props
    const func = this.state.id ? updatePost : addPost
    dispatch(func(this.state))
    closeForm()
  }

  render() {
    const { title, posting, mood } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          name="title"
          required
          value={title}
          onChange={this.handleChange}
          label="Title"
        />
        <Form.Input
          name="posting"
          value={posting}
          onChange={this.handleChange}
          label="Posting"
        />
        <Form.Input
          name="mood"
          value={mood}
          onChange={this.handleChange}
          label="Mood"
        />
        <Form.Button color='blue' >Save</Form.Button>
      </Form>
    )
  }
}

export default connect()(PostForm)