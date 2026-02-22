import React from 'react';
import classNames from 'classnames';
import Loader from '../Loader';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
  search?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  className,
  loading,
  children,
  disabled,
  search,
  ...rest
}) => {
  const buttonClass =
    loading && !disabled
      ? classNames(styles.button, className)
      : classNames(styles.button, styles.button_disabled, styles.button_hover, className);

  const isDisabled = disabled || loading;

  return (
    <button
      className={buttonClass}
      disabled={isDisabled}
      style={{
        paddingTop: loading || search ? '14px' : undefined,
        paddingBottom: loading || search ? '14px' : undefined,
      }}
      {...rest}
    >
      {loading && <Loader size="s" color="#ffffff" />}
      {children}
    </button>
  );
};

export default Button;
