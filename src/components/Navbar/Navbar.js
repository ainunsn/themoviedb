import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import "./Navbar.css";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.location.pathname,
    };
  }

  handleClick = (e) => {
    this.setState({ current: e.key });
  };

  navigation() {
    return (
      <nav className='transparent-navbar'>
        <Link to="/">themoviedb clone</Link>
        <Link to="/">Home</Link>
        <Link to="/movie">Movies</Link>
        <Link to="/tv">TV Shows</Link>
        <Link to="/person">People</Link>
      </nav>
    );
  }

  render() {
    const { current } = this.state;
    const { position } = this.props;

    if (position > 0 || this.props.location.pathname !== "/") {
      return (

      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{
          backgroundColor: "#ff7314",
          position: "fixed",
          width: "100%",
          zIndex: "100",
        }}
      >
        <Menu.Item key="" className="navigation">
          <Link to="/">themoviedb clone</Link>
        </Menu.Item>
        <Menu.Item key="/home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/movie">
          <Link to="/movie">Movies</Link>
        </Menu.Item>
        <Menu.Item key="/tv">
          <Link to="/tv">TV Shows</Link>
        </Menu.Item>
        <Menu.Item key="/person">
          <Link to="/person">People</Link>
        </Menu.Item>
      </Menu>
      )
    } else {
      return  this.navigation()
    }
  }
}

export default withRouter(Navbar);
