import { Component } from "react";
import BG from "../../assets/bg.jpg";
import { withRouter } from "react-router-dom";
import * as api from "../../api";
import ListFilm from "../../components/ListFilm/ListFilm";
import PersonCard from "../../components/PersonCard/PersonCard";

import "./Home.css";
import VideoFrame from "../../components/VideoFrame/VideoFrame";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      tvList: [],
      topMovieId: "",
      latestMovie: [],
      trailer: null,
    };
  }

  componentDidMount() {
    this.fetchingMovie();
    this.fetchingTV();
  }

  fetchingLatestMovie = (id) => {
    const url = `${api.menu}/movie/${id}/videos?api_key=${api.APIKEY}`;
    fetch(url)
      .then((res) => res.json())
      .then((results) => {
        const site = results.results.filter((i) => i.site === "YouTube");
        this.setState({ latestMovie: site });
      })
      .catch((err) => {
        this.setState({ latestMovie: [] });
      });
  };

  fetchingTV = () => {
    const url = `${api.menu}/trending/tv/week?api_key=${api.APIKEY}`;
    fetch(url)
      .then((res) => res.json())
      .then((results) => {
        const tvList = results.results.map((i) => ({
          ...i,
          image: `${api.image}${i.poster_path}`,
        }));

        this.setState({ tvList });
      })
      .catch((err) => this.setState({ tvList: [] }));
  };

  fetchingMovie = () => {
    const url = `${api.menu}/trending/movie/week?api_key=${api.APIKEY}`;
    fetch(url)
      .then((res) => res.json())
      .then((results) => {
        const movieList = results.results.map((i) => ({
          ...i,
          image: `${api.image}${i.poster_path}`,
        }));

        this.fetchingLatestMovie(movieList[0].id);

        this.setState({ movieList, trailer: movieList[0] });
      })
      .catch((err) => this.setState({ movieList: [] }));
  };

  profileDetail = (id, known_for) => {
    this.props.history.push(`/person/${id}`);
    localStorage.setItem("known_for", JSON.stringify(known_for));
  };
  render() {
    const { movieList, tvList, person, latestMovie, trailer } = this.state;
    return (
      <div>
        <VideoFrame videoSource={latestMovie} movieInformation={trailer}/>
        <div className="row justify-content-center mt-5">
          <div className="col-12">
            <div className="trending-movie mx-5">
              {movieList.length ? (
                <ListFilm title="Movie of the Week" contents={movieList} />
              ) : null}
            </div>

            <div className="trending-tv mx-5">
              {tvList.length ? (
                <ListFilm title="TV Shows of the Week" contents={tvList} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
