import React from 'react';

const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Poll = React.lazy(() => import('./views/Base/Poll'));
const NewPoll = React.lazy(() => import('./views/Base/NewPoll'));
const ViewAwnsered = React.lazy(() => import('./views/Base/ViewAwnsered'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/base/poll', exact: true, name: 'Poll', component: Poll },
  { path: '/base/newpoll', exact: true, name: 'New Poll', component: NewPoll },
  { path: '/base/viewawnsered', exact: true, name: 'View Awnsered', component: ViewAwnsered },
];

export default routes;
