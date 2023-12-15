import styles from "./ShowAmountDetails.module.css";

type Props = {
    label: string,
    amount: string,
    color: string
}

const ShowAmountDetails = (props: Props) => {

    let amountColor: string = props.color;

    if(props.color == "orange") {
        amountColor = styles.orange;    
    } else if (props.color == "green") {
        amountColor = styles.green;
    } else if (props.color == "grey") {
        amountColor = styles.grey;
    }

    const classList = [
        styles.amount,
        amountColor
    ];
    return (
        <div className={styles.box}>
            <div className={styles.label}>
                {
                    props.label
                }
            </div>
            <div className={classList.join(' ')}>
                {
                    props.amount
                }
            </div>
        </div>
    );
}

export default ShowAmountDetails;