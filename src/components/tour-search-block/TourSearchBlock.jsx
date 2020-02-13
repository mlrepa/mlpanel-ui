import React, { useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Select, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';

import useMaterialStyles from './useMaterialStyles';

import styles from './styles.module.css';

const TourSearchBlock = ({
  departurePoints,
  days,
  title,
  departurePlacePlaceholder,
  daysAmountPlaceholder,
  findButtonText
}) => {
  const classes = useMaterialStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [departurePlace, setDeparturePlace] = useState('');
  const [daysAmount, setDaysAmount] = useState('0');

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleDeparturePlaceChange = place => {
    setDeparturePlace(place);
  };

  const handleDaysAmountChange = day => {
    setDaysAmount(day);
  };

  return (
    <div className={styles.tourSearchBlock__div}>
      <p>{title}</p>
      <input
        className={styles.tourSearchBlock__placeInput}
        onChange={event => handleDeparturePlaceChange(event.target.value)}
        value={departurePlace}
        placeholder={departurePlacePlaceholder}
        list="places"
      />
      <datalist
        id="places"
        className={styles.tourSearchBlock__placeInput_datalist}
      >
        {departurePoints.map(item => (
          <option key={item.id} value={item.value}>
            {item.desc}
          </option>
        ))}
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
        onChange={event => handleDaysAmountChange(event.target.value)}
      >
        <MenuItem className={classes.menuItem} value="0">
          {daysAmountPlaceholder}
        </MenuItem>
        {days.map(item => (
          <MenuItem
            key={item.id}
            className={classes.menuItem}
            value={item.value}
          >
            {item.desc}
          </MenuItem>
        ))}
      </Select>
      <span className={styles.tourSearchBlock__button}>{findButtonText}</span>
    </div>
  );
};

TourSearchBlock.propTypes = {
  departurePoints: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired
    })
  ).isRequired,
  days: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
      desc: PropTypes.string.isRequired
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  departurePlacePlaceholder: PropTypes.string.isRequired,
  daysAmountPlaceholder: PropTypes.string.isRequired,
  findButtonText: PropTypes.string.isRequired
};

export default TourSearchBlock;
