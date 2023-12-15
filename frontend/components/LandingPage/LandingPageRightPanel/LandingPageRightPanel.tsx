
import { useSpring, animated } from 'react-spring';
import { useNavigate } from "react-router-dom";
import landingPageImg from "../../../../public/Images/LandingPageImg.png";
import styles from "./LandingPageRightPanel.module.css";

const LandingPageRightPanel = () => {

    const props = useSpring({
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0, transform: 'translateY(-20px)' },
    });

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/signin");
    }


    return (
        <div>
            <animated.div style={props}>
            <div className={styles.landingPageImage}>
                <img src={landingPageImg} alt="LandingPageImage" height="400px" width="700px"/>
            </div>
            </animated.div>
        </div>
    );
}

export default LandingPageRightPanel;