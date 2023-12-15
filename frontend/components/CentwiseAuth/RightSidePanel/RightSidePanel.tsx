import React, { useState } from "react";
import { TypeAnimation } from 'react-type-animation';
import styles from "./RightSidePanel.module.css";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from 'react-spring';


interface Props {
    type: string;
}

const RightSidePanel = (params: Props) => {


    const props = useSpring({
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0, transform: 'translateY(-20px)' },
    });

    
    let primaryHeading = "";
    let secondaryHeadingSignIn = "Start splitting CENTcibly today!";
    let secondaryHeadingSignUp = "Sign in into CentWise!";
    let buttonText = "";
    let routePath = "";

    const navigate = useNavigate();


    if (params.type === "signin") {
        primaryHeading = "New Here?";
        buttonText = "Sign Up";
        routePath = "/user/signup"
    } else {
        primaryHeading = "Already splitting Centcibly?";
        buttonText = "Sign In";
        routePath = "/user/signin";
    }

    const handleClick = () => {
        navigate(routePath);
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.contentContainer}>
                <animated.div style={props}>
                    <div className={styles.primaryHeading}>
                        {primaryHeading}
                    </div>
                    </animated.div>
                    <br />
                    <div className={styles.secondaryHeading}>   
                       <TypeAnimation
                            sequence={[
                                `${secondaryHeadingSignIn}`
                            ]}
                            speed={200} // Typing speed in ms
                            style={{ fontSize: '1.5em', color: '#353434' }}
                            repeat={2}
                        />
                    </div>
                    <br />
                    <div className={styles.button}>
                        <button className={styles.signUp} onClick={handleClick}>{buttonText}</button>
                    </div>
            </div>

            
        </div>
    );
}

export default RightSidePanel;