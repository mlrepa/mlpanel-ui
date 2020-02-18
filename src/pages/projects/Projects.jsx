import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Chip, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { push } from 'connected-react-router';

import { fetchProjectsRequest } from 'actions/projects';

import Table from 'components/table';

import createTableField from 'utils/createTableField';
import { projectsStatuses } from 'constants/enums';

import useProjectsStyles from './useProjectsStyles';

const tableFields = [
  createTableField(0, 'name', 'Name'),
  createTableField(1, 'status', 'Status', value => (
    <Chip
      label={value}
      color={projectsStatuses.find(item => item.value === value).color}
    />
  )),
  createTableField(2, 'createdAt', 'Created At', value =>
    format(new Date(value), 'dd/MM/yyyy')
  )
];

const Projects = ({ isLoading, isError, data, fetchRequest, push }) => {
  const classes = useProjectsStyles();

  return (
    <div className={classes.root}>
      {!isError && (
        <div className={classes.topBlock}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => push('/projects/create')}
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
        isRowClickable
      />
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.global.isLoading,
  isError: state.global.isError,
  data: state.projects.projects
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: () => dispatch(fetchProjectsRequest()),
  push: url => dispatch(push(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
