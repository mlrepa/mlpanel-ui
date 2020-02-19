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
  Typography
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import Iframe from 'react-iframe';
import Alert from '@material-ui/lab/Alert';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { push } from 'connected-react-router';

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
import { projectsStatuses } from 'constants/enums';

import useProjectStyles from './useProjectStyles';

const Project = ({
  match: {
    params: { projectId }
  },
  data: { id, name, description, status, mlflowUri, createdBy, createdAt },
  data,
  isLoading,
  isError
}) => {
  const dispatch = useDispatch();
  const classes = useProjectStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjectRequest(projectId));
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
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={() => dispatch(deleteProjectRequest(projectId))}
              >
                Delete
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                disabled={status === 'running' || status === 'archived'}
                onClick={() => dispatch(runProjectRequest(projectId))}
              >
                Run
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                disabled={status === 'terminated' || status === 'archived'}
                onClick={() => dispatch(terminateProjectRequest(projectId))}
              >
                Terminate
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                disabled={status === 'running' || status === 'terminated'}
                onClick={() => dispatch(restoreProjectRequest(projectId))}
              >
                Restore
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="default"
                disabled={status === 'archived'}
                onClick={() => dispatch(archiveProjectRequest(projectId))}
              >
                Archive
              </Button>
            </div>
            <div className={classes.topBlock}>
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
                Created By: {createdBy}
              </Typography>
            </div>
            <div className={classes.item}>
              <Typography color="textSecondary">
                Mlflow Tracking Server: {mlflowUri}
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
  data: state.projects.current
});

export default withRouter(connect(mapStateToProps)(Project));
