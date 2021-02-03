import { Component } from "react";
import { withRouter } from "react-router-dom";
import { Comment, List, Card, Skeleton } from "antd";
import * as api from "../../api";
import VideoFrame from "../../components/VideoFrame/VideoFrame";
import { list } from "../../helper";

const { Meta } = Card;

class DetailFilm extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      details: null,
      video: [],
      recommendation: [],
      id: this.props.match.params.id,
      reviews: [],
    };
  }
  componentDidMount() {
    this._isMounted = true;
    window.scrollTo(0, 0);
    this.fetchingDetailContent();
    this.fetchingVideo();
    this.fetchingRecommendation();
    this.fetchingReview();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.id !== this.state.id && this._isMounted) {
      this.fetchingDetailContent();
      this.fetchingVideo();
      this.fetchingRecommendation();
      this.fetchingReview();

      this._isMounted = false;
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchingDetailContent = () => {
    const url = `${api.menu}/${this.props.match.params.detail}/${this.props.match.params.id}?api_key=${api.APIKEY}`;
    fetch(url)
      .then((res) => res.json())
      .then((results) => {
        this.setState({ details: results });
      })
      .catch((err) => {
        this.setState({ details: null });
      });
  };

  fetchingVideo = () => {
    const url = `${api.menu}/${this.props.match.params.detail}/${this.props.match.params.id}/videos?api_key=${api.APIKEY}`;
    fetch(url)
      .then((res) => res.json())
      .then((results) => {
        const site = results.results.filter((i) => i.site === "YouTube");
        this.setState({ video: site });
      })
      .catch((err) => {
        this.setState({ video: [] });
      });
  };

  fetchingRecommendation = () => {
    const url = `${api.menu}/${this.props.match.params.detail}/${this.props.match.params.id}/recommendations?api_key=${api.APIKEY}&page=1`;

    fetch(url)
      .then((res) => res.json())
      .then((results) => {
        const recommendation = results.results.map((i) => ({
          ...i,
          image: `${api.image}${i.poster_path}`,
        }));
        this.setState({ recommendation });
      })
      .catch((err) => {
        this.setState({ recommendation: [] });
      });
  };

  fetchingReview = () => {
    const url = `${api.menu}/${this.props.match.params.detail}/${this.props.match.params.id}/reviews?api_key=${api.APIKEY}&page=1`;
    fetch(url)
      .then((res) => res.json())
      .then((results) => {
        this.setState({ reviews: results.results });
      })
      .catch((err) => {
        this.setState({ reviews: [] });
      });
  };

  setIsMounted = () => {
    this._isMounted = true;
    window.scrollTo(0, 0);
  };

  tvDetails() {
    const { details } = this.state;

    return (
      <>
        {details !== null ? (
          <>
            <div className="title">
              <h4>Title</h4>
              <p>{details.original_name}</p>
            </div>
            <div className="overview">
              <h4>Overview</h4>
              <p>{details.overview}</p>
            </div>
            <div className="genre">
              <h4>Genre</h4>
              <ul>
                {details.genres.map((gen) => (
                  <li key={gen.id}>{gen.name}</li>
                ))}
              </ul>
            </div>
            <div className="seasons">
              <h4>Seasons</h4>
              <ul>
                {details.seasons.map((sea) => (
                  <li key={sea.name}>{sea.name}: {sea.episode_count} episodes</li>
                ))}
              </ul>
            </div>
            <div className="spoken-language">
              <h4>Spoken language</h4>
              <ul>
                {details.spoken_languages.map((lang) => (
                  <li key={lang.name}>{lang.name}</li>
                ))}
              </ul>
            </div>
            <div className="production-countries">
              <h4>Production Country</h4>
              <ul>
                {details.production_countries.map((coun) => (
                  <li key={coun.name}>{coun.name} </li>
                ))}
              </ul>
            </div>
            <div className="production-company">
              <h4>Production Companies</h4>
              <ul>
                {details.production_companies.map((comp) => (
                  <li key={comp.name}>{comp.name} </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p>There's no information</p>
        )}
      </>
    );
  }

  movieDetails() {
    const { details } = this.state;

    return (
      <>
        {details !== null ? (
          <>
            <div className="title">
              <h4>Title</h4>
              <p>{details.title}</p>
            </div>
            <div className="overview">
              <h4>Overview</h4>
              <p>{details.overview}</p>
            </div>
            <div className="genre">
              <h4>Genre</h4>
              <ul>
                {details.genres.map((gen) => (
                  <li key={gen.name}>{gen.name}</li>
                ))}
              </ul>
            </div>
            <div className="production-countries">
              <h4>Production Country</h4>
              <ul>
                {details.production_countries.map((coun) => (
                  <li key={coun.name}>{coun.name} </li>
                ))}
              </ul>
            </div>
            <div className="production-company">
              <h4>Production Companies</h4>
              <ul>
                {details.production_companies.map((comp) => (
                  <li key={comp.name}>{comp.name} </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p>There's no information</p>
        )}
      </>
    );
  }

  render() {
    const { video, details, recommendation, reviews } = this.state;
    const skeletonList = list(20);

    return (
      <div>
        <VideoFrame movieInformation={details} videoSource={video} />

        <div className="mt-5">
          {recommendation.length ? (
            <div onClick={this.setIsMounted}>
              <h2 className="mx-5">Recommendation</h2>
              <div className="scrollmenu">
                {recommendation.length
                  ? recommendation.map((item) => (
                      <div key={item.id} className="scrolablle_item">
                        <Card
                          onClick={() => this.props.history.push(`${item.id}`)}
                          className="image-scrollable"
                          hoverable
                          style={{ width: 240 }}
                          cover={
                            <img alt="example" src={item.image} width="200" />
                          }
                        >
                          <Meta title={item.original_title || item.original_name} />
                        </Card>
                      </div>
                    ))
                  : skeletonList.map((i) => (
                      <div key={i} className="scrolablle_item">
                        <Skeleton active avatar></Skeleton>
                      </div>
                    ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="row justify-content-center">
          <div className="col-12 mt-5">
            <div className="row">
              <div className="col-6">
                <h3 className="mx-5">Comments</h3>
                {reviews.length ? (
                  <List
                    className="comment-list mx-5"
                    header={`${reviews.length} replies`}
                    itemLayout="horizontal"
                    dataSource={reviews}
                    renderItem={(item, id) => (
                      <li key={id}>
                        <Comment
                          author={item.author}
                          avatar={`https://secure.gravatar.com/avatar${item.author_details.avatar_path}`}
                          content={item.content.substring(0, 500)}
                          datetime={item.created_at.substring(0, 10)}
                        />
                      </li>
                    )}
                  />
                ) : (
                  <p className="mx-5">No comment</p>
                )}
              </div>
              <div className="col-6">
                <h3>Details</h3>
                {this.props.match.params.detail === "movie"
                  ? this.movieDetails()
                  : this.tvDetails()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DetailFilm);
