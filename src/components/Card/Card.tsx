import React from 'react';
import classNames from 'classnames';
import Button from '../Button';
import Text from '../Text';
import s from './Card.module.scss';

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
  const Class = classNames(s.card, className);
  return (
    <div className={Class} onClick={onClick}>
      <div className={s.cardImg}>
        <img className={s.cardImg__img} src={image} alt="" />
      </div>
      <div className={s.cardInfo}>
        {captionSlot && <p className={s.captionSlot}>{captionSlot}</p>}
        <Text className={s.title}>{title}</Text>
        <Text className={s.subtitle}>{subtitle}</Text>
        <div className={s.cardFooter}>
          <div className={s.contentSlot}>{contentSlot}</div>
          {actionSlot ? actionSlot : <Button>Save</Button>}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
