import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

import styles from './styles.module.css';
import useMaterialStyles from './useMaterialStyles';

const FilterPanelBlock = () => {
  const classes = useMaterialStyles();

  return (
    <div className={styles.filterPanelBlock__div}>
      <div className={styles.filterPanelBlock__item}>
        <Select className={classes.item} value="0" onChange={() => {}}>
          <MenuItem value="default">asd</MenuItem>
          <MenuItem value="asd">asd</MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default FilterPanelBlock;
