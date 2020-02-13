import React, { useState } from 'react';
import cn from 'classnames';

import styles from './styles.module.css';

const items = [
  {
    id: 0,
    img: 'https://tripfer.com/uploads/24178af4800e445c925f813cb3424046.jpg',
    title: 'Кахетия'
  },
  {
    id: 1,
    img: 'https://tripfer.com/uploads/24178af4800e445c925f813cb3424046.jpg',
    title: 'Кахетия'
  },
  {
    id: 2,
    img: 'https://tripfer.com/uploads/24178af4800e445c925f813cb3424046.jpg',
    title: 'Кахетия'
  },
  {
    id: 3,
    img: 'https://tripfer.com/uploads/24178af4800e445c925f813cb3424046.jpg',
    title: 'Кахетия'
  },
  {
    id: 4,
    img: 'https://tripfer.com/uploads/24178af4800e445c925f813cb3424046.jpg',
    title: 'Кахетия'
  },
  {
    id: 5,
    img: 'https://tripfer.com/uploads/24178af4800e445c925f813cb3424046.jpg',
    title: 'Кахетия'
  },
  {
    id: 6,
    img: 'https://tripfer.com/uploads/24178af4800e445c925f813cb3424046.jpg',
    title: 'Кахетия'
  },
  {
    id: 7,
    img: 'https://tripfer.com/uploads/24178af4800e445c925f813cb3424046.jpg',
    title: 'Кахетия'
  },
  {
    id: 8,
    img: 'https://tripfer.com/uploads/24178af4800e445c925f813cb3424046.jpg',
    title: 'Кахетия'
  },
  {
    id: 9,
    img: 'https://tripfer.com/uploads/24178af4800e445c925f813cb3424046.jpg',
    title: 'Кахетия'
  },
  {
    id: 10,
    img: 'https://tripfer.com/uploads/24178af4800e445c925f813cb3424046.jpg',
    title: 'Кахетия'
  },
  {
    id: 11,
    img: 'https://tripfer.com/uploads/24178af4800e445c925f813cb3424046.jpg',
    title: 'Кахетия'
  }
];

const PlacesFilterBlock = () => {
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
      <h2 className={styles.placesFilterBlock__title}>
        Популярные направления
      </h2>
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
              <span>Еще</span>
            </div>
            <div className={styles.placesFilterBlock__item_cancel}>
              Отменить
            </div>
            <img src={item.img} alt="img" />
            <div className={styles.placesFilterBlock__item_place}>
              <span>Кахетия</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesFilterBlock;
