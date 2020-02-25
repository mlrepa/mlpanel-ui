import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { push } from 'connected-react-router';
import { Button, Grid, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import Table from 'components/table';

import { deleteModelRequest, fetchModelsRequest } from 'actions/models';

import createTableField from 'utils/createTableField';
import useModelsStyles from './useModelsStyles';

const tableFields = (deleteModel, dispatch) => [
  createTableField(0, 'id', 'ID'),
  createTableField(1, 'creation_timestamp', 'Created At', value =>
    value ? format(new Date(Number(value)), 'dd/MM/yyyy HH:mm') : ''
  ),
  createTableField(2, 'last_updated_timestamp', 'Updated At', value =>
    value ? format(new Date(Number(value)), 'dd/MM/yyyy HH:mm') : ''
  ),
  createTableField(3, 'id', 'Actions', (value, row) => (
    <>
      <Tooltip title="Delete" arrow placement="top">
        <IconButton
          edge="end"
          color="primary"
          aria-label="delete model"
          onClick={() => deleteModel(value)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  )),
  createTableField(4, 'id', '', value => (
    <Grid container spacing={2}>
      <Grid item>
        <Button
          onClick={() => dispatch(push(`/models/${value}`))}
          variant="contained"
          color="primary"
        >
          Show
        </Button>
      </Grid>
    </Grid>
  ))
];

const Models = ({
  isLoading,
  isError,
  data,
  fetchRequest,
  push,
  currentSelectedProject,
  deleteModel: deleteSelectedModel
}) => {
  const dispatch = useDispatch();
  const classes = useModelsStyles();

  if (!currentSelectedProject) {
    push('/');
  }

  const deleteModel = id => deleteSelectedModel(id, currentSelectedProject);

  return (
    <div className={classes.root}>
      <Table
        tableFields={() => tableFields(deleteModel, dispatch)}
        isLoading={isLoading}
        isError={isError}
        data={data}
        fetchRequest={fetchRequest}
        additionalRequestProp={currentSelectedProject}
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
  push: url => dispatch(push(url)),
  deleteModel: (id, projectId) => dispatch(deleteModelRequest(id, projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Models);
