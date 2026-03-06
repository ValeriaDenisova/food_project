import React from 'react';
import Text from 'components/Text';
import Menu from './components/Menu';
import headerLeftIcon from 'components/icons/header_left.svg';
import headerRightIcon from 'components/icons/header_right.svg';
import logo from 'components/icons/logo.svg';
import Modal from 'components/Modal';
import FavoriteRecipes from './components/FavoriteRecipes';
import SingInTo from './components/SignInTo';
import { useHeader } from './useHeader';
import s from './Header.module.scss';

const Header: React.FC = () => {
  const {
    isMenuOpen,
    toggleMenu,
    isFavourite,
    handleFavoriteOpen,
    handleFavoriteClose,
    isEntrance,
    handleEntranceOpen,
    handleEntranceClose,
  } = useHeader();

  return (
    <>
      <div className={s.header}>
        <div className="wrapper">
          <div className={s.header__container}>
            <div className={s.header__left}>
              <div className={s.logo}>
                <div>
                  <img src={logo} alt="" />
                </div>
                <Text className={s.logo__text}>Food Client</Text>
              </div>
              <Menu isOpen={isMenuOpen} />
            </div>
            <div className={s.header__right}>
              <div className={s.header__entrance}>
                <div onClick={handleFavoriteOpen}>
                  <img src={headerLeftIcon} alt="" />
                </div>
                <div onClick={handleEntranceOpen}>
                  <img src={headerRightIcon} alt="" />
                </div>
              </div>
              <div className={s.burger} onClick={toggleMenu}>
                <div className={s.burger__line}></div>
                <div className={s.burger__line}></div>
                <div className={s.burger__line}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isModal={isFavourite} onFavoriteClose={handleFavoriteClose} title={'Favorite recipes'}>
        <FavoriteRecipes onFavoriteClose={handleFavoriteClose} />
      </Modal>

      <Modal isModal={isEntrance} onFavoriteClose={handleEntranceClose} title={'Sign in to'}>
        {<SingInTo />}
      </Modal>
    </>
  );
};

export default React.memo(Header);
