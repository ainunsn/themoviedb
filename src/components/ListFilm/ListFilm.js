import { Component } from "react";
import { withRouter } from "react-router-dom";
import * as api from "../../api";

import { Card, Skeleton } from "antd";
import { list } from "../../helper";
import "./ListFilm.css";
const { Meta } = Card;

class ListFilm extends Component {
  __isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      contents: [],
    };
  }

  componentDidMount() {
    this.__isMounted = true;

    if (this.props.contents === undefined || !this.props.contents.length) {
      this.fetchingContent();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.fetchingContent();
    }
  }

  componentWillUnmount() {
    this.__isMounted = false;
  }

  fetchingContent = () => {
    const url = `${api.menu}${this.props.location.pathname}/${this.props.link}/?api_key=${api.APIKEY}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        const contents = result.results.map((item) => ({
          ...item,
          image: `${api.image}${item.poster_path}`,
        }));

        if (this.__isMounted) this.setState({ contents });
      })
      .catch((err) => this.setState({ contents: [] }));
  };

  onClickEvent = (pathname, id) => {
    const url =
      this.props.contents !== undefined ? pathname : this.props.match.url;

    this.props.history.push(`${url}/${id}`);
  };

  render() {
    const contents =
      this.props.contents !== undefined
        ? this.props.contents
        : this.state.contents;
    const { title } = this.props;

    const skeletonList = list(20);
    return (
      <div className="mt-5">
        <h3>{title}</h3>

        <div className="scrollmenu">
          {contents.length
            ? contents.map((item) => (
                <div key={item.id} className="scrolablle_item">
                  <Card
                    onClick={
                      () => this.onClickEvent(item.media_type, item.id)
                    }
                    className="image-scrollable"
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={item.image} width="200" />}
                  >
                    <Meta title={item.original_title} />
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
    );
  }
}

export default withRouter(ListFilm);
