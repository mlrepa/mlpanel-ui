import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { connect, useDispatch } from 'react-redux';
import {
  TextField,
  Backdrop,
  CircularProgress,
  Chip,
  Button,
  Paper,
  Typography,
  Tooltip,
  IconButton
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import Iframe from 'react-iframe';
import Alert from '@material-ui/lab/Alert';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { push } from 'connected-react-router';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import ArchiveIcon from '@material-ui/icons/Archive';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import {
  fetchProjectRequest,
  editProjectRequest,
  deleteProjectRequest,
  runProjectRequest,
  restoreProjectRequest,
  terminateProjectRequest,
  archiveProjectRequest
} from 'actions/projects';
import { setCurrentProject } from 'actions/global';
import { fetchExperimentsRequest } from 'actions/experiments';
import { projectsStatuses } from 'constants/enums';

import useProjectStyles from './useProjectStyles';

const Project = ({
  match: {
    params: { projectId }
  },
  data: { id, name, description, status, mlflowUri, createdBy, createdAt },
  data,
  isLoading,
  isError,
  experimentsData
}) => {
  const dispatch = useDispatch();
  const classes = useProjectStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjectRequest(projectId));
    if (status === 'running') {
      dispatch(fetchExperimentsRequest(projectId));
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    setOpen(isLoading);
  }, [isLoading]);

  if (isLoading) {
    return (
      <Backdrop timeout={0} className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (!isLoading && isError) {
    return (
      <Alert variant="filled" severity="error">
        This is an error alert — check it out!
      </Alert>
    );
  }

  if (!isLoading && Object.keys(data).length === 0) {
    return (
      <Alert variant="filled" severity="warning">
        No data!
      </Alert>
    );
  }

  const setProject = async (id, path) => {
    await dispatch(setCurrentProject(id));
    await dispatch(push(`/${path}`));
  };

  return (
    <Paper className={classes.paper}>
      <Formik
        initialValues={{ name: name, description: description }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required')
        })}
        onSubmit={values => {
          dispatch(editProjectRequest(projectId, values));
        }}
      >
        {props => (
          <form className={classes.root} onSubmit={props.handleSubmit}>
            <div className={classes.topBlock}>
              <div className={classes.innerBlock}>
                <Tooltip title="Save" arrow placement="top">
                  <IconButton
                    edge="end"
                    color="primary"
                    aria-label="save project"
                    type="submit"
                  >
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Start" arrow placement="top">
                  <IconButton
                    disabled={status === 'running' || status === 'archived'}
                    edge="end"
                    color="primary"
                    aria-label="start project"
                    onClick={() => dispatch(runProjectRequest(id))}
                  >
                    <PlayArrowIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Stop" arrow placement="top">
                  <IconButton
                    disabled={status === 'terminated' || status === 'archived'}
                    edge="end"
                    color="primary"
                    aria-label="stop project"
                    onClick={() => dispatch(terminateProjectRequest(id))}
                  >
                    <StopIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Archive" arrow placement="top">
                  <IconButton
                    disabled={status === 'archived'}
                    edge="end"
                    color="primary"
                    aria-label="archive project"
                    onClick={() => dispatch(archiveProjectRequest(id))}
                  >
                    <ArchiveIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Restore" arrow placement="top">
                  <IconButton
                    disabled={status !== 'archived'}
                    edge="end"
                    color="primary"
                    aria-label="restore project"
                    onClick={() => dispatch(restoreProjectRequest(id))}
                  >
                    <SettingsBackupRestoreIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" arrow placement="top">
                  <IconButton
                    edge="end"
                    color="primary"
                    aria-label="delete project"
                    onClick={() => dispatch(deleteProjectRequest(id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div className={classes.innerBlock}>
                <Button
                  className={classes.button}
                  disabled={status !== 'running'}
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => setProject(id, 'experiments')}
                >
                  Experiments
                </Button>
                <Button
                  className={classes.button}
                  disabled={status !== 'running'}
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => setProject(id, 'models')}
                >
                  Models
                </Button>
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => dispatch(push('/deployments'))}
                >
                  Deployments
                </Button>
              </div>
            </div>
            <div className={classes.chip}>
              <Typography variant="h6">STATUS: </Typography>
              <Chip
                label={status}
                color={
                  projectsStatuses.find(item => item.value === status).color
                }
              />
            </div>
            <div className={classes.item}>
              <Typography color="textSecondary">ID: {id}</Typography>
            </div>
            <div className={classes.item}>
              <Typography color="textSecondary">
                Experiments Amount:{' '}
                {status !== 'running' ? 'Run Project!' : experimentsData.length}
              </Typography>
            </div>
            <div className={classes.item}>
              <Typography color="textSecondary">
                Created By: {createdBy}
              </Typography>
            </div>
            <div className={classes.item}>
              <Typography color="textSecondary">
                Mlflow Tracking Server: <a href={mlflowUri}>{mlflowUri}</a>
              </Typography>
            </div>
            <div>
              <DatePicker
                label="Created At"
                value={createdAt}
                disabled
                animateYearScrolling
              />
            </div>
            <div>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                onChange={props.handleChange}
                value={props.values.name}
              />
            </div>
            <div>
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                multiline
                rows="4"
                onChange={props.handleChange}
                value={props.values.description}
              />
            </div>
            <Iframe
              url={mlflowUri}
              width="100%"
              height="900"
              display="initial"
              position="relative"
            />
          </form>
        )}
      </Formik>
    </Paper>
  );
};

const mapStateToProps = state => ({
  isLoading: state.global.isLoading,
  isError: state.global.isError,
  data: state.projects.current,
  experimentsData: state.experiments.experiments
});

export default withRouter(connect(mapStateToProps)(Project));
