import { ReactElement } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routes from './utils/routes';
import ChatPage from './Components/ChatPage/ChatPage';
import LoginPage from './Components/LoginPage/LoginPage';
import { getLocalStorageUserData } from './utils/useLocalStorage';
import { useAppDispatch } from './hooks/hooks';
import { setAuth } from './store/userSlice';

const PrivateRoute = ({ children }: { children: React.ReactNode }): ReactElement | null => {
  const dispatch = useAppDispatch();
  const userData = getLocalStorageUserData();
  if (!userData) {
    return <Navigate to={routes.loginPagePath()} />;
  }
  dispatch(setAuth(userData));
  return children as ReactElement;
};

const App = () => (
  <>
    <Routes>
      <Route
        path={routes.defaultPath()}
        element={(
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        )}
      />
      <Route path={routes.loginPagePath()} element={<LoginPage />} />
      <Route path="*" element={<Navigate to={routes.defaultPath()} />} />
    </Routes>
    <ToastContainer />
  </>
);

export default App;
