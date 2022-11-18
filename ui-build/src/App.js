import {BrowserRouter,Routes,Route} from "react-router-dom";
import Layout from './components/layouts/Layout.js';
import PageNotFound from "./components/pages/404.js";
import Events from "./components/pages/Events.js";

import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Layout>
        <Routes>
          <Route path ='*' element ={ <PageNotFound/>}/>
          <Route path ='/Events' element ={<Events/>}/>
        </Routes>
    </Layout>
    </BrowserRouter>

  );
}

export default App;
