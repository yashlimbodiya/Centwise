import * as dashboardServices from '../services/dashboard-services.js';

export const fetchAllData = async function(request, response){ 
      //console.log(request.isAuthenticated())
      try{
            if(request.isAuthenticated()){
                  const userId = request.user._id;
                  //console.log("USER ID: " + request.user._id);
                  const userData = await dashboardServices.fetchUserData(userId);
                  //console.log(userData);
                  if(!userData){
                        return response.status(404).json({ error: 'User not found' });
                  }else{
                        //console.log("user " + userData.json());
                        return response.json(userData);
                       //return response.redirect('/api/dashboard');
                  }
            }else{
                  //console.log(userData);
                  return response.redirect('/api/user/signin');
            }
            //alert('Login to use CentWise');
      }catch(error){
            console.error('Fetch all data method', error);
            return response.status(500).json({ error: 'Internal Server Error' });

      }
};


export const userDetails = async function(request, response){ 
      try{
            if(request.isAuthenticated()){
                  const userId = request.user._id;
                  const userData = await dashboardServices.fetchUserData(userId);
                  if(!userData){
                        return response.status(404).json({ error: 'User not found' });
                  }else{
                        return response.json(userData);
                  }
            }else{
                  return response.status(400).send('Details not found');
            }
      }catch(error){
            console.error('Fetch all data method', error);
            return response.status(500).json({ error: 'Internal Server Error' });

      }
};

export const updateUserProfile = async function(request, response){
      try{
            const userId = request.params.userId;
            const updatedData = request.body;
            const updatedUserData = await dashboardServices.updateUserData(userId, updatedData);

            //console.log('updatedUserData');
            //console.log(updatedUserData);

            if (!updatedUserData) {
                  return response.status(404).json({ success: false, error: 'User not found' });
            }

            return response.status(200).json({ success: true, data: updatedUserData });
      }catch(error){
            console.error('Error updating user profile:', error);
            response.status(500).json({ success: false, error: 'Internal Server Error' });
      }
}