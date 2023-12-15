import React, { useState } from 'react';
import styles from "./LeftSidePanel.module.css";
import {LeftSidePanelData} from "./LeftSidePanelData";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InviteFriendsModal from '../InviteFriendsModal/InvitefrndsModal';
import ChartModal from '../ChartVisuals/ChartModal';

interface LeftSidePanelItem {
  titleKey: string;
  icon: React.ReactNode;
  link: string;
}

function LeftSidePanel() {
  const { t } = useTranslation('common');
    const [focusedItem, setFocusedItem] = useState<number | null>(null);
    const [currPage, setCurrPage] = useState<string | null>("/");
    const [isInviteFriendsModalOpen, setInviteFriendsModalOpen] = useState<boolean>(false);
    const [isChartModalOpen, setChartModalOpen] = useState<boolean>(false)
    const handleItemClick = (index: number) => {
      setFocusedItem(index);
      if (LeftSidePanelData[index]?.link === '/invitefriends') {
        console.log('Opening Invite Friends modal');
        setInviteFriendsModalOpen(true);
        setChartModalOpen(false); // Close ChartModal if it was open
      } else if (LeftSidePanelData[index]?.link === '/expensevisualisation') {
        console.log('Opening Chart modal');
        setChartModalOpen(true);
        setInviteFriendsModalOpen(false); // Close InviteFriendsModal if it was open
      } else {
        console.log('Closing Modals');
        setInviteFriendsModalOpen(false);
        setChartModalOpen(false);
      }
    };
    const closeModal = () => {
      setInviteFriendsModalOpen(false);
      setChartModalOpen(false);
    };

    return (
      <>
        <div className={styles.LeftPanel}>
          <div className={styles.Montserrat}></div>
          <ul className={styles.LeftSideBarList}>

          {LeftSidePanelData.map((val, index) => {
            // Declare the 'item' variable here
            const item: LeftSidePanelItem = {
              icon: val.icon,
              titleKey: val.titleKey,
              link: val.link,
            };

              return (
                <li
                  key={index}
                  className={`${styles.row} ${focusedItem === index ? styles.focused : ''}`}
                  onClick={() => handleItemClick(index)}  >
                  <Link className={styles.link}  to={val. link}>
                    {""}
                    <div className={styles.mainDiv}>
                    <div className={styles.icon}>{val.icon}
                    {""}</div>
                    <div>{t(item.titleKey)}</div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {isInviteFriendsModalOpen && <InviteFriendsModal closeModal={closeModal} />}
        {isChartModalOpen && <ChartModal isVisible={isChartModalOpen} onClose={closeModal} />}
      </>
    );
  }
  export default LeftSidePanel;
  