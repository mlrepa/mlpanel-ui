import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { push } from 'connected-react-router';
import {
  Button,
  Chip,
  Fab,
  IconButton,
  Grid,
  Tooltip
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import ArchiveIcon from '@material-ui/icons/Archive';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import DeleteIcon from '@material-ui/icons/Delete';

import Table from 'components/table';

import {
  fetchProjectsRequest,
  deleteProjectRequest,
  runProjectRequest,
  restoreProjectRequest,
  terminateProjectRequest,
  archiveProjectRequest
} from 'actions/projects';
import { setCurrentProject } from 'actions/global';

import createTableField from 'utils/createTableField';
import { projectsStatuses } from 'constants/enums';

import useProjectsStyles from './useProjectsStyles';

const tableFields = (
  setCurrentProject,
  runProject,
  stopProject,
  archiveProject,
  restoreProject,
  deleteProject,
  showCurrentProject
) => [
  createTableField(0, 'id', 'ID'),
  createTableField(1, 'name', 'Name'),
  createTableField(2, 'status', 'Status', value => (
    <Chip
      label={value}
      color={projectsStatuses.find(item => item.value === value).color}
    />
  )),
  createTableField(3, 'createdAt', 'Created At', value =>
    format(new Date(value), 'dd/MM/yyyy HH:mm')
  ),
  createTableField(4, 'createdBy', 'Created By'),

  createTableField(5, '', 'Actions', (value, row) => (
    <>
      <Tooltip title="Start" arrow placement="top">
        <IconButton
          disabled={row.status === 'running' || row.status === 'archived'}
          edge="end"
          color="primary"
          aria-label="start project"
          onClick={() => runProject(row.id)}
        >
          <PlayArrowIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Stop" arrow placement="top">
        <IconButton
          disabled={row.status === 'terminated' || row.status === 'archived'}
          edge="end"
          color="primary"
          aria-label="stop project"
          onClick={() => stopProject(row.id)}
        >
          <StopIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Archive" arrow placement="top">
        <IconButton
          disabled={row.status === 'archived'}
          edge="end"
          color="primary"
          aria-label="archive project"
          onClick={() => archiveProject(row.id)}
        >
          <ArchiveIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Restore" arrow placement="top">
        <IconButton
          disabled={row.status !== 'archived'}
          edge="end"
          color="primary"
          aria-label="restore project"
          onClick={() => restoreProject(row.id)}
        >
          <SettingsBackupRestoreIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete" arrow placement="top">
        <IconButton
          edge="end"
          color="primary"
          aria-label="delete project"
          onClick={() => deleteProject(row.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  )),
  createTableField(6, '', '', (value, row) => (
    <Grid container spacing={2}>
      <Grid item>
        <Button
          disabled={row.status !== 'running'}
          onClick={() => setCurrentProject(row.id)}
          variant="contained"
          color="primary"
        >
          Experiments
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={() => showCurrentProject(row.id)}
          variant="contained"
          color="primary"
        >
          Show
        </Button>
      </Grid>
    </Grid>
  ))
];

const Projects = ({
  isLoading,
  isError,
  data,
  fetchRequest,
  push,
  setProject,
  runProject,
  stopProject,
  archiveProject,
  restoreProject,
  deleteProject
}) => {
  const classes = useProjectsStyles();

  const setCurrentProject = async id => {
    await setProject(id);
    await push(`/experiments`);
  };

  const showCurrentProject = async id => {
    await push(`/${id}`);
  };

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
        tableFields={() =>
          tableFields(
            setCurrentProject,
            runProject,
            stopProject,
            archiveProject,
            restoreProject,
            deleteProject,
            showCurrentProject
          )
        }
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
  data: state.projects.projects
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: () => dispatch(fetchProjectsRequest()),
  push: url => dispatch(push(url)),
  setProject: id => dispatch(setCurrentProject(id)),
  runProject: id => dispatch(runProjectRequest(id)),
  stopProject: id => dispatch(terminateProjectRequest(id)),
  restoreProject: id => dispatch(restoreProjectRequest(id)),
  archiveProject: id => dispatch(archiveProjectRequest(id)),
  deleteProject: id => dispatch(deleteProjectRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
