import React from 'react';

const Poll = React.lazy(() => import('./views/Base/Poll'));
const NewPoll = React.lazy(() => import('./views/Base/NewPoll'));
const ViewAwnsered = React.lazy(() => import('./views/Base/ViewAwnsered'));
const Logout = React.lazy(() => import('./views/Pages/Logout/Logout'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/base/poll', exact: true, name: 'Poll', component: Poll },
  { path: '/base/newpoll', exact: true, name: 'New Poll', component: NewPoll },
  { path: '/base/viewawnsered', exact: true, name: 'View Awnsered', component: ViewAwnsered },
  { path: '/logout', exact: true, name: 'Logout', component: Logout },
];

export default routes;
