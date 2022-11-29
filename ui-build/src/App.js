import {BrowserRouter,Routes,Route} from "react-router-dom";
import Layout from './components/layouts/Layout.js';
import PageNotFound from "./components/pages/404.js";
import Events from "./components/pages/Events.js";
import './components/pages/css/App.scss';
//import './App.css';

export default function App() {
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


