import { Component } from "react";
import { withRouter } from "react-router-dom";

import { Card } from "antd";

import * as api from "../../api";

import "./DetailMenu.css";
import ListFilm from "../../components/ListFilm/ListFilm";
import CategoryFilm from "../../components/CategoryFilm/CategoryFilm";
import Person from "../Person/Person";

const { Meta } = Card;

function category(path) {
  return path.substring(1, path.length);
}

class DetailMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie_category: [
        {
          title: "Popular",
          link: "popular",
        },
        {
          title: "Now Playing",
          link: "now_playing",
        },
        {
          title: "Top Rated",
          link: "top_rated",
        },
        {
          title: "Upcoming",
          link: "upcoming",
        },
      ],
      tv_category: [
        {
          title: "Popular",
          link: "popular",
        },
        {
          title: "Airing Today",
          link: "airing_today",
        },
        {
          title: "On Airing",
          link: "on_the_air",
        },
        {
          title: "Top Rated",
          link: "top_rated",
        },
      ]
    };
  }

  renderPage() {
    const { url } = this.props.match;

    if (url === "/movie") {
      return <CategoryFilm listCategory={this.state.movie_category}/>;
    } else if (url === "/tv") {
      return <CategoryFilm listCategory={this.state.tv_category}/>;
    } else if (url === '/person') {
      return <Person />

    }
  }
  render() {
    const { url } = this.props.match;
    return (
      <div className="row justify-content-center">
        <div className="col-10">
          <p>{url}</p>
          {this.renderPage()}
        </div>
      </div>
    );
  }
}

export default withRouter(DetailMenu);
