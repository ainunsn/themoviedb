import { Component } from "react";
import { withRouter } from "react-router-dom";
import { Card, Pagination } from "antd";
import * as api from "../../api";
import PersonCard from "../../components/PersonCard/PersonCard";
const { Meta } = Card;

class Person extends Component {
  constructor() {
    super();
    this.state = {
      person: [],
      page: 1,
    };
  }
  componentDidMount() {
    this.fetchingPopularPerson(this.state.page);
  }

  fetchingPopularPerson = (page) => {
    const url = `${api.person}/popular/?api_key=${api.APIKEY}&page=${page}`;
    fetch(url)
      .then((res) => res.json())
      .then((results) => {
        const person = results.results.map((item) => ({
          ...item,
          image: `${api.image}${item.profile_path}`,
        }));

        this.setState({ person });
      })
      .catch((err) => {
        this.setState({ person: []});
        
      });
  };

  onChangePage = (page) => {
    this.setState({ page }, () => {
      this.fetchingPopularPerson(page);
    });
  };

  profileDetail = (id, known_for) => {
    this.props.history.push(`/person/${id}`);
    localStorage.setItem('known_for', JSON.stringify(known_for))

  }
  render() {
    const { person, page } = this.state;
    return (
      <div className="row mt-5">
        <PersonCard personList={person} profileDetail={this.profileDetail}/>
        <div className="d-flex justify-content-center w-100 mb-5">
          <Pagination
            defaultCurrent={1}
            current={page}
            total={10000}
            onChange={this.onChangePage}
            pageSize={20}
            pageSizeOptions={[20]}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Person);
