import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { TextField, Button, Paper } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { push } from 'connected-react-router';

import { createExperimentRequest } from 'actions/experiments';

import useExperimentStyles from './useExperimentStyles';

const ExperimentCreate = ({ currentSelectedProject, push }) => {
  const dispatch = useDispatch();
  const classes = useExperimentStyles();

  if (!currentSelectedProject) {
    push('/');
  }

  return (
    <Paper className={classes.paper}>
      <Formik
        initialValues={{ name: '', description: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required')
        })}
        onSubmit={values => {
          dispatch(createExperimentRequest(currentSelectedProject, values));
        }}
      >
        {props => (
          <form className={classes.root} onSubmit={props.handleSubmit}>
            <div className={classes.topBlock}>
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </div>
            <div>
              <TextField
                error={props.touched.name && props.errors.name}
                name="name"
                label="Name"
                variant="outlined"
                onChange={props.handleChange}
                value={props.values.name}
                helperText={
                  props.touched.name && props.errors.name && 'Required'
                }
              />
            </div>
            <div>
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                multiline
                rows="4"
                onChange={props.handleChange}
                value={props.values.description}
              />
            </div>
          </form>
        )}
      </Formik>
    </Paper>
  );
};

const mapStateToProps = state => ({
  currentSelectedProject: state.global.current.project
});

export default connect(mapStateToProps, { push })(ExperimentCreate);
