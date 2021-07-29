import './App.css';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import {LyricsContextProvider} from './store/lyrics-context'
import Layout from './components/layout/Layout'
import Index from './pages/Index'
import Lyrics from './pages/Lyrics'

function App() {
  return (
    <>
    <LyricsContextProvider>
      <Router>
        <Layout> 
          <Switch>
              <Route exact path="/" component={Index}/>                  
              <Route path="/lyrics/:id" component={Lyrics} />
          </Switch>
        </Layout>
      </Router>
    </LyricsContextProvider>  
    </>
  );
}

export default App;
