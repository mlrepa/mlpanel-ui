import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { connect, useDispatch } from 'react-redux';
import {
  Backdrop,
  CircularProgress,
  Button,
  Paper,
  Select,
  MenuItem,
  TextField
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Formik } from 'formik';

import {
  createDeploymentRequest,
  deleteDeploymentRequest,
  fetchDeploymentRequest,
  runDeploymentRequest,
  stopDeploymentRequest
} from 'actions/deployments';

import CustomizedSelect from 'components/customized-select';

import useDeploymentStyles from './useDeploymentStyles';

const Deployment = ({
  match: {
    params: { deploymentId }
  },
  data: { project_id, model_id, version, type, status },
  data,
  isLoading,
  isError
}) => {
  const dispatch = useDispatch();
  const classes = useDeploymentStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDeploymentRequest(deploymentId));
  }, [dispatch, deploymentId]);

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

  return (
    <Paper className={classes.paper}>
      <Formik
        initialValues={{
          projectId: project_id,
          version: version,
          modelId: model_id,
          type: type
        }}
        onSubmit={values => {
          dispatch(
            createDeploymentRequest(
              values.projectId,
              values.modelId,
              values.version,
              values.type
            )
          );
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
                Deploy
              </Button>
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
                disabled={status === 'running'}
                onClick={() => dispatch(runDeploymentRequest(deploymentId))}
              >
                Run
              </Button>
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
                disabled={status === 'stopped'}
                onClick={() => dispatch(stopDeploymentRequest(deploymentId))}
              >
                Stop
              </Button>
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="secondary"
                onClick={() => dispatch(deleteDeploymentRequest(deploymentId))}
              >
                Delete
              </Button>
            </div>
            <div className={classes.formItem}>
              <Select
                name="type"
                displayEmpty
                value={props.values.type}
                onChange={props.handleChange}
                input={<CustomizedSelect />}
              >
                <MenuItem value="">Choose Type</MenuItem>
                <MenuItem value="local">Local</MenuItem>
                <MenuItem value="gcp">GCP</MenuItem>
              </Select>
            </div>
            <div>
              <TextField
                disabled
                label="Project Id"
                variant="outlined"
                value={project_id}
              />
            </div>
            <div>
              <TextField
                disabled
                label="Model Id"
                variant="outlined"
                value={model_id}
              />
            </div>
            <div>
              <TextField
                disabled
                label="Version"
                variant="outlined"
                value={version}
              />
            </div>
          </form>
        )}
      </Formik>
    </Paper>
  );
};

const mapStateToProps = state => ({
  isLoading: state.global.isLoading,
  isError: state.global.isError,
  data: state.deployments.current
});

export default withRouter(connect(mapStateToProps)(Deployment));
