import './App.css';
import Container from '@material-ui/core/Container';
import BikeComponent from './component/BikeComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login, RefreshToken } from './provider';
import { useEffect, useState } from 'react';

function App() {

  const [login, setLogin] = useState(0);
  Login().then(() => setLogin(1)).catch(-1);

  useEffect(() => {
    var date = new Date();

    setTimeout(function () {
      setInterval(() => {
        console.log('test');
        RefreshToken();
      }, 120000);
    }, (120 - date.getSeconds()) * 1000);
  }, []);

  if (login === 1)
    return (
      <Container style={{ marginTop: 10 }}>
        <BikeComponent />
        <ToastContainer />
      </Container>
    )
  if (login === 0)
    return (
      <b>Login oluyor...</b>
    )
  if (login === -1)
    return (
      <b>Login esnasında bir hata oluştu...</b>
    )
}

export default App;
