import React, { Component } from 'react'
import Video from './video';


class Videos extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rVideos: [],
      remoteStreams: [],
      selectedVideo: null,
      videoVisible: false,
    }
  }


  state = {
    bigboxstyle: "",
    newbigboxdesire: "",
    bigboxdesire: "",
    publicVideoBoxstyle: "",
    publicVideoBoxdesire: "",
    newpublicVideoBoxdesire: "",
    btnname: "",
    publicvideodimension: "",
    publicvideodimensionnew: "",
    publicvideodimensioncurrent: "",
   


  };
  componentDidMount() {



    this.setState({
     
      bigboxstyle: this.newbigboxdesire,
      publicVideoBoxstyle: this.newpublicVideoBoxdesire,
      btnname: "Host View",
      publicvideodimension: this.publicvideodimensionnew



    });

  

  }
  publicvideodimensionnew = {
    backgroundColor: '#ffffff12',
    maxWidth: 220, maxHeight: 220,
    borderRadius: 5,
    float: 'left', margin: '0 3px'
  }

  publicvideodimensioncurrent = {
    backgroundColor: '#ffffff12',
    maxWidth: 120, maxHeight: 120,
    borderRadius: 5,
    float: 'left', margin: '0 3px'
  }


  publicVideoBoxdesire = {
    zIndex: 3,
    position: 'absolute',
    padding: '6px 3px',

    maxHeight: 120,
    top: '50px',
    zIndex: '5',
    left: 0,
    backgroundColor: '#034063',

    overflowX: 'scroll',
    whiteSpace: 'nowrap'


  }


  newpublicVideoBoxdesire = {
    display: 'flex',
    flexWrap: 'wrap',
    zIndex: 3,
    position: 'absolute',
    padding: '6px 3px',

    maxHeight: 222,
    top: '20%',
    zIndex: '5',
    left: '30%',

    maxWidth: '612px',
    width: '612px',
  }



  bigboxdesire = {
    zIndex: 1,
    position: 'fixed',
    right: '31%',
    top: '200px',
    minWidth: '250px',
    width: '37.5%',
    height: '55%',
    borderRadius: '1px',
    maxHeight:"55%"

  }

  newbigboxdesire = {

    display: 'none'
  };
  mynewlayout = () => this.setState(
    {
      bigboxstyle: this.bigboxdesire,
      publicVideoBoxstyle: this.publicVideoBoxdesire,
      btnname: "Room view",
      publicvideodimension:this.publicvideodimensioncurrent

    }
  )

  mynewlayoutremove = () => this.setState(
   
    {
      bigboxstyle: this.newbigboxdesire,
      publicVideoBoxstyle: this.newpublicVideoBoxdesire,
      btnname: "Host View",
      publicvideodimension: this.publicvideodimensionnew


    }
  )

  componentWillReceiveProps(nextProps) {


    

    if (this.props.remoteStreams !== nextProps.remoteStreams) {

      const NoOfRemoteStreams = nextProps.remoteStreams.length

      let selectedVideo = {}

      if (NoOfRemoteStreams === 1)
        selectedVideo = { selectedVideo: nextProps.remoteStreams[0] }
      else {
        selectedVideo = this.state.selectedVideo && nextProps.remoteStreams.filter(stream => stream.id === this.state.selectedVideo.id) || []

        selectedVideo = selectedVideo.length ? {} : { selectedVideo: nextProps.remoteStreams[NoOfRemoteStreams - 1] }
      }

      let _rVideos = nextProps.remoteStreams.map((rVideo, index) => {

        const _videoTrack = rVideo.stream.getTracks().filter(track => track.kind === 'video')
      

        let video = _videoTrack && (
          <Video
            videoMuted={this.videoMuted}
            videoType='remoteVideo'
            videoStream={rVideo.stream}
            frameStyle={this.state.publicvideodimension}
            videoStyles={this.state.publicvideodimension}
            
          />
        ) || <div></div>

        return (
          <div
        
            id={rVideo.name}
            onClick={() => this.switchVideo(rVideo)}
            style={{
              cursor: 'pointer', display: 'inline-block'
            }}
            key={index}
          >
            {video}
          </div>
        )
      })

      this.setState({
        remoteStreams: nextProps.remoteStreams,
        rVideos: _rVideos,
        ...selectedVideo,
      })
    }
  }

  videoMuted = (rVideo) => {
    const muteTrack = rVideo.getVideoTracks()[0]
    const isSelectedVideo = rVideo.id === this.state.selectedVideo.stream.id
    if (isSelectedVideo) {
      this.setState({
        videoVisible: !muteTrack.muted
      })
    }
  }

  switchVideo = (_video) => {
    const muteTrack = _video.stream.getVideoTracks()[0]
    this.setState({
      selectedVideo: _video,
      videoVisible: !muteTrack.muted
    })
  }



  render() {
    return (
      <div className="videoMainScreen">
        <Video
          videoType='previewVideo'
          frameStyle={this.state.bigboxstyle}

          videoStyles={{
            width: '100%', Height: 'auto', borderRadius: '0', backgroundColor: 'black',

            visibility: this.state.videoVisible && 'visible' || 'hidden',
          }}
          videoStream={this.state.selectedVideo && this.state.selectedVideo.stream}
        />

        <div
          style={this.state.publicVideoBoxstyle}
        >
          {this.state.rVideos}
        </div>

        {/* <button style={{ position: 'absolute', right: '0', top: '10%' }} onClick={() => { this.mynewlayoutremove() }} onDoubleClick={() => this.mynewlayout()}>{this.state.btnname}</button> */}

      </div>
    )
  }

}

export default Videos