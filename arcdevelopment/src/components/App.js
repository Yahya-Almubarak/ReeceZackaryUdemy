import React, { StrictMode, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './ui/Theme'

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import LandingPage from "../components/LandingPage";

function App() {
  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
      <Header value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
      <Switch>
        <Route exact path="/" render={() => (<LandingPage value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>)}/>
        <Route exact path="/services" component={() => <div>Services</div>}></Route>
        <Route exact path="/customsoftware" component={() => <div>Custom Software</div>} ></Route>
        <Route exact path="/mobileapp" component={() => <div>Mobile app</div>}></Route>
        <Route exact path="/websites" component={() => <div>Web sites</div>}></Route>
        <Route exact path="/revolution" component={() => <div>Revolution</div>}></Route>
        <Route exact path="/about" component={() => <div>About us</div>}></Route>
        <Route exact path="/contact" component={() => <div>Contact us</div>}></Route>
        <Route exact path="/estimate" component={() => <div>Estimate</div>}></Route>
      </Switch>
      <Footer setValue={setValue} setSelectedIndex={setSelectedIndex}/>
      </Router>
     </ThemeProvider>
     </StrictMode>
  );
}

export default App;
