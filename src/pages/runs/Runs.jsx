import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Chip } from '@material-ui/core';
import { push } from 'connected-react-router';

import { fetchRunsRequest } from 'actions/runs';

import Table from 'components/table';

import createTableField from 'utils/createTableField';
import useRunsStyles from './useRunsStyles';

const tableFields = [
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

const Runs = ({
  isLoading,
  isError,
  data,
  fetchRequest,
  push,
  currentSelectedProject,
  currentSelectedExperiment
}) => {
  const classes = useRunsStyles();

  if (!currentSelectedProject || !currentSelectedExperiment) {
    push('/');
  }

  return (
    <div className={classes.root}>
      <Table
        tableFields={tableFields}
        isLoading={isLoading}
        isError={isError}
        data={data}
        fetchRequest={fetchRequest}
        additionalRequestProp={currentSelectedProject}
        secondAdditionalRequestProp={currentSelectedExperiment}
        twoProps
        isRowClickable
        innerLevel="info"
      />
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.global.isLoading,
  isError: state.global.isError,
  data: state.runs.runs,
  currentSelectedProject: state.global.current.project,
  currentSelectedExperiment: state.global.current.experiment
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (projectId, experimentId) =>
    dispatch(fetchRunsRequest(projectId, experimentId)),
  push: url => dispatch(push(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(Runs);
