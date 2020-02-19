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
  Modal,
  MenuItem,
  Select
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import Alert from '@material-ui/lab/Alert';
import { push } from 'connected-react-router';
import { format } from 'date-fns';
import { Formik } from 'formik';

import DataTable from 'components/table';
import CustomizedSelect from 'components/customized-select';

import { fetchRunRequest, deleteRunRequest } from 'actions/runs';
import { fetchModelsRequest, createModelRequest } from 'actions/models';
import createTableField from 'utils/createTableField';

import useRunStyles from './useRunStyles';

const metricsTableFields = () => [
  createTableField(0, 'key', 'Key'),
  createTableField(1, 'value', 'Value'),
  createTableField(2, 'timestamp', 'Timestamp', value =>
    value ? format(new Date(Number(value)), 'dd/MM/yyyy') : ''
  ),
  createTableField(3, 'step', 'Step')
];

const paramsTableFields = () => [
  createTableField(0, 'key', 'Key'),
  createTableField(1, 'value', 'Value')
];

const tagsTableFields = () => [
  createTableField(0, 'key', 'Key'),
  createTableField(1, 'value', 'Value')
];

const Run = ({
  match: {
    params: { runId }
  },
  data: { info, data: innerData },
  data,
  isLoading,
  isError,
  currentSelectedProject,
  currentSelectedExperiment,
  push,
  modelsData
}) => {
  const dispatch = useDispatch();
  const classes = useRunStyles();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  if (!currentSelectedProject || !currentSelectedExperiment) {
    push('/');
  }

  useEffect(() => {
    dispatch(fetchModelsRequest(currentSelectedProject));
    dispatch(
      fetchRunRequest(runId, currentSelectedProject, currentSelectedExperiment)
    );
  }, [dispatch, runId, currentSelectedProject, currentSelectedExperiment]);

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

  const { status, start_time, end_time, artifact_uri, lifecycle_stage } = info;
  const { metrics, params, tags } = innerData;

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
            initialValues={{ source: '', name: '', run_id: runId }}
            onSubmit={values => {
              if (values.source) {
                dispatch(
                  createModelRequest(currentSelectedProject, {
                    source: values.source,
                    name: values.source,
                    run_id: values.run_id
                  })
                );
              } else {
                dispatch(createModelRequest(currentSelectedProject, values));
              }

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
                    Save
                  </Button>
                </div>
                <div>
                  <Select
                    name="source"
                    displayEmpty
                    value={props.values.source}
                    onChange={props.handleChange}
                    input={<CustomizedSelect />}
                  >
                    <MenuItem value="">Create New Model</MenuItem>
                    {modelsData.map(model => (
                      <MenuItem key={model.id} value={model.id}>
                        {model.id}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div>
                  <TextField
                    disabled={!!props.values.source}
                    name="name"
                    label="Name"
                    variant="outlined"
                    onChange={props.handleChange}
                    value={props.values.name}
                  />
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
              dispatch(
                deleteRunRequest(
                  runId,
                  currentSelectedProject,
                  currentSelectedExperiment
                )
              )
            }
          >
            Delete
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={() => handleOpen()}
          >
            Register Model
          </Button>
        </div>
        <div className={classes.chip}>
          <Chip label={lifecycle_stage} color="primary" />
        </div>
        <div className={classes.chip}>
          <Chip label={status} color="primary" />
        </div>
        <div>
          <TextField
            disabled
            label="Artifact URI"
            variant="outlined"
            value={artifact_uri}
          />
        </div>
        <div>
          {start_time ? (
            <DatePicker
              format="dd/MM/yyyy"
              label="Start Time"
              disabled
              animateYearScrolling
              value={new Date(Number(start_time))}
            />
          ) : (
            <TextField
              label="Start Time"
              variant="outlined"
              disabled
              value={start_time}
            />
          )}
        </div>
        <div>
          {end_time ? (
            <DatePicker
              format="dd/MM/yyyy"
              label="End Time"
              value={new Date(Number(end_time))}
              disabled
              animateYearScrolling
            />
          ) : (
            <TextField
              label="End Time"
              variant="outlined"
              disabled
              value={end_time}
            />
          )}
        </div>
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          Metrics
        </Typography>
        <DataTable tableFields={metricsTableFields} data={metrics} />
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          Params
        </Typography>
        <DataTable tableFields={paramsTableFields} data={params} />
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          Tags
        </Typography>
        <DataTable tableFields={tagsTableFields} data={tags} />
      </form>
    </Paper>
  );
};

const mapStateToProps = state => ({
  isLoading: state.global.isLoading,
  isError: state.global.isError,
  data: state.runs.current,
  modelsData: state.models.models,
  currentSelectedProject: state.global.current.project,
  currentSelectedExperiment: state.global.current.experiment
});

export default withRouter(connect(mapStateToProps, { push })(Run));
