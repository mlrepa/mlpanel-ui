import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Backdrop,
  CircularProgress,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router';

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const DataTable = ({
  tableFields,
  fetchRequest,
  data,
  isLoading,
  isError,
  additionalRequestProp,
  secondAdditionalRequestProp,
  twoProps,
  innerLevel
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (additionalRequestProp && secondAdditionalRequestProp && twoProps) {
      fetchRequest(additionalRequestProp, secondAdditionalRequestProp);
    } else if (!twoProps && additionalRequestProp) {
      fetchRequest(additionalRequestProp);
    } else if (fetchRequest) {
      fetchRequest();
    }
  }, [
    fetchRequest,
    additionalRequestProp,
    secondAdditionalRequestProp,
    twoProps
  ]);

  useEffect(() => {
    setOpen(isLoading);
  }, [isLoading]);

  if (isLoading) {
    return (
      <Backdrop timeout={0} className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (!isLoading && isError) {
    return (
      <Alert variant="filled" severity="error">
        This is an error alert — check it out!
      </Alert>
    );
  }

  if (!isLoading && data.length === 0) {
    return (
      <Alert variant="filled" severity="warning">
        No data!
      </Alert>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableFields().map(item => (
              <TableCell key={item.id}>{item.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map(row => (
            <TableRow
              key={row.id || row.key}
            >
              {tableFields().map(field => {
                const rowItem = innerLevel
                  ? row[innerLevel][field.name]
                  : row[field.name];

                return (
                  <TableCell key={field.id}>
                    {field.format ? field.format(rowItem, row) : rowItem}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default withRouter(DataTable);
