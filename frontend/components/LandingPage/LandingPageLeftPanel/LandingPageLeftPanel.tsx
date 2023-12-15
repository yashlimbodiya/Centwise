import styles from "./LandingPageLeftPanel.module.css"
import { useSpring, animated } from 'react-spring';
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';

const LandingPageLeftPanel = () => {

    const props = useSpring({
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0, transform: 'translateY(-20px)' },
    });

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/user/signin");
    }

    const handleSignup = () => {
        navigate("/user/signup");
    }


    return (
        <div className={styles.container}>
            <animated.div style={props}>
                <div className={styles.animatedTitle}>

                    <h1 className={styles.titleContent}>
                        <TypeAnimation
                            sequence={[
                                'Welcome to Centwise'
                            ]}
                            speed={200} // Typing speed in ms
                            style={{ fontSize: '1.5em', color: '#353434' }}
                            repeat={1}
                        />
                    </h1>

                </div>
                <div className={styles.secondaryContent}>
                    Elevate your shared living experience with Centwise – the key to fair and friendly expense management.
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.login} onClick={handleLogin}>Login</button>
                    <button className={styles.signup} onClick={handleSignup}>Sign Up</button>
                </div>
            </animated.div>
        </div>
    );
}

export default LandingPageLeftPanel;
