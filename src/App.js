import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/Header';
import Banner from './components/banner/Banner';
import Footer from './components/footer/Footer'
import { Container } from 'react-bootstrap';
import Services from './components/services/Services';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Login from './components/login/Login';
import ContextProvider from './components/context/ContextProvider';
import Doctors from './components/doctors/Doctors';
import Details from './components/details/Details';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import NotFound from './components/notFound/NotFound';
import HealthTips from './components/healthtips/HealthTips';
function App() {
  return (
    <div>
      
      <Container>
      <ContextProvider>
        <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route exact path='/'>
          <Banner></Banner>
          <Services></Services>
          <Footer></Footer>
          </Route>
          <PrivateRoute path='/doctors'>
            <Doctors></Doctors>
          </PrivateRoute>
          <PrivateRoute path='/details/:serviceId'>
            <Details></Details>
          </PrivateRoute>
          <Route path='/home'>
          <Banner></Banner>
          <Services></Services>
          <Footer></Footer>
          </Route>
          <PrivateRoute path='/healthtips'>
            <HealthTips></HealthTips>
          </PrivateRoute>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>
        </BrowserRouter>
        </ContextProvider>
      </Container>
     
    </div>
  );
}

export default App;
