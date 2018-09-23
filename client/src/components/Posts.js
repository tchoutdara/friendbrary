import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Card, Dropdown, Divider, Button } from 'semantic-ui-react'
import PostForm from './PostForm'
import { Link } from 'react-router-dom'



class Posts extends React.Component {
  state = { mood: '', showForm: false }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm }) 
  }



moodOptions = () => {
    const { moods } = this.props
    return moods.map( (a) => { return { key: a, text: a, value: a } } )
  }

  posts = () => {
    const { posts } = this.props
    const { mood } = this.state

    let visible = posts

    if (mood) 
      visible = posts.filter( p => p.mood === mood )

    return visible.map( post => {
      const { title, id, mood, posting } = post
      return (
        <Card key={id}>
          <Card.Content>
            <Card.Header>
              {title}
            </Card.Header>
            <Card.Meta>
              <span>mood: {mood}</span>
            </Card.Meta>
            <Card.Description>
              {posting}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          <Link to={`/posts/${post.id}`}>
              View Post
            </Link>
          </Card.Content>
        </Card>
      )
    })
  }

  handleChange = (_, { value }) => {
    this.setState({ mood: value })
  }

  render() {
    const { mood, showForm } = this.state

    return (
      <Container>
        <Header as="h3" textAlign="center">Posts</Header>
        <Button color='green' fluid onClick={this.toggleForm}>
          { showForm ? 'Hide Form' : 'Create a Post' }
        </Button>
        <Divider />
        { showForm ?
            <PostForm closeForm={this.toggleForm} />
            :
            <Fragment>
              <Dropdown
                placeholder="Filter by mood..."
                fluid
                selection
                options={this.moodOptions()}
                value={mood}
                onChange={this.handleChange}
              />
              { mood && 
                  <Button
                    fluid
                    basic
                    onClick={ () => this.setState({ mood: '' }) }
                  >
                    Clear Filter: {mood}
                  </Button>
              }
              <Divider />
              <Card.Group itemsPerRow={1} stackable>
                { this.posts() }
              </Card.Group>
            </Fragment>
          }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { posts } = state
  const moods = [...new Set(posts.map( p => p.mood ))]
  return { posts, moods }
}

export default connect(mapStateToProps)(Posts)