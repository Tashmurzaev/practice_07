import React from 'react';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h3>Welcome to my page</h3>
      <div className={classes.btn}>
        <Button onClick={props.onLogout}>Logout</Button>
      </div>

      {props.bigData.map((item) => {
        return (
          <div className={classes.wrapper}>
            <hr style={{ width: '300px' }} />
            <div>
              <p>{`Name: ${item.userName}`}</p>
            </div>
            <div>
              <p>{`E-mail: ${item.email}`}</p>
            </div>
            <div>
              <p>{`Password: ${item.password}`}</p>
            </div>
          </div>
        );
      })}
    </Card>
  );
};

export default Home;
