import { useState } from 'react';
import MainContainer from "../MainContainer/MainContainer";
import styles from "../CentwiseNavigator/CentwiseNavigator.module.css";
import Navbar from '../Navbar/Navbar';
import LeftSidePanel from '../LeftSidePanel/LeftSidePanel';

type Props = {
    title: string
}
const CentwiseNavigator = (props: Props) => {

  return (
    <>
    { console.log( props.title) }
      <div className={styles.container}>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <div className={styles.mainBody}>
          <div className={styles.leftSidePanel}>
            <LeftSidePanel />
          </div>
          <div className={styles.mainContainer}>
            <MainContainer title={props.title} />
          </div>

        </div>
      </div>

    </>

  );
}

export default CentwiseNavigator;
