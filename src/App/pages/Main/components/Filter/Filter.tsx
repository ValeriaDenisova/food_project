import React from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown from 'components/MultiDropdown';
import search from 'components/icons/search.svg'
import slot from 'components/icons/slot.svg'
import {nullFunction} from 'utils/utils';
import s from './Filter.module.scss';

const Filter: React.FC = () => {
  return (
    <div className={s.filter}>
      <div className={s.search}>
        <div className={s.input}>
          <Input onChange= {nullFunction} placeholder={'Enter dishes'} width={'100%'} />
        </div>
        <Button search={true}>
          <img src={search} alt="" />
        </Button>
      </div>
      <div className={s.category}>
        <MultiDropdown
          onChange={nullFunction}
          getTitle={() => {
            return 'Categories';
          }}
          options={[
            { key: 'salads', value: 'Salads' },
            { key: 'bakery_products', value: 'Bakery products' },
            { key: 'drinks', value: 'Drinks' },
          ]}
          value={[]}
          afterSlot={
            <img src={slot} alt=""/>
          }
        />
      </div>
    </div>
  );
};

export default React.memo(Filter);
