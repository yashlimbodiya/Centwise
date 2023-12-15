import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from "./Utilities/ProtectedRoute";
import CentwiseNavigator from './components/CentwiseNavigator/CentwiseNavigator';
import LandingPage from './components/LandingPage/LandingPage';
import { Provider } from 'react-redux';
import store from './Store/index';
import Views from './Utilities/Views';
import styles from "./components/CentwiseNavigator/CentwiseNavigator.module.css";
import MainContainer from './components/MainContainer/MainContainer';
import LeftSidePanel from './components/LeftSidePanel/LeftSidePanel';
import Navbar from './components/Navbar/Navbar';
import axios from 'axios';
import CentwiseAuth from './components/CentwiseAuth/CentwiseAuth';
import InviteFriendsModal from './components/InviteFriendsModal/InvitefrndsModal';
import ChartModal from './components/ChartVisuals/ChartModal';



const App: React.FC = () => {
  const [isInviteFriendsModalOpen, setInviteFriendsModalOpen] = useState(false);
  const [isChartModalOpen, setChartModalOpen] = useState(false);

  const handleInviteFriendsClick = () => {
    setInviteFriendsModalOpen(!isInviteFriendsModalOpen);
  };
  const handleChartModalClick = () => {
    setChartModalOpen(!isChartModalOpen);
  };

  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <CentwiseNavigator title="Dashboard" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <CentwiseNavigator title="AllExpenses" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <CentwiseNavigator title="Groups" />
            </ProtectedRoute>
          }
        />

      <Route
                path="/expensevisualisation"
                element={
                  <ProtectedRoute>
                     {/* <ChartModal closeModal={handleChartModalClick} title="Expense Visualization" /> */}
    
                      <ChartModal isVisible={isChartModalOpen} onClose={handleChartModalClick} />
                  </ProtectedRoute>
                }
              />

        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <CentwiseNavigator title="Friends" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/invitefriends"
          element={
            <ProtectedRoute>
              <InviteFriendsModal closeModal={handleInviteFriendsClick} />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<LandingPage />} />
        <Route path="/user/signin" element={<CentwiseAuth type="signin" />} />
        <Route path="/user/signup" element={<CentwiseAuth type="signup" />} />
      </Routes>
    </Router>
    </Provider>
  );
};

export default App;