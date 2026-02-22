import Text from 'components/Text';
import classNames from 'classnames';
import styles from './Menu.module.scss';

const Menu: React.FC = () => {
  return (
    <div className={styles.menu}>
      <Text className={classNames(styles.menu_li, styles.menu_li__active)}>Recipes</Text>
      <Text className={classNames(styles.menu_li)}>Meals Categories</Text>
      <Text className={classNames(styles.menu_li)}>Products</Text>
      <Text className={classNames(styles.menu_li)}>Menu Items</Text>
      <Text className={classNames(styles.menu_li)}>Meal Planning</Text>
    </div>
  );
};

export default Menu;
