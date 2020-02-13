import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import iconSortDown from '../../assets/sortDown.svg';
import iconSortUp from '../../assets/sortUp.svg';

import styles from './styles.module.css';

const SortPanelBlock = ({ properties, title }) => {
  const [activeSortProperty, setActiveProperty] = useState('');
  const [arrowDirection, setArrowDirection] = useState(false);

  const handlePropertyClick = id => {
    if (id === activeSortProperty) {
      setArrowDirection(!arrowDirection);
    } else {
      setActiveProperty(id);
    }
  };

  const arrowBackgroundStyle = {
    background: `url(${
      arrowDirection ? iconSortDown : iconSortUp
    }) no-repeat center/10px`
  };

  return (
    <div className={styles.sortPanelBlock__div}>
      <div className={styles.sortPanelBlock__title}>{title}</div>
      {properties.map(item => (
        <div
          key={item.id}
          className={cn(styles.sortPanelBlock__item, {
            [styles.sortPanelBlock__item_active]: item.id === activeSortProperty
          })}
          onClick={() => handlePropertyClick(item.id)}
        >
          <span>{item.value}</span>
          <i
            className={cn(styles.sortPanelBlock__icon)}
            style={
              item.id === activeSortProperty
                ? arrowBackgroundStyle
                : { display: 'none' }
            }
          />
        </div>
      ))}
    </div>
  );
};

SortPanelBlock.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  title: PropTypes.string.isRequired
};

export default SortPanelBlock;
