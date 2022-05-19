import { CircularProgress } from '@mui/material';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AdminPrivate = ({ children, ...rest }) => {
    const {user,admin,isLoading} = useAuth();
    if(isLoading && admin === false){
      return <CircularProgress color="success" />
    }
    return (
        <div>
            <Route
      {...rest}
      render={({ location }) =>
        user.email && admin  ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
        </div>
    );
};

export default AdminPrivate;