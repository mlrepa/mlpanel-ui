import React, { useState } from 'react';
import cn from 'classnames';

import iconSortDown from '../../assets/sortDown.svg';
import iconSortUp from '../../assets/sortUp.svg';

import styles from './styles.module.css';

const properties = [
  {
    id: 0,
    value: 'Цене'
  },
  {
    id: 1,
    value: 'Популярности'
  },
  {
    id: 2,
    value: 'Отзывам'
  }
];

const SortPanelBlock = () => {
  const [activeSortProperty, setActiveProperty] = useState('');
  const [arrowDirection, setArrowDirection] = useState(false);

  const arrowImg = !arrowDirection ? iconSortDown : iconSortUp;

  const handlePropertyClick = id => {
    if (id === activeSortProperty) {
      setArrowDirection(!arrowDirection);
    } else {
      setActiveProperty(id);
    }
  };

  return (
    <div className={styles.sortPanelBlock__div}>
      <div className={styles.sortPanelBlock__title}>Сортировать по:</div>
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
            className="sortMenu_element_icon sortMenu_element_active"
            style={
              item.id === activeSortProperty
                ? {
                  background: `url(${arrowImg}) no-repeat center/10px`,
                  width: 15
                }
                : { display: 'none' }
            }
          />
        </div>
      ))}
    </div>
  );
};

export default SortPanelBlock;
