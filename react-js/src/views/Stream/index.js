import React from 'react'
import { Responsive ,Embed, Grid, Header, Divider } from 'semantic-ui-react'
import Thumbnail from '../../component/Thumbnail'

class Stream extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    	video:null,
    	thumbnail:null,
    	mounted:false
    }
    
  }

  componentDidMount() {
  	const {state} = this.props.location
  	if (state && state.video) {
  		this.setState({
  			video:state.video,
  			mounted:true
  		})
  	}
  }

  _screenShot = (thumbnail) => this.setState({ thumbnail })

  render() {
  	const {video, thumbnail, mounted} = this.state
  	if (!mounted) {
  		return(
  			<div></div>
  			)
  	}
    return(
      <Responsive style={{marginTop:'10px'}}>
      <Grid centered>
	    <Grid.Column mobile={15} tablet={15} computer={8}>
	    <Header size='huge' style={{marginTop:'10px'}}>Streaming</Header>
      	<Divider/>
	      <Embed
		    icon='circle play'
		    placeholder={thumbnail}
		    url={video}
		  />
	    </Grid.Column>
	  </Grid>
	  <Thumbnail
        target="/streaming"
        renderThumbnail={false}
        thumbnailHandler={this._screenShot}
        videoUrl={video}
      />
      </Responsive>
      )
  }
}

export default Stream