import { h, Component } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for `routes` directory

import NotFound from '../routes/404';
import Landing from '../routes/landing';
import About from '../routes/about';
import Game from '../routes/game';
import Header from '../components/header.js';

class App extends Component {

  componentDidMount() {
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstall', e);
      this.setState({beforeInstallPrompt: e});
    });
  }

  handleRoute = (e) => {
    this.setState({
      currentURL: e.url,
      scriptID: e.current?.props?.scriptID,
    });
  }

  render(props, state) {
    return (
      <div id="app">
        <Header />
        <main>
          <Router onChange={this.handleRoute}>
            <Landing path="/" />
            <Game path="/play" install={state.beforeInstallPrompt} />
            <About path="/about" />
            <NotFound default />
          </Router>
        </main>
      </div>
    );
  }
}

export default App;
