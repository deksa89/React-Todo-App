import Input from './components/Input.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useToken from './useToken';
import Login from './components/Login.js';

import './App.css';


const App = () => {

  const {token, setToken} = useToken()
  console.log("token: ", token)


  // AKO JE TOKEN falsy (undefined, null, false, 0, an empty string, or NaN) TO ZNACI DA KORISNIK NIJE AUTENTIFICIRAN
  // U TOM SLUCAJU KOD VRACA <Login> KOMPONENTU I PROSLIJEDUJE setToken FUNKCIJU KAO PROPS
  // CIJELI SMISAO PROSLIJEDIVANJA setToken-a JE DA OMOGUCI UPDATE-anje token VARIJABLE KADA SE KORISNIK USPJESNO AUTENTIFICIRA
  // KADA JE LOGIN PROCES GOTOV Login KOMPONENTA ZOVE setToken I PROSLIJEDUJE DOBIVENI TOKEN TE NJOME UPDATE-a TOKEN STATE VARIJABLU
  if(!token) {
    return <Login setToken={setToken} />
  }


  return (
    <div className="App">
      <h1>To-Do App</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Input />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
