import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Button, Chip, Fab, Grid } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { push } from 'connected-react-router';

import { fetchExperimentsRequest } from 'actions/experiments';

import Table from 'components/table';

import createTableField from 'utils/createTableField';
import useExperimentsStyles from './useExperimentsStyles';

const tableFields = (showCurrentProject) => [
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
  ),
  createTableField(5, 'id', '', (value, row) => (
    <Grid container spacing={2}>
      <Grid item>
        <Button
          onClick={() => showCurrentProject(value)}
          variant="contained"
          color="primary"
        >
          Show
        </Button>
      </Grid>
    </Grid>
  ))
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

  const showCurrentProject = async id => {
    await push(`/experiments/${id}`);
  };

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
        tableFields={() => tableFields(showCurrentProject)}
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
  data: state.experiments.experiments,
  currentSelectedProject: state.global.current.project
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: id => dispatch(fetchExperimentsRequest(id)),
  push: url => dispatch(push(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(Experiments);
