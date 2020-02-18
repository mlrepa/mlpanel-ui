import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { connect, useDispatch } from 'react-redux';
import {
  TextField,
  Backdrop,
  CircularProgress,
  Button,
  Paper,
  Select,
  MenuItem,
  Modal
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import Alert from '@material-ui/lab/Alert';
import { push } from 'connected-react-router';
import { Formik } from 'formik';

import { fetchModelRequest, deleteModelRequest } from 'actions/models';
import { createDeploymentRequest } from 'actions/deployments';
import { fetchModelVersionsRequest } from 'actions/modelVersions';

import CustomizedSelect from 'components/customized-select';

import useModelStyles from './useModelStyles';

const Model = ({
  match: {
    params: { modelId }
  },
  data: { id, creation_timestamp, last_updated_timestamp },
  data,
  isLoading,
  isError,
  currentSelectedProject,
  push,
  modelVersionsData
}) => {
  const dispatch = useDispatch();
  const classes = useModelStyles();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  if (!currentSelectedProject) {
    push('/');
  }

  useEffect(() => {
    dispatch(fetchModelRequest(modelId, currentSelectedProject));
    dispatch(fetchModelVersionsRequest(currentSelectedProject, modelId));
  }, [dispatch, modelId, currentSelectedProject]);

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
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalOpen}
        onClose={handleClose}
      >
        <Paper className={classes.modalPaper}>
          <Formik
            initialValues={{
              projectId: currentSelectedProject,
              version: '',
              modelId: modelId,
              type: ''
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
              handleClose();
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
                <div className={classes.formItem}>
                  <Select
                    name="version"
                    displayEmpty
                    value={props.values.version}
                    onChange={props.handleChange}
                    input={<CustomizedSelect />}
                  >
                    <MenuItem value="">Choose Version</MenuItem>
                    {modelVersionsData.map(item => (
                      <MenuItem key={item.id} value={item.version}>
                        {item.version}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </form>
            )}
          </Formik>
        </Paper>
      </Modal>
      <form className={classes.root}>
        <div className={classes.topBlock}>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={() =>
              dispatch(deleteModelRequest(modelId, currentSelectedProject))
            }
          >
            Delete
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
          >
            Deploy
          </Button>
        </div>
        <div>
          <TextField disabled label="Name" variant="outlined" value={id} />
        </div>
        <div>
          {creation_timestamp ? (
            <DatePicker
              format="dd/MM/yyyy"
              label="Created At"
              disabled
              animateYearScrolling
              value={new Date(Number(creation_timestamp))}
            />
          ) : (
            <TextField
              label="Created At"
              variant="outlined"
              disabled
              value={creation_timestamp}
            />
          )}
        </div>
        <div>
          {last_updated_timestamp ? (
            <DatePicker
              format="dd/MM/yyyy"
              label="Updated At"
              value={new Date(Number(last_updated_timestamp))}
              disabled
              animateYearScrolling
            />
          ) : (
            <TextField
              label="Updated At"
              variant="outlined"
              disabled
              value={last_updated_timestamp}
            />
          )}
        </div>
      </form>
    </Paper>
  );
};

const mapStateToProps = state => ({
  isLoading: state.global.isLoading,
  isError: state.global.isError,
  data: state.models.current,
  currentSelectedProject: state.global.current.project,
  modelVersionsData: state.modelVersions.modelVersions
});

export default withRouter(connect(mapStateToProps, { push })(Model));
