import * as friendService from '../services/friends-services.js';


export const addFriend = async function(request, response){
      try {
      
            const userDocuments = await friendService.addFriend(request);
            console.log("after api hit");
            console.log(userDocuments);
            // Respond with a success message
            response.status(200).json({ message: 'Group created successfully', group: userDocuments });
          } catch (error) {
            // Handle errors
            console.error('Error creating group:', error);
            response.status(500).json({ message: 'Internal Server Error' });
          }
}