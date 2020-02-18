import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Chip, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { push } from 'connected-react-router';

import { fetchExperimentsRequest } from 'actions/experiments';

import Table from 'components/table';

import createTableField from 'utils/createTableField';
import useExperimentsStyles from './useExperimentsStyles';

const tableFields = [
  createTableField(0, 'name', 'Name'),
  createTableField(1, 'artifact_location', 'Artifact Location'),
  createTableField(2, 'lifecycle_stage', 'Lifecycle Stage', value => (
    <Chip label={value} color="primary" />
  )),
  createTableField(3, 'creation_time', 'Created At', value =>
    value ? format(new Date(Number(value)), 'dd/MM/yyyy') : ''
  ),
  createTableField(4, 'last_update_time', 'Updated At', value =>
    value ? format(new Date(Number(value)), 'dd/MM/yyyy') : ''
  )
];

const Experiments = ({
  isLoading,
  isError,
  data,
  fetchRequest,
  push,
  currentSelectedProject
}) => {
  const classes = useExperimentsStyles();

  if (!currentSelectedProject) {
    push('/');
  }

  return (
    <div className={classes.root}>
      {!isError && (
        <div className={classes.topBlock}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => push('/experiments/create')}
          >
            <AddIcon />
          </Fab>
        </div>
      )}
      <Table
        tableFields={tableFields}
        isLoading={isLoading}
        isError={isError}
        data={data}
        fetchRequest={fetchRequest}
        additionalRequestProp={currentSelectedProject}
        isRowClickable
      />
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.global.isLoading,
  isError: state.global.isError,
  data: state.experiments.experiments,
  currentSelectedProject: state.global.current.project
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: id => dispatch(fetchExperimentsRequest(id)),
  push: url => dispatch(push(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(Experiments);
