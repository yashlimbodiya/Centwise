import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GroupsIcon from '@mui/icons-material/Groups';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useTranslation } from 'react-i18next';

// const{ t } = useTranslation('common'); 

export const LeftSidePanelData = [
    {
        titleKey: "left.side.panel.dashboard",
        icon: <DashboardIcon />,
        link: "/dashboard"
      },
      {
        titleKey: "left.side.panel.all.expenses",
        icon: <FormatListBulletedIcon />,
        link: "/expenses"
      },
      {
        titleKey: "left.side.panel.groups",
        icon: <GroupsIcon />,
        link: "/groups"
      },
      {
        titleKey: "left.side.panel.expense.visualization",
        icon: <EqualizerIcon />,
        link: "/expensevisualisation"
      },
      {
        titleKey: "left.side.panel.friends",
        icon: <FamilyRestroomIcon />,
        link: "/friends"
      },
      {
        titleKey: "left.side.panel.invite.friends",
        icon: <GroupAddIcon />,
        link: "/invitefriends"
      }
];