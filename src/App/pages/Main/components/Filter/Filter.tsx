import React from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown from 'components/MultiDropdown';
import search from 'components/icons/search.svg';
import slot from 'components/icons/slot.svg';
import clear from 'components/icons/clear.svg';
import type { CategoriesModel } from 'store/models/api/Categories';
import type { Option } from 'components/MultiDropdown/MultiDropdown';
import s from './Filter.module.scss';


interface FilterProps{
  onSearch: (value: string) => void;
  categories: CategoriesModel[];
  onChange: (value: Option[]) => void;
  onTitle: (alue: Option[]) => string;
  isOpenCategory: boolean;
  onOpenCategory: (value: boolean) => void;
  searchValue: string;
  categoriesFilter: Option[];
  onSearchClick: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  onSearch, 
  categories, 
  onChange, 
  onTitle,
  isOpenCategory,
  onOpenCategory,
  searchValue,
  categoriesFilter,
  onSearchClick
}) => {
  return (
    <div className={s.filter}>
      <div className={s.search}>
        <div className={s.input}>
          <Input 
            value={searchValue} 
            onChange= {onSearch} 
            placeholder={'Enter dishes'} 
            width={'100%'} 
            onChangeKey={onSearchClick}
            afterSlot={
              <img src={clear} alt="" onClick={()=>{onSearchClick(''); onSearch('')}}/>
            }
          />
        </div>
        <Button search={true} onClick={()=>{onSearchClick(searchValue)}}>
          <img src={search} alt=""/>
        </Button>
      </div>
      <div className={s.category}>
        <MultiDropdown
          onChange={onChange}
          getTitle={onTitle}
          options={categories.map((item)=>{
            return {key: item.id, value: item.title}
          })}
          value={categoriesFilter}
          afterSlot={
            <div className={s.categoriesFilter__slot}>
              <img src={clear} alt="" onClick={()=>onChange([])}/>
              <img src={slot} alt="" onClick={()=>{onOpenCategory(!isOpenCategory)}}/>
            </div>

          }
          isOpenCategory={isOpenCategory}
          onOpenCategory={onOpenCategory}
        />
      </div>
    </div>
  );
};

export default React.memo(Filter);
