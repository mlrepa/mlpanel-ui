import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

const PlacesFilterBlock = ({ title, moreText, cancelText, items }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showMorePlaces, setShowMorePlaces] = useState(5);

  const handleClickPlace = id => {
    if (id === selectedPlace) {
      setSelectedPlace(null);
    } else if (id === showMorePlaces && id !== items.length - 1) {
      setShowMorePlaces(showMorePlaces + 6);
    } else {
      setSelectedPlace(id);
    }
  };

  return (
    <div className={styles.placesFilterBlock__section}>
      <h2 className={styles.placesFilterBlock__title}>{title}</h2>
      <div className={styles.placesFilterBlock__items}>
        {items.slice(0, showMorePlaces + 1).map(item => (
          <div
            key={item.id}
            className={cn(styles.placesFilterBlock__item, {
              [styles.placesFilterBlock__item_selected]:
                item.id === selectedPlace,
              [styles.placesFilterBlock__item_last]:
                item.id === showMorePlaces &&
                item.id !== selectedPlace &&
                item.id !== items.length - 1
            })}
            onClick={() => handleClickPlace(item.id)}
          >
            <div className={styles.placesFilterBlock__item_more}>
              <span>{moreText}</span>
            </div>
            <div className={styles.placesFilterBlock__item_cancel}>
              {cancelText}
            </div>
            <img src={item.img} alt="img" />
            <div className={styles.placesFilterBlock__item_place}>
              <span>{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

PlacesFilterBlock.propTypes = {
  title: PropTypes.string.isRequired,
  moreText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired
};

export default PlacesFilterBlock;
