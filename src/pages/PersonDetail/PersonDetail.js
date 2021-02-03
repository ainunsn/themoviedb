import { Component } from "react";
import { withRouter } from "react-router-dom";
import { Skeleton } from "antd";
import * as api from "../../api";
import ListFilm from "../../components/ListFilm/ListFilm";

import "./PersonDetail.css";


class PersonDetail extends Component {
  constructor() {
    super();
    this.state = {
      detail: null,
      known_for: JSON.parse(localStorage.getItem("known_for")),
    };
  }
  componentDidMount() {
    this.fetchingDetail();
  }
  fetchingDetail = () => {
    const url = `${api.person}/${this.props.match.params.id}?api_key=${api.APIKEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((results) => {
        const detail = results;
        detail["image"] = `${api.image}${results.profile_path}`;
        this.setState({ detail });
      })
      .catch((err) => this.setState({ detail: [] }));
  };

  render() {
    const { detail, known_for } = this.state;
    const knownfor = known_for.map((item) => ({
      ...item,
      image: `${api.image}${item.poster_path}`,
    }));


    return (
      <div className="row justify-content-center">
        <div className="col-10 mt-5">
          <div className="row mt-5">
            {detail !== null ? (
              <>
                <div className="col-4">
                  <img
                    src={detail.image}
                    alt="person"
                    className="w-75"
                    style={{ borderRadius: "10px" }}
                  />
                  <h3>Personal Info</h3>
                  <div>
                    <p className="detail-title">Known For</p>
                    <p className="detail-description">
                      {detail.known_for_department}
                    </p>
                  </div>

                  <div>
                    <p className="detail-title">Popularity</p>
                    <p className="detail-description">{detail.popularity}</p>
                  </div>

                  <div>
                    <p className="detail-title">Gender</p>
                    <p className="detail-description">
                      {detail.gender === 1 ? "Female" : "Male"}
                    </p>
                  </div>

                  <div>
                    <p className="detail-title">Birthday</p>
                    <p className="detail-description">
                      {detail.birthday !== null ? detail.birthday : "-"}
                    </p>
                  </div>

                  <div>
                    <p className="detail-title">Place of Birth</p>
                    <p className="detail-description">
                      {detail.place_of_birth !== null
                        ? detail.place_of_birth
                        : "-"}
                    </p>
                  </div>

                  <div>
                    <p className="detail-title">Also Known As</p>
                    <div className="detail-description">
                      {detail.also_known_as.length
                        ? detail.also_known_as.map((i, index) => (
                            <p style={{ lineHeight: "10px" }} key={index}>
                              {i}
                            </p>
                          ))
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className="col-8 border-left">
                  <h2>{detail.name}</h2>

                  <div>
                    <h3>Biography</h3>
                    <p>
                      {detail.biography !== null
                        ? detail.biography
                        : "Biography not found"}
                    </p>
                  </div>

                  <div className="known-for">
                    <ListFilm
                      contents={knownfor}
                      title={"Known For"}
                    />
                  </div>
                </div>
              </>
            ) : (
              <Skeleton active avatar></Skeleton>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PersonDetail);
