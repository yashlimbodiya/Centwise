import styles from "./ShowDebtOwesListCard.module.css";

type Props = {
    imgSrc: string,
    username: string,
    amount: string
}

const ShowDebtOwesListCard = (props: Props) => {

    const imagePath: string = props.imgSrc;

    const username: string = props.username;

    const amount: string = props.amount;

    return (
        <div className={styles.card}>
            <div className={styles.imgRec}>
                <img className={styles.img} src={imagePath} alt="user-icon" />
            </div>
            <div className={styles.username}>{username}</div>
            <div className={styles.amount}>{amount}</div>
        </div>
    );
}

export default ShowDebtOwesListCard;