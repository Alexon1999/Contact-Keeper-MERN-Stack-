import React, { useContext } from 'react';

import { Route, Redirect } from 'react-router-dom';

import AuthContext from '../../context/auth/AuthContext';

// Private Route component
{
  /* <PrivateRoute component={} /> */
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, loading } = authContext;

  // console.log(rest);{exact: true, path: "/", location: {…}, computedMatch: {…}}

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          // + ( props ) : ce sont les props de react dom (history , location , match)
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
