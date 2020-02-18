import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Chip } from '@material-ui/core';

import { fetchDeploymentsRequest } from 'actions/deployments';

import Table from 'components/table';

import createTableField from 'utils/createTableField';

import useDeploymentsStyles from './useDeploymentsStyles';

const tableFields = [
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
  createTableField(6, 'port', 'Port')
];

const Deployments = ({ isLoading, isError, data, fetchRequest }) => {
  const classes = useDeploymentsStyles();

  return (
    <div className={classes.root}>
      <Table
        tableFields={tableFields}
        isLoading={isLoading}
        isError={isError}
        data={data}
        fetchRequest={fetchRequest}
        isRowClickable
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
