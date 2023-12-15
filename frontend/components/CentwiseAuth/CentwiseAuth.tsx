import styles from "./CentwiseAuth.module.css";
import RightSidePanel from "./RightSidePanel/RightSidePanel";
import SignInForm from "./SignInForm/SignInForm";
import SignUpForm from "./SignUpForm/SignUpForm";

type Props = {
    type: string
}
const CentwiseAuth = (props: Props) => {

    const type: string = props.type;

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
            {
                type === 'signin' ? <SignInForm/> : <SignUpForm/>
            }
            </div>
            <div className={styles.rightSide}>
                <RightSidePanel type={type}/>
            </div>
        </div>
    )
}

export default CentwiseAuth;