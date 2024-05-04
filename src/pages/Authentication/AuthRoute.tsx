import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import PageTitle from '../../components/PageTitle';
import SignUp from './SignUp';

const AuthRoute = () => {
  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Login | Rayvers" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Login | Rayvers" />
              <SignIn />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default AuthRoute;
