import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/Admin/Dashboard.jsx';
import Peliculas from './pages/Admin/Peliculas/Peliculas.jsx';
import Personas from './pages/Admin/Personas/Personas.jsx';
import FormularioPersona from './pages/Admin/Personas/FormularioPersona.jsx';
import FormularioFoto from "./pages/Admin/Personas/FormularioFoto.jsx";
import FormularioPelicula from "./pages/Admin/Peliculas/FormularioPelicula.jsx";
import PeliculasDetalle from "./pages/Admin/Peliculas/PeliculasDetalle.jsx";
import FormularioFotoPeli from "./pages/Admin/Peliculas/FormularioFotoPeli.jsx";
import FormularioReparto from "./pages/Admin/Peliculas/FormularioReparto.jsx";
import Cartelera from "./pages/User/Cartelera.jsx";
import CarteleraDetalle from "./pages/User/CarteleraDetalle.jsx";
import Perfil from "./pages/User/Perfil.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/peliculas",
    element: <Peliculas />,
  },
  {
    path: "/personas",
    element: <Personas />,
  },
  {
    path: "/personas/crear",
    element: <FormularioPersona />,
  },
  {
    path: "/personas/:id/editar",
    element: <FormularioPersona />,
  },
  {
    path: "/personas/:id/foto",
    element: <FormularioFoto/>
  },
  {
    path: "/peliculas/crear",
    element: <FormularioPelicula/>,
  },
  {
    path: "/peliculas/:id/detalle",
    element: <PeliculasDetalle/>,
  },
  {
    path: "/peliculas/:id/foto",
    element: <FormularioFotoPeli/>
  },
  {
    path: "/peliculas/:id/editar",
    element: <FormularioPelicula />,
  },
  {
    path: "/repartos/:id/create",
    element: <FormularioReparto />,
  },
  {
    path: "/cartelera",
    element: <Cartelera/>,
  },
  {
    path: "/carteleraDetalle/:id",
    element: <CarteleraDetalle/>,
  }
  ,
  {
    path: "/perfil/:id",
    element: <Perfil/>,
  }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
);
