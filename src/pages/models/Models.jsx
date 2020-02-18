import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { push } from 'connected-react-router';

import Table from 'components/table';

import { fetchModelsRequest } from 'actions/models';

import createTableField from 'utils/createTableField';
import useModelsStyles from './useModelsStyles';

const tableFields = [
  createTableField(0, 'id', 'ID'),
  createTableField(1, 'creation_timestamp', 'Created At', value =>
    value ? format(new Date(Number(value)), 'dd/MM/yyyy') : ''
  ),
  createTableField(2, 'last_updated_timestamp', 'Updated At', value =>
    value ? format(new Date(Number(value)), 'dd/MM/yyyy') : ''
  )
];

const Models = ({
  isLoading,
  isError,
  data,
  fetchRequest,
  push,
  currentSelectedProject
}) => {
  const classes = useModelsStyles();

  if (!currentSelectedProject) {
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
        isRowClickable
      />
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.global.isLoading,
  isError: state.global.isError,
  data: state.models.models,
  currentSelectedProject: state.global.current.project
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: projectId => dispatch(fetchModelsRequest(projectId)),
  push: url => dispatch(push(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(Models);
