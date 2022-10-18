import React, { Component } from 'react';

class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mic: true,
      camera: true,
      // currentStream: new MediaStream(),
      // videoTrack: false,
      videoVisible: true,
    }
  }

  componentDidMount() {
    console.log("rj",this.props.micmute)
    if (this.props.videoStream) {
      this.video.srcObject = this.props.videoStream
    }
    if(this.props.micmute)
    {
      console.log("mivvnvjnvjnv")
      this.mutemic()
    }
  }

  componentWillReceiveProps(nextProps) {
console.log("@nn knvnkv",nextProps.micmute)
if(nextProps.micmute==true)
{
  this.mutemic()
}
    // console.log('1. nextProps', this.props.showMuteControls, nextProps.videoStream && nextProps.videoStream.getTracks())
    console.log('1', this.props.videoType, nextProps.videoStream)

    // This is done only once
    if (nextProps.videoStream && nextProps.videoStream !== this.props.videoStream) {
    // if (!this.props.videoStream) {
      console.log('2', this.props.videoType, nextProps.videoStream)
      this.video.srcObject = nextProps.videoStream
    }

    // This is done only once when we receive a video track
    const videoTrack = nextProps.videoStream && nextProps.videoStream.getVideoTracks()
    if (this.props.videoType === 'remoteVideo' && videoTrack && videoTrack.length) {

      videoTrack[0].onmute = () => {
        // alert('muted')
        this.setState({
          videoVisible: false,
        })
        this.props.videoMuted(nextProps.videoStream)
      }

      videoTrack[0].onunmute = () => {
        this.setState({
          videoVisible: true,
        })
        this.props.videoMuted(nextProps.videoStream)
      }
    }


    const audioTrack = nextProps.videoStream && nextProps.videoStream.getAudioTracks()
    if (this.props.videoType === 'remoteVideo' && audioTrack && audioTrack.length) {
      audioTrack[0].onmute = () => {
        alert('muted')
        // this.setState({
        //   videoVisible: false,
        // })
        // this.props.videoMuted(nextProps.videoStream)
      }
    }

  }

  mutemic = (e) => {
    const stream = this.video.srcObject.getTracks().filter(track => track.kind === 'audio')
    this.setState(prevState => {
      if (stream) stream[0].enabled = !prevState.mic
      return {mic: !prevState.mic}
    })
  }

  mutecamera = (e) => {
    const stream = this.video.srcObject.getTracks().filter(track => track.kind === 'video')
    this.setState(prevState => {
      if (stream) stream[0].enabled = !prevState.camera
      return {camera: !prevState.camera}
    })
  }

  render() {
    const muteControls = this.props.showMuteControls && (
      <div>
     <i onClick={this.mutemic} style={{backgroundColor:"white",borderRadius:'30px', position: 'absolute',right: '27%',top: '627px',zIndex:'3', cursor: 'pointer', padding: 5, fontSize: '14px', color: this.state.mic && 'blue' || 'red' }} class='material-icons'>{this.state.mic && 'mic' || 'mic_off'}</i>
      <i onClick={this.mutecamera} style={{backgroundColor:"white",borderRadius:'30px',position: 'absolute',right: '23%',top: '627px',zIndex:'3', cursor: 'pointer', padding: 5, fontSize:  '16px', color: this.state.camera && 'blue' || 'red' }} class='material-icons'>{this.state.camera && 'videocam' || 'videocam_off'}</i>
      
    </div>
    )

    return (
      <div
        style={{ ...this.props.frameStyle,  }}
      >
        {/* <audio id={this.props.id} muted={this.props.muted} ref={ (ref) => {this.video = ref }}></audio> */}
        <video
          id={this.props.id}
         
          muted={this.props.muted}
          autoPlay
          style={{
            visibility: this.state.videoVisible && 'visible' || 'hidden',
            ...this.props.videoStyles,
          }}
          // ref={ this.props.videoRef }
          ref={ (ref) => {this.video = ref }}
        ></video>
        {muteControls}
      </div>
    )
  }
}

export default Video