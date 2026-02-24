import React, {useState, useCallback } from 'react';
import Text from 'components/Text';
import Menu from './components/Menu';
import headerLeftIcon from 'components/icons/header_left.svg';
import headerRightIcon from 'components/icons/header_right.svg';
import logo from 'components/icons/logo.svg';
import s from './Header.module.scss';

const Header: React.FC = () => {

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  
  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  },[]);

  return (
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
          <div className={s.burger} onClick={toggleMenu}>
            <div className={s.burger__line}></div>
            <div className={s.burger__line}></div>
            <div className={s.burger__line}></div>
          </div>
          <div className={s.header__entrance}>
            <div>
              <img src={headerLeftIcon} alt="" />
            </div>
            <div>
              <img src={headerRightIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Header);
