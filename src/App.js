import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import "./App.css";
import DetailMenu from "./pages/DetailMenu/DetailMenu";
import PersonDetail from "./pages/PersonDetail/PersonDetail";
import DetailFilm from "./pages/DetailFim/DetailFilm";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";

function App(props) {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
  }, []);

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = winScroll / height;
    setPosition(scrolled);
  };


  const redirectTo = props.location.pathname.split('/')[2];
  return (
    <div className="App">
      <Navbar position={position}/>
      <Switch>
        <Redirect from="/person/:media/:id" to={`/${redirectTo}/:id`}/>
        <Route exact path="/" component={Home} />
        <Route exact path="/:media" component={DetailMenu} />
        <Route exact path="/person/:id" component={PersonDetail} />
        <Route exact path="/:detail/:id" component={DetailFilm} />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
