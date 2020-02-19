import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { connect, useDispatch } from 'react-redux';
import {
  TextField,
  Backdrop,
  CircularProgress,
  Chip,
  Button,
  Paper, Typography
} from "@material-ui/core";
import { DatePicker } from '@material-ui/pickers';
import Alert from '@material-ui/lab/Alert';
import { push } from 'connected-react-router';
import { format } from 'date-fns';

import Table from 'components/table/DataTable';

import {
  fetchExperimentRequest,
  deleteExperimentRequest
} from 'actions/experiments';
import { fetchRunsRequest } from 'actions/runs';
import createTableField from 'utils/createTableField';

import useExperimentStyles from './useExperimentStyles';

const tableFields = () => [
  createTableField(0, 'run_id', 'ID'),
  createTableField(1, 'status', 'Status', value => (
    <Chip label={value} color="primary" />
  )),
  createTableField(2, 'start_time', 'Start Time', value =>
    value ? format(new Date(Number(value)), 'dd/MM/yyyy') : ''
  ),
  createTableField(3, 'end_time', 'End Time', value =>
    value ? format(new Date(Number(value)), 'dd/MM/yyyy') : ''
  )
];

const Experiment = ({
  match: {
    params: { experimentId }
  },
  data: {
    name,
    description,
    artifact_location,
    lifecycle_stage,
    creation_time,
    last_update_time
  },
  data,
  isLoading,
  isError,
  currentSelectedProject,
  runsData
}) => {
  const dispatch = useDispatch();
  const classes = useExperimentStyles();
  const [open, setOpen] = useState(false);

  if (!currentSelectedProject) {
    dispatch(push('/'));
  }

  useEffect(() => {
    dispatch(fetchExperimentRequest(experimentId, currentSelectedProject));
    dispatch(fetchRunsRequest(currentSelectedProject, experimentId));
  }, [dispatch, experimentId, currentSelectedProject]);

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
      <form className={classes.root}>
        <div className={classes.topBlock}>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={() =>
              dispatch(
                deleteExperimentRequest(experimentId, currentSelectedProject)
              )
            }
          >
            Delete
          </Button>
        </div>
        <div className={classes.chip}>
          <Chip label={lifecycle_stage} color="primary" />
        </div>
        <div>
          <TextField disabled label="Name" variant="outlined" value={name} />
        </div>
        <div>
          <TextField
            label="Description"
            variant="outlined"
            disabled
            multiline
            rows="4"
            value={description}
          />
        </div>
        <div>
          <TextField
            label="Artifact Location"
            variant="outlined"
            disabled
            value={artifact_location}
          />
        </div>
        <div>
          {creation_time ? (
            <DatePicker
              format="dd/MM/yyyy"
              label="Created At"
              disabled
              animateYearScrolling
              value={new Date(Number(creation_time))}
            />
          ) : (
            <TextField
              label="Created At"
              variant="outlined"
              disabled
              value={creation_time}
            />
          )}
        </div>
        <div>
          {last_update_time ? (
            <DatePicker
              format="dd/MM/yyyy"
              label="Updated At"
              value={new Date(Number(last_update_time))}
              disabled
              animateYearScrolling
            />
          ) : (
            <TextField
              label="Updated At"
              variant="outlined"
              disabled
              value={last_update_time}
            />
          )}
        </div>
      </form>
      <Typography component="h1" variant="h6" color="inherit" noWrap gutterBottom>
        Runs
      </Typography>
      <Table tableFields={tableFields} data={runsData} innerLevel="info" />
    </Paper>
  );
};

const mapStateToProps = state => ({
  isLoading: state.global.isLoading,
  isError: state.global.isError,
  data: state.experiments.current,
  runsData: state.runs.runs,
  currentSelectedProject: state.global.current.project
});

export default withRouter(connect(mapStateToProps)(Experiment));
