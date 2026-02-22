import React from 'react';
import classNames from 'classnames';
import Button from '../Button';
import Text from '../Text';
import styles from './Card.module.scss';

export type CardProps = {
  className?: string;
  image: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  const Class = classNames(styles.card, className);
  return (
    <div className={Class} onClick={onClick}>
      <div className={styles.cardImg}>
        <img src={image} alt="" />
      </div>
      <div className={styles.cardInfo}>
        {captionSlot && <p className={styles.captionSlot}>{captionSlot}</p>}
        <Text className={styles.title}>{title}</Text>
        <Text className={styles.subtitle}>{subtitle}</Text>
        <div className={styles.cardFooter}>
          <div className={styles.contentSlot}>{contentSlot}</div>
          {actionSlot ? actionSlot : <Button>Save</Button>}
        </div>
      </div>
    </div>
  );
};

export default Card;
