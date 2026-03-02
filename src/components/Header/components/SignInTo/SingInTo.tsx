import React from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import Text from 'components/Text';
import s from './SingInTo.module.scss';


interface SingInToProps{
    onLogitTemporary: (value: string) => void;
    onPasswordTemporary: (value: string) => void;
    onSingInTo: () => void;
    error: string| null;
    onExit: ()=> void;
    token: string| undefined | null;
    username: string| undefined | null;
}

const SingInTo: React.FC<SingInToProps> = ({
    onLogitTemporary, 
    onPasswordTemporary, 
    onSingInTo, 
    error, 
    onExit,
    token,
    username
}) => {
    return(
        <>
            {!token && <div className={s.singInTo}>
                <Input 
                    className={s.singInTo__input} 
                    placeholder={'Enter login'} 
                    onChange={(value) => onLogitTemporary(value)}
                />
                <Input 
                    className={s.singInTo__input}  
                    placeholder={'Enter password'} 
                    onChange={(value) => onPasswordTemporary(value)} 
                    type="password"
                />
                {error !== null && <Text className={s.errorText}>Check the entered data</Text>}
                <Button className={s.singInTo__button} onClick={onSingInTo}>Log In</Button>
            </div>}
            {token && <div className={s.singInTo}>
                <Text className={s.text}>{`${username}, you are logged in`}</Text>
                <Button className={s.singInTo__button} onClick={onExit}>Exit</Button>
            </div>}
        </>
    )
};
    
export default React.memo(SingInTo);