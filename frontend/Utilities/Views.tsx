import { Route } from "react-router-dom";
import MainContainer from '../components/MainContainer/MainContainer';
import styles from "../components/CentwiseNavigator/CentwiseNavigator.module.css";
import Navbar from '../components/Navbar/Navbar';
import LeftSidePanel from '../components/LeftSidePanel/LeftSidePanel';

const Views = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.navbar}>
                    <Navbar />
                </div>
                <div className={styles.mainBody}>
                    <div className={styles.leftSidePanel}>
                        <LeftSidePanel />
                    </div>
                    <div className={styles.mainContainer}>
                        <Route path="/dashboard" element={<MainContainer title="Dashboard" />} />
                        <Route path="/expenses" element={<MainContainer title="AllExpenses" />} />
                        <Route path="/groups" element={<MainContainer title="Groups" />} />
                        <Route path="/friends" element={<MainContainer title="Dashboard" />} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Views;