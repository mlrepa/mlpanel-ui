import React, { useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Select, MenuItem } from '@material-ui/core';

import useMaterialStyles from './useMaterialStyles';

import styles from './styles.module.css';

const TourSearchBlock = () => {
  const classes = useMaterialStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [departurePlace, setDeparturePlace] = useState('');
  const [daysAmount, setDaysAmount] = useState('0');

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div className={styles.tourSearchBlock__div}>
      <p>Подобрать тур</p>
      <input
        className={styles.tourSearchBlock__placeInput}
        onChange={event => setDeparturePlace(event.target.value)}
        value={departurePlace}
        placeholder="Место отправления"
        list="places"
      />
      <datalist
        id="places"
        className={styles.tourSearchBlock__placeInput_datalist}
      >
        <option value="Kazbegi, Georgia">Количество туров: 4</option>
        <option value="Tbilisi, Georgia">Количество туров: 6</option>
      </datalist>
      <KeyboardDatePicker
        className={classes.datePicker}
        autoOk
        variant="inline"
        inputVariant="outlined"
        format="yyyy-MM-dd"
        value={selectedDate}
        InputAdornmentProps={{ position: 'start' }}
        onChange={date => handleDateChange(date)}
      />
      <Select
        variant="outlined"
        className={classes.daysSelect}
        value={daysAmount}
        onChange={event => setDaysAmount(event.target.value)}
      >
        <MenuItem className={classes.menuItem} value="0">
          Количество дней
        </MenuItem>
        <MenuItem className={classes.menuItem} value="2">
          2 дн.
        </MenuItem>
        <MenuItem className={classes.menuItem} value="4">
          4 дн.
        </MenuItem>
      </Select>
      <span className={styles.tourSearchBlock__button}>Найти</span>
    </div>
  );
};

export default TourSearchBlock;
