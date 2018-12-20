import React from 'react'
import {FileButton} from '../../component/FileButton'
import { Grid, Button, Container, Form, Divider, Message, Header } from 'semantic-ui-react'
import {uploadVideo} from '../../api'
class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      video:null,
      loading:false,
      message:null
    }
    
  }
  // triggers when file is been selected
  _fileSelected = (video) => {
    if ((/\.(mp4)$/i).test(video.name)) {
      this.setState({video})
    }else{
      this.setState({
        message:"Invalid file format provided"
      })
    }
  }
  // when we have to upload a file
  _startUpload = () => {
    const {video} = this.state
    if (video) {
      /* start loading before upload */
      this.setState({
        loading:true
      })
      uploadVideo(video).then((response)=>{
        /* set response message and stop loader */
        this.setState({
            message:response.data.message,
            loading:false
        })
      },(error)=>{
        /* if error occured, set error message */
        this.setState({
            message:'Something went wrong while uploading video. please try again',
            loading:false
        })
      })
    }
  }

  render() {
    const {video, loading, message} = this.state
    return(
      <Container className="home-container">
      <Header size='huge' style={{marginTop:'10px'}}>Upload Videos</Header>
        <Divider/>               
      <Grid>
        <Grid.Column>
        {message && <Message
                  header={message}
                /> }
          <Grid centered verticalAlign='middle' style={{marginTop:'10%'}}>            
            <Form loading={loading}>
             <Form.Group widths='equal'>
              <Form.Field 
                control={FileButton}
                onSelect={this._fileSelected}
              />              
            </Form.Group>
            <Form.Group widths='equal'>
            <Form.Field
                control={Button} 
                color='orange'
                onClick={this._startUpload}
                disabled={!video} 
                style={{textAlign: 'center'}}>Upload
                </Form.Field>
            </Form.Group>
            </Form>
            </Grid>             
        </Grid.Column>
      </Grid>
    </Container>
    )
  }
}

export default Upload