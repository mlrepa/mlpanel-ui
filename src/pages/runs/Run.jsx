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
  Select,
  Tooltip,
  IconButton
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import Alert from '@material-ui/lab/Alert';
import { push } from 'connected-react-router';
import { format } from 'date-fns';
import { Formik } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';

import DataTable from 'components/table';
import CustomizedSelect from 'components/customized-select';

import { fetchArtifactsRequest } from 'actions/artifacts';
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

const artifactsTableFields = (
  classes,
  dispatch,
  modalOpen,
  handleClose,
  runId,
  currentSelectedProject,
  modelsData,
  handleOpen
) => [
  createTableField(0, 'id', 'ID'),
  createTableField(1, 'creation_timestamp', 'Created At', value =>
    value ? format(new Date(Number(value)), 'dd/MM/yyyy') : ''
  ),
  createTableField(2, 'id', 'Actions', (value, row) => (
    <>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalOpen}
        onClose={handleClose}
      >
        <Paper className={classes.modalPaper}>
          <Formik
            initialValues={{ name: '', run_id: runId, registeredModel: '' }}
            onSubmit={values => {
              dispatch(
                createModelRequest(currentSelectedProject, {
                  source: `${row.root_uri}/${row.path}`,
                  name: values.registeredModel || values.name,
                  run_id: values.run_id
                })
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
                    Save
                  </Button>
                </div>
                <div>
                  <Select
                    name="registeredModel"
                    displayEmpty
                    value={props.values.registeredModel}
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
                    disabled={!!props.values.registeredModel}
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

      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={() => handleOpen()}
      >
        Register Model
      </Button>
    </>
  ))
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
  modelsData,
  artifactsData
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
    dispatch(fetchArtifactsRequest(currentSelectedProject, runId));
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
      <form className={classes.root}>
        <div className={classes.topBlock}>
          <Tooltip title="Delete" arrow placement="top">
            <IconButton
              edge="end"
              color="primary"
              aria-label="delete run"
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
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.chip}>
          <Typography variant="h6">Lifecycle Stage: </Typography>
          <Chip label={lifecycle_stage} color="primary" />
        </div>
        <div className={classes.chip}>
          <Typography variant="h6">STATUS: </Typography>
          <Chip label={status} color="primary" />
        </div>
        <div className={classes.item}>
          <Typography color="textSecondary">
            Artifact Uri: {artifact_uri}
          </Typography>
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
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          gutterBottom
        >
          Metrics
        </Typography>
        <DataTable tableFields={metricsTableFields} data={metrics} />
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          gutterBottom
        >
          Params
        </Typography>
        <DataTable tableFields={paramsTableFields} data={params} />
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          gutterBottom
        >
          Tags
        </Typography>
        <DataTable tableFields={tagsTableFields} data={tags} />
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          gutterBottom
        >
          Artifacts
        </Typography>
        <DataTable
          tableFields={() =>
            artifactsTableFields(
              classes,
              dispatch,
              modalOpen,
              handleClose,
              runId,
              currentSelectedProject,
              modelsData,
              handleOpen
            )
          }
          data={artifactsData.filter(
            item => item.type && item.type === 'Model'
          )}
        />
      </form>
    </Paper>
  );
};

const mapStateToProps = state => ({
  isLoading: state.global.isLoading,
  isError: state.global.isError,
  data: state.runs.current,
  modelsData: state.models.models,
  artifactsData: state.artifacts.artifacts,
  currentSelectedProject: state.global.current.project,
  currentSelectedExperiment: state.global.current.experiment
});

export default withRouter(connect(mapStateToProps, { push })(Run));
