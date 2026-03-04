import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown from 'components/MultiDropdown';
import search from 'components/icons/search.svg';
import slot from 'components/icons/slot.svg';
import clear from 'components/icons/clear.svg';
import { categories } from 'store/CategoriesStore';
import { resipes } from 'store/RecipeStore';
import type { Option } from 'components/MultiDropdown/MultiDropdown';
import { handleTitle } from 'utils/utils';
import s from './Filter.module.scss';

const Filter: React.FC = observer(() => {
  const [tempSearch, setTempSearch] = React.useState(resipes.getSearch);
  const [categoriesFilter, setCategoriesFilter] = React.useState<Option[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [checkFilter, setCheckFilter] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (categoriesFilter.length > 0) {
      const jsonString = encodeURIComponent(JSON.stringify(categoriesFilter));
      params.set('category', jsonString);
    } else if (checkFilter) {
      params.delete('category');
    }
    navigate(`?${params.toString()}`, { replace: true });
  }, [navigate, categoriesFilter, checkFilter]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoriesJSON = params.get('category');
    if (categoriesJSON) {
      try {
        const categoriesFromUrl = JSON.parse(decodeURIComponent(categoriesJSON));
        setCategoriesFilter(categoriesFromUrl);
        setCheckFilter(true);
      } catch (e) {
        console.error('Ошибка при разборе категорий из URL', e);
      }
    } else {
      setCheckFilter(true);
    }
  }, []);

  useEffect(() => {
    resipes.setFiltersCategory(categoriesFilter);
  }, [categoriesFilter]);

  return (
    <div className={s.filter}>
      <div className={s.search}>
        <div className={s.input}>
          <Input
            value={tempSearch}
            onChange={setTempSearch}
            placeholder={'Enter dishes'}
            width={'100%'}
            onChangeKey={(value) => {
              resipes.setSearch(value);
            }}
            afterSlot={
              <img
                src={clear}
                alt=""
                onClick={() => {
                  setTempSearch('');
                  resipes.setSearch('');
                }}
              />
            }
          />
        </div>
        <Button
          search={true}
          onClick={() => {
            resipes.setSearch(tempSearch);
          }}
        >
          <img src={search} alt="" />
        </Button>
      </div>
      <div className={s.category}>
        <MultiDropdown
          onChange={setCategoriesFilter}
          getTitle={handleTitle}
          options={categories.cleanCategories.map((item) => {
            return { key: item.id, value: item.title };
          })}
          value={categoriesFilter}
          afterSlot={
            <div className={s.categoriesFilter__slot}>
              <img
                src={clear}
                alt=""
                onClick={() => {
                  setCategoriesFilter([]);
                }}
              />
              <img
                src={slot}
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
            </div>
          }
          isOpenCategory={isOpen}
          onOpenCategory={setIsOpen}
        />
      </div>
    </div>
  );
});

export default React.memo(Filter);
