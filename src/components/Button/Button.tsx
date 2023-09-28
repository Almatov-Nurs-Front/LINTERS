import React from 'react';
import classes from './Button.module.scss';


const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className={classes.main}>{children}</button>
  );
};

export default Button;
