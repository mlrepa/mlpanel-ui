import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

const CountryInfoBlock = ({ title, description }) => (
  <div className={styles.countryInfoBlock__section}>
    <div className={styles.countryInfoBlock__div}>
      <div className={styles.countryInfoBlock__title}>{title}</div>
      <div className={styles.countryInfoBlock__description}>{description}</div>
    </div>
  </div>
);

CountryInfoBlock.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default CountryInfoBlock;
