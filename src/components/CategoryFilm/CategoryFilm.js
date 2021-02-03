import { Component } from "react";

import ListFilm from "../ListFilm/ListFilm";

class CategoryFilm extends Component {
  render() {
    const { listCategory } = this.props;
    return listCategory.length ? listCategory.map((item) => (
      <ListFilm title={item.title} link={item.link} key={item.link}/>
    )) : null;
  }
}

export default CategoryFilm;
