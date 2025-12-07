
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './firebase-auth-context';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Events from './pages/Events';
import EventsCreate from './pages/EventsCreate';
import EventDetail from './pages/EventDetail';
import EventPlayers from './pages/EventPlayers';
import EventPlayersCreate from './pages/EventPlayersCreate';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/events',
    element: (
      <ProtectedRoute>
        <Events />
      </ProtectedRoute>
    ),
  },
  {
    path: '/events/:id',
    element: (
      <ProtectedRoute>
        <EventDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: '/events/:id/players',
    element: (
      <ProtectedRoute>
        <EventPlayers />
      </ProtectedRoute>
    ),
  },
  {
    path: '/events/:id/players/create',
    element: (
      <ProtectedRoute>
        <EventPlayersCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: '/events/create',
    element: (
      <ProtectedRoute>
        <EventsCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
