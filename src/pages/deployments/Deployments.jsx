import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { Button, Chip, Grid, IconButton } from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  deleteDeploymentRequest,
  fetchDeploymentsRequest,
  runDeploymentRequest,
  stopDeploymentRequest
} from 'actions/deployments';

import Table from 'components/table';

import createTableField from 'utils/createTableField';

import useDeploymentsStyles from './useDeploymentsStyles';
import { push } from "connected-react-router";

const tableFields = dispatch => [
  createTableField(0, 'model_id', 'Model Id'),
  createTableField(1, 'version', 'Version'),
  createTableField(2, 'type', 'Type'),
  createTableField(3, 'status', 'Status', value => (
    <Chip label={value} color={value === 'running' ? 'primary' : 'secondary'} />
  )),
  createTableField(4, 'created_at', 'Created At', value =>
    format(new Date(value), 'dd/MM/yyyy')
  ),
  createTableField(5, 'host', 'Host'),
  createTableField(6, 'port', 'Port'),
  createTableField(7, 'id', 'Actions', (value, row) => (
    <>
      <IconButton
        disabled={row.status === 'running'}
        edge="end"
        color="primary"
        aria-label="start project"
        onClick={() => dispatch(runDeploymentRequest(value))}
      >
        <PlayArrowIcon />
      </IconButton>
      <IconButton
        disabled={row.status === 'stopped'}
        edge="end"
        color="primary"
        aria-label="stop project"
        onClick={() => dispatch(stopDeploymentRequest(value))}
      >
        <StopIcon />
      </IconButton>
      <IconButton
        disabled={row.status === 'stopped'}
        edge="end"
        color="primary"
        aria-label="stop project"
        onClick={() => dispatch(deleteDeploymentRequest(value))}
      >
        <DeleteIcon />
      </IconButton>
    </>
  )),
  createTableField(8, 'id', '', value => (
    <Grid container spacing={2}>
      <Grid item>
        <Button
          onClick={() => dispatch(push(`/deployments/${value}`))}
          variant="contained"
          color="primary"
        >
          Show
        </Button>
      </Grid>
    </Grid>
  ))
];

const Deployments = ({ isLoading, isError, data, fetchRequest }) => {
  const dispatch = useDispatch();
  const classes = useDeploymentsStyles();

  return (
    <div className={classes.root}>
      <Table
        tableFields={() => tableFields(dispatch)}
        isLoading={isLoading}
        isError={isError}
        data={data}
        fetchRequest={fetchRequest}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.global.isLoading,
  isError: state.global.isError,
  data: state.deployments.deployments
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: () => dispatch(fetchDeploymentsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Deployments);
