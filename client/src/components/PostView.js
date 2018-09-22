import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, Container, Table, Button,
} from 'semantic-ui-react'
import PostForm from './PostForm'


class PostView extends React.Component {
  state = { showForm: false }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm })
  }

  render() {
    const { showForm } = this.state
    const { post } = this.props
    return (
      <Container>
        <Button><Link to="/posts">View All Posts</Link></Button>
        <Button color='red' floated='right' onClick={this.toggleForm}>
          { showForm ? 'Cancel' : 'Edit' }
        </Button>
        { showForm ?
            <PostForm {...post} closeForm={this.toggleForm} />
            :
            <Fragment>
              <Header as="h3" textAlign="center">{post.title}</Header>
              <Table definition>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Post</Table.Cell>
                    <Table.Cell>{post.post_space}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Author</Table.Cell>
                    <Table.Cell>{post.author}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Mood</Table.Cell>
                    <Table.Cell>{post.mood}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Fragment>
          }
      </Container>
    )
  }
}


const mapStateToProps = (state, props) => {
  const { id } = props.match.params
  const { posts } = state
  const post = posts.find( p => p.id === parseInt(id, 10) )
  return { post }
}

export default connect(mapStateToProps)(PostView);