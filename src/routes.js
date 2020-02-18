import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DnsIcon from '@material-ui/icons/Dns';
import EjectIcon from '@material-ui/icons/Eject';

import urlPaths from 'constants/urlPaths';

// Pages
import Projects from 'pages/projects';
import Experiments from 'pages/experiments';
import Runs from 'pages/runs';
import Models from 'pages/models';
import Deployments from 'pages/deployments';
import Project from 'pages/projects/Project';
import ProjectCreate from 'pages/projects/ProjectCreate';
import ExperimentCreate from 'pages/experiments/ExperimentCreate';
import Experiment from 'pages/experiments/Experiment';
import Run from 'pages/runs/Run';
import Model from 'pages/models/Model';
import Deployment from 'pages/deployments/Deployment';

const routes = [
  {
    id: 0,
    exact: true,
    path: urlPaths.ROOT_PATH,
    component: Projects,
    title: 'Projects',
    icon: <DashboardIcon />,
    menu: true
  },
  {
    id: 1,
    exact: true,
    path: urlPaths.EXPERIMENTS_PATH,
    component: Experiments,
    title: 'Experiments',
    icon: <AssessmentIcon />,
    menu: true,
    disabled: data => !data
  },
  {
    id: 2,
    exact: true,
    path: urlPaths.RUNS_PATH,
    component: Runs,
    title: 'Runs',
    icon: <DoneAllIcon />,
    menu: true,
    disabled: (firstProp, secondProp) => !firstProp || !secondProp,
    twoProps: true
  },
  {
    id: 3,
    exact: true,
    path: urlPaths.MODELS_PATH,
    component: Models,
    title: 'Models',
    icon: <DnsIcon />,
    menu: true,
    disabled: data => !data
  },
  {
    id: 4,
    exact: true,
    path: urlPaths.DEPLOYMENTS_PATH,
    component: Deployments,
    title: 'Deployments',
    icon: <EjectIcon />,
    menu: true
  },
  {
    id: 5,
    exact: true,
    path: urlPaths.PROJECT_PATH,
    component: Project,
    menu: false
  },
  {
    id: 6,
    exact: true,
    path: urlPaths.PROJECT_CREATE_PATH,
    component: ProjectCreate,
    menu: false
  },
  {
    id: 7,
    exact: true,
    path: urlPaths.EXPERIMENT_CREATE_PATH,
    component: ExperimentCreate,
    menu: false
  },
  {
    id: 8,
    exact: true,
    path: urlPaths.EXPERIMENT_PATH,
    component: Experiment,
    menu: false
  },
  {
    id: 9,
    exact: true,
    path: urlPaths.RUN_PATH,
    component: Run,
    menu: false
  },
  {
    id: 10,
    exact: true,
    path: urlPaths.MODEL_PATH,
    component: Model,
    menu: false
  },
  {
    id: 11,
    exact: true,
    path: urlPaths.DEPLOYMENT_PATH,
    component: Deployment,
    menu: false
  }
];

export default routes;
