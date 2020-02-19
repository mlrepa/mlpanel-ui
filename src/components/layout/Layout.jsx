import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useHistory, useLocation, withRouter } from 'react-router';
import { push } from 'connected-react-router';
import { connect, useDispatch } from 'react-redux';

import { setCurrentExperiment, setCurrentProject } from 'actions/global';
import { fetchProjectRequest, fetchProjectsRequest } from 'actions/projects';
import {
  fetchExperimentRequest,
  fetchExperimentsRequest
} from 'actions/experiments';
import {
  fetchDeploymentRequest,
  fetchDeploymentsRequest
} from 'actions/deployments';

import urlPaths from 'constants/urlPaths';
import routes from 'routes';
import CustomizedSelect from '../customized-select';

import useLayoutStyles from './useLayoutStyles';
import { fetchRunRequest, fetchRunsRequest } from '../../actions/runs';
import { fetchModelRequest, fetchModelsRequest } from '../../actions/models';

const Layout = ({
  children,
  push,
  match,
  currentSelectedProject,
  currentSelectedExperiment,
  projectsData,
  experimentsData,
  currentProject,
  currentExperiment,
  currentDeployment,
  currentRun,
  currentModel
}) => {
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();
  const classes = useLayoutStyles();
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (projectsData.length === 0 && location.pathname !== urlPaths.ROOT_PATH) {
      dispatch(fetchProjectsRequest());
    }
  }, [dispatch, match.path, projectsData.length]);

  useEffect(() => {
    const currentMenuRoute = routes.find(
      item => item.path === location.pathname
    );
    if (currentMenuRoute) {
      setSelectedIndex(currentMenuRoute.id);
    }
  }, [location.pathname]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRefreshData = () => {
    switch (location.pathname) {
      case urlPaths.ROOT_PATH:
        dispatch(fetchProjectsRequest());
        break;
      case `${urlPaths.ROOT_PATH}${currentProject.id}`:
        dispatch(fetchProjectRequest(currentProject.id));
        break;
      case urlPaths.EXPERIMENTS_PATH:
        dispatch(fetchExperimentsRequest(currentSelectedProject));
        break;
      case `${urlPaths.EXPERIMENTS_PATH}/${currentExperiment.id}`:
        dispatch(
          fetchExperimentRequest(currentExperiment.id, currentSelectedProject)
        );
        break;
      case urlPaths.DEPLOYMENTS_PATH:
        dispatch(fetchDeploymentsRequest());
        break;
      case `${urlPaths.DEPLOYMENTS_PATH}/${currentDeployment.id}`:
        dispatch(fetchDeploymentRequest(currentDeployment.id));
        break;
      case urlPaths.RUNS_PATH:
        dispatch(
          fetchRunsRequest(currentSelectedProject, currentSelectedExperiment)
        );
        break;
      case `${urlPaths.RUNS_PATH}/${currentRun.id}`:
        dispatch(
          fetchRunRequest(
            currentRun.id,
            currentSelectedProject,
            currentSelectedExperiment
          )
        );
        break;
      case urlPaths.MODELS_PATH:
        dispatch(fetchModelsRequest(currentSelectedProject));
        break;
      case `${urlPaths.MODELS_PATH}/${currentModel.id}`:
        dispatch(fetchModelRequest(currentModel.id, currentSelectedProject));
        break;
      default:
        break;
    }
  };

  const handleGoBack = () => history.goBack();

  const handleListItemClick = (event, index) => {
    push(routes.find(item => item.id === index).path);
  };

  const handleProjectChange = id => {
    if (!id) {
      dispatch(setCurrentProject(''));
      dispatch(setCurrentExperiment(''));
      push('/');
    } else {
      dispatch(setCurrentProject(id));
      dispatch(setCurrentExperiment(''));
      dispatch(fetchExperimentsRequest(id));
    }
  };

  const handleExperimentChange = id => {
    dispatch(setCurrentExperiment(id));
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleGoBack}
            className={classes.menuButton}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {routes.find(item => item.path === location.pathname) &&
              routes.find(item => item.path === location.pathname).title}
          </Typography>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            Current Project:
          </Typography>
          <Select
            displayEmpty
            value={currentSelectedProject}
            onChange={event => handleProjectChange(event.target.value)}
            input={<CustomizedSelect />}
          >
            <MenuItem value="">None</MenuItem>
            {projectsData.map(project => (
              <MenuItem
                disabled={project.status !== 'running'}
                key={project.id}
                value={project.id}
              >
                {project.name}
              </MenuItem>
            ))}
          </Select>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            Current Experiment:
          </Typography>
          <Select
            displayEmpty
            disabled={!currentSelectedProject}
            value={currentSelectedExperiment}
            onChange={event => handleExperimentChange(event.target.value)}
            input={<CustomizedSelect />}
          >
            <MenuItem value="">None</MenuItem>
            {experimentsData.map(project => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="refresh data"
            onClick={handleRefreshData}
          >
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            {routes
              .filter(item => item.menu)
              .map(item => (
                <ListItem
                  disabled={
                    item.disabled &&
                    (item.twoProps
                      ? item.disabled(
                          currentSelectedProject,
                          currentSelectedExperiment
                        )
                      : item.disabled(currentSelectedProject))
                  }
                  key={item.id}
                  onClick={event => handleListItemClick(event, item.id)}
                  selected={selectedIndex === item.id}
                  button
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              ))}
          </div>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

const mapStateToProps = state => ({
  currentSelectedProject: state.global.current.project,
  currentSelectedExperiment: state.global.current.experiment,
  projectsData: state.projects.projects,
  experimentsData: state.experiments.experiments,
  currentProject: state.projects.current,
  currentExperiment: state.experiments.current,
  currentDeployment: state.deployments.current,
  currentRun: state.runs.current,
  currentModel: state.models.current
});

export default withRouter(connect(mapStateToProps, { push })(Layout));
