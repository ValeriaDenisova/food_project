import React, {useEffect, useCallback} from 'react';
import { observer } from 'mobx-react-lite';
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


const Header: React.FC = observer(() => {  
  const {
        token,
        username,
        isMenuOpen,
        toggleMenu,
        isFavourite,
        handleFavoriteOpen,
        handleFavoriteClose,
        isEntrance,
        handleEntranceOpen,
        handleEntranceClose,
        setLogitTemporary,
        setPasswordTemporary,
        handleSingInTo,
        error,
        user,
        setToken,
        setUsername
      } = useHeader();

      useEffect(() => {
        if (user) {
          localStorage.setItem('token', user.jwt);
          localStorage.setItem('username', user.user.username);
          setToken(user.jwt);
          setUsername(user.user.username);
        }
      }, [user]);

       const handleExsit = useCallback(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setToken(null)
        setUsername(null)
      }, [])

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
            <Menu isOpen={isMenuOpen}/>
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
    <Modal 
      isModal={isFavourite}
      onFavoriteClose={handleFavoriteClose}
      title={'Favorite recipes'}
    ><FavoriteRecipes 
      token={token} 
      onFavoriteClose={handleFavoriteClose}
    /></Modal>

    <Modal 
      isModal={isEntrance}
      onFavoriteClose={handleEntranceClose}
      title={'Sign in to'}
    >{<SingInTo
      onLogitTemporary={setLogitTemporary}
      onPasswordTemporary={setPasswordTemporary}
      onSingInTo={handleSingInTo}
      error={error}
      onExit={handleExsit}
      token={token}
      username={username}
    />}</Modal>
    </>
  );
});

export default React.memo(Header);
