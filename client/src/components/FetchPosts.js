import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../reducers/posts'
import { Loader, Segment, Dimmer } from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import Posts from './Posts'
import PostView from './PostView'

class FetchPosts extends React.Component {
  state = { loaded: false }

  componentDidMount() {
    this.props.dispatch(getPosts(this.setLoaded))
  }

  setLoaded = () => {
    this.setState({ loaded: true })
  }

  render() {
    const { loaded } = this.state
    if (loaded) {
      return (
        <Fragment>
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:id" component={PostView} />
        </Fragment>
      )
    } else {
      return (
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </Segment>
      )
    }
  }
}

export default connect()(FetchPosts)