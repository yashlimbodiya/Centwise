import React, { useState, useEffect } from "react";
import styles from "./AddGroupsModal.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import centwiseLogo from "../../../public/images/CentwiseLogo.png"

interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({ isOpen, onClose }) => {
  const [groupName, setGroupName] = useState<string>("");
  const [showAddMembers, setShowAddMembers] = useState<boolean>(false);
  const [newMemberName, setNewMemberName] = useState<string>("");
  const [groupMembers, setGroupMembers] = useState<string[]>([]); // Initial member is the user

  const navigate = useNavigate();

  useEffect(() => {
    // Reset component state when the component is mounted
    setGroupName("");
    setShowAddMembers(false);
    setNewMemberName("");
    setGroupMembers([]);
  }, [isOpen]);

  const handleGroupNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setGroupName(name);
    setShowAddMembers(name.length > 0); // Show add members button when group name is not empty
  };

  const handleAddMember = () => {
    if (newMemberName.trim() !== "") {
      setGroupMembers([...groupMembers, newMemberName]);
      setNewMemberName(""); // Clear the input after adding a member
    }
  };

  const handleSave = () => {
    // You can handle the save action here, for example, send the group name and members to a function or API
    //console.log("Group Name:", groupName);
    //console.log("Group Members:", groupMembers);
    if(groupName === "" || groupName.length == 0) {
      alert("Group name cannot be empty !");
    } if (groupMembers.length == 0) {
      alert("Please add group members!");
    } else {
      createGroup(groupName, groupMembers);
      // Close the modal after saving
      onClose();
    }
    
  };

  const handleModalClose = () => {
    // Clear changes and close the modal without saving
    setGroupName("");
    setShowAddMembers(false);
    setNewMemberName("");
    setGroupMembers([]);
    onClose();
  };

  const createGroup = async (groupName: string, groupMembers: string[]) => {
    try {
      // Make a request to your server to create the group
      const response = await axios.post('/api/groups/createGroup',
        {
          description: groupName,
          users: groupMembers,
        },
      );

      navigate('/groups');

      // Log the response or handle it as needed
      console.log('Group creation response:', response.data);
    } catch (error: any) {
      // Handle errors, e.g., log them or show an error message to the user
      console.error('Error creating group:', error.message);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <div className={styles.body}>
          <h2 className={styles.startANewGrp}>START A NEW GROUP</h2>
          <div>
            <div className={styles.myGrpShallBCalld}>My group shall be called...</div>
            <input
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={handleGroupNameChange}
              className={styles.inputs}
            />
          </div>
          {showAddMembers && (
            <div>
              <p className={styles.groupMembers}><b>Group Members:</b></p>
              <ul className={styles.memberList}>
                {groupMembers.map((member, index) => (
                  <li key={index} className={styles.members}>{member}</li>
                ))}
              </ul>
              <div>
                <input
                  type="text"
                  placeholder="Enter members email address"
                  value={newMemberName}
                  onChange={(event) => setNewMemberName(event.target.value)}
                  className={styles.inputs}
                />
                <button onClick={handleAddMember} className={styles.addMembersButton}>
                   Add
                </button>
              </div>
            </div>
          )}
          <button onClick={handleSave} className={styles.save}>
            Save
          </button>
          <button type="button" onClick={handleModalClose} className={styles.cancel}>
                    Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGroupModal;
