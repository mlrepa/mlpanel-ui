import React from 'react';

import CountryInfoBlock from 'components/country-info-block';
import PlacesFilterBlock from 'components/places-filter-block';
import TourSearchBlock from 'components/tour-search-block';
import SortPanelBlock from 'components/sort-panel-block';

import styles from './styles.module.css';

const Tours = () => (
  <div>
    <div
      className={styles.tours__topBlock}
      style={{
        background:
          'url(https://tripfer.com/uploads/01d2c3e2091841b9869377dde041e7c5.jpg) no-repeat center/cover'
      }}
    >
      <CountryInfoBlock
        title="Грузия"
        description="Туры в Грузию пользуются большой популярностью среди путешественников."
      />
    </div>
    <div className={styles.tours__mainBlock}>
      <PlacesFilterBlock />
      <TourSearchBlock />
      <SortPanelBlock />
    </div>
  </div>
);

export default Tours;
