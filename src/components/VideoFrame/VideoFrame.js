import { Component } from "react";
import { Button } from "antd";

import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";

import "./VideoFrame.css";

class VideoFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: 0,
    };
  }

  loadScript() {
    if (
      typeof window.YT == "undefined" ||
      typeof window.YT.Player == "undefined"
    ) {
      var tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }

  playYT = () => {
    this.loadScript();
    let player = new window.YT.Player("video", {
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange,
      },
    });
  };



  onPlayerReady(event) {
    const text = document.getElementById("movieInformation-text");
    var playButton = document.getElementById("play-button");
    playButton.addEventListener("click", function () {
      text.style.opacity = 0;
      event.target.playVideo();
    });

    var pauseButton = document.getElementById("pause-button");
    pauseButton.addEventListener("click", function () {
      text.style.opacity = 1;
      event.target.pauseVideo();
    });
  }
  render() {
    const { videoSource, movieInformation } = this.props;

    return (
      <div className="video-container w-100" id="player">
        {videoSource.length ? (
          <iframe
            id="video"
            className="video"
            width="420"
            height="315"
            src={`https://www.youtube.com/embed/${videoSource[0].key}?enablejsapi=1&controls=0&autoplay=1&modestbranding=1&showinfo=0&loop=1;origin=http://localhost:3000`}
          ></iframe>
        ) : null}
        <div className="opacity"></div>
        {movieInformation !== null ? (
          <div className="movieInformation">
            <div id="movieInformation-text">
              <p className="movieInformation-title">
                {movieInformation.original_title}
              </p>
              <p className="movieInformation-overview">
                {movieInformation.overview}
              </p>
            </div>
            {/* <div>
              <PlayCircleOutlined
                id="play-button"
                className="play-button mx-2"
                style={{ color: " #ff7314" }}
                onClick={this.playYT}
              />
              <PauseCircleOutlined
                id="pause-button"
                className="play-button mx-2 stop"
                style={{ color: " #ff7314" }}
                onClick={this.playYT}
              />
            </div> */}

            {!videoSource.length ? <p>Video isn't available</p> : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default VideoFrame;
