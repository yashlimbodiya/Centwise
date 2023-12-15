import styles from "./MainContainer.module.css";
import DashboardCmp from "../Dashboard/DashboardCmp";
import GroupCmp from "../Groups/GroupCmp";
import AllExpensesCmp from "../AllExpenses/AllExpensesCmp";
import { useSelector } from "react-redux";
import FriendsCmp from "../Friends/FriendsCmp";


interface ComponentMap {
    [key: string]: React.ComponentType<any>;
};

interface DynamicComponentProps {
    componentName: string;
};

type Props = {
    title: string
};

const componentMap: ComponentMap = {
    Dashboard: DashboardCmp,
    Groups: GroupCmp,
    AllExpenses: AllExpensesCmp,
    Friends: FriendsCmp
};

const assignComponent: React.FC<DynamicComponentProps> = ({ componentName }) => {
    const Component = componentMap[componentName];
    
    if (!Component) {
        // Handle unknown component name
        return <div>Unknown component</div>;
    }
  
    return <Component />;
};

const MainContainer = (props: Props) => {

    let title: string = props.title;
    
    return (
        <div id="main-container">
            <h1 className={styles.mainContainerHeading}>
                { title }
            </h1>
            <div className={styles.mainCard}>
                {
                    assignComponent({ componentName: title })
                }
            </div>
        </div>
    );
}

export default MainContainer;
