import styles from "./LandingPage.module.css"
import logo from "../../../public/images/CentwiseLogo.png"
import LandingPageLeftPanel from "./LandingPageLeftPanel/LandingPageLeftPanel";
import LandingPageRightPanel from "./LandingPageRightPanel/LandingPageRightPanel";
import LandingPageFooter from "./LandingPageFooter/LandingPageFooter";

const LandingPage = () => {
    return (
        <div className={styles.overAllContainer}>
            <div>
                <div className={styles.logo}>
                    <img src={logo} alt="" height="40px" width="180px" />
                </div>
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.leftSidePanel}>
                        <LandingPageLeftPanel />
                    </div>
                    <div className={styles.rightSidePanel}>
                        <LandingPageRightPanel />
                    </div>
                </div>
                <div className={styles.midDiv}></div>
                <div className={styles.footer}>
                    <LandingPageFooter/>
                </div>
            </div>
        </div>

    );
}

export default LandingPage;