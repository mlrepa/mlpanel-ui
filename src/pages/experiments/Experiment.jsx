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
  Grid,
  Tooltip,
  IconButton
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import Alert from '@material-ui/lab/Alert';
import { push } from 'connected-react-router';
import { format } from 'date-fns';
import DeleteIcon from '@material-ui/icons/Delete';

import Table from 'components/table/DataTable';

import {
  fetchExperimentRequest,
  deleteExperimentRequest
} from 'actions/experiments';
import { fetchRunsRequest } from 'actions/runs';
import createTableField from 'utils/createTableField';
import { setCurrentExperiment } from 'actions/global';

import useExperimentStyles from './useExperimentStyles';

const tableFields = dispatch => [
  createTableField(0, 'run_id', 'ID'),
  createTableField(1, 'status', 'Status', value => (
    <Chip label={value} color="primary" />
  )),
  createTableField(2, 'start_time', 'Start Time', value =>
    value ? format(new Date(Number(value)), 'dd/MM/yyyy') : ''
  ),
  createTableField(3, 'end_time', 'End Time', value =>
    value ? format(new Date(Number(value)), 'dd/MM/yyyy') : ''
  ),
  createTableField(4, '', '', (value, row) => (
    <Grid container spacing={2}>
      <Grid item>
        <Button
          onClick={() => dispatch(push(`/runs/${row.id}`))}
          variant="contained"
          color="primary"
        >
          Show
        </Button>
      </Grid>
    </Grid>
  ))
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
    dispatch(setCurrentExperiment(experimentId));
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
          <Tooltip title="Delete" arrow placement="top">
            <IconButton
              edge="end"
              color="primary"
              aria-label="delete experiment"
              onClick={() =>
                dispatch(
                  deleteExperimentRequest(experimentId, currentSelectedProject)
                )
              }
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.chip}>
          <Typography variant="h6">STATUS: </Typography>
          <Chip label={lifecycle_stage} color="primary" />
        </div>
        <div className={classes.item}>
          <Typography color="textSecondary">Name: {name}</Typography>
        </div>
        <div className={classes.item}>
          <Typography color="textSecondary">
            Description: {description}
          </Typography>
        </div>
        <div className={classes.item}>
          <Typography color="textSecondary">
            Artifact Location:{' '}
            <a href={artifact_location}>{artifact_location}</a>
          </Typography>
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
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        gutterBottom
      >
        Runs
      </Typography>
      <Table
        tableFields={() => tableFields(dispatch)}
        data={runsData}
        innerLevel="info"
      />
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
