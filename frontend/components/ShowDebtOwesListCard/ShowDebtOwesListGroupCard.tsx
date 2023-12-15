import styles from "./ShowDebtOwesListCard.module.css";

type Props = {
    imgSrc: string,
    username: string,
    you_lent: number,
    you_paid: number,
}

const ShowDebtOwesListGroupCard = (props: Props) => {

    const imagePath: string = props.imgSrc;

    const username: string = props.username;

    const you_lent: number = props.you_lent;

    const you_paid: number = props.you_paid;

    return (
        <div className={styles.card}>
            <div className={styles.imgRec}>
                <img className={styles.img} src={imagePath} alt="user-icon" />
            </div>
            <div className={styles.username}>{username}</div>
            <div className={styles.amount}>{you_lent}</div>
            <div className={styles.amount}>{you_paid}</div>
        </div>
    );
}

export default ShowDebtOwesListGroupCard;