import React from 'react'
import {getVideos} from '../../api'
import {Container, Grid, Header, Divider} from 'semantic-ui-react'
import Thumbnail from '../../component/Thumbnail'
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videos:[]
    }
    this.targetUrl = process.env.REACT_APP_TARGET_URL
  }

  componentDidMount() {
    getVideos().then((response)=>{
      this.setState({
        videos:response.data.data
      })
    },(error)=>{
      console.log(error);
    })
  }

  render() {
    const {videos} = this.state
    return(
      <Container>
      <Header size='huge' style={{marginTop:'10px'}}>Videos</Header>
      <Divider/>
      <Grid>
      {
        videos.map((video,key)=>{
          return (            
              <Thumbnail
              target="/streaming"
              key={key}
              videoUrl={`${this.targetUrl}/video/${video}`}
              />
            )
        })
      }
      </Grid>
      </Container>

      )
  }
}

export default Home