import React from 'react';

import CountryInfoBlock from 'components/country-info-block';
import PlacesFilterBlock from 'components/places-filter-block';

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
    <PlacesFilterBlock />
  </div>
);

export default Tours;
