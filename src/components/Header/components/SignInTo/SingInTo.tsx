import React from 'react';
import { observer } from 'mobx-react-lite';
import Input from 'components/Input';
import Button from 'components/Button';
import Text from 'components/Text';
import { user } from 'store/UserStore';
import s from './SingInTo.module.scss';

const SingInTo: React.FC = observer(() => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <>
      {!user.hasToken && (
        <div className={s.singInTo}>
          <Input
            className={s.singInTo__input}
            placeholder={'Enter login'}
            onChange={(value) => setLogin(value)}
          />
          <Input
            className={s.singInTo__input}
            placeholder={'Enter password'}
            onChange={(value) => setPassword(value)}
            type="password"
          />
          {user.isError && <Text className={s.errorText}>Check the entered data</Text>}
          <Button
            className={s.singInTo__button}
            onClick={() => {
              user.entrance(login, password);
            }}
          >
            Log In
          </Button>
        </div>
      )}
      {user.hasToken && (
        <div className={s.singInTo}>
          <Text className={s.text}>{`${user.userName}, you are logged in`}</Text>
          <Button className={s.singInTo__button} onClick={user.exit}>
            Exit
          </Button>
        </div>
      )}
    </>
  );
});

export default React.memo(SingInTo);
