import { h, Component } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for `routes` directory

import NotFound from '../routes/404';

class App extends Component {

  handleRoute = (e) => {
    this.setState({
      currentURL: e.url,
      scriptID: e.current?.props?.scriptID,
    });
  }

  render() {
    return (
      <div id="app">
        <header>Header</header>
        <main>
          <Router onChange={this.handleRoute}>
            <NotFound default />
          </Router>
        </main>
      </div>
    );
  }
}

export default App;
