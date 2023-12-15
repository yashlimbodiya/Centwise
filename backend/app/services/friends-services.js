import User from '../models/UserSchema.js';

export const findUser = async (email) => {
      const user = await User.findOne({email: email});
      return user;
}

export const findUserById = async (id) => {
      const user = await User.findById(id).exec();
      return user;
}


export const addFriend = async (request) => {
      try{
            console.log(request);
            const { email } = request.body;
            const friendUser = await findUser(email);

            const currUser = await findUserById(request.user._id);

            currUser.friends.push({
                  friend: friendUser._id,
                  friend_first_name: friendUser.first_name,
                  friend_last_name: friendUser.last_name,
                });

            
            
                friendUser.friends.push({
                  friend: currUser._id,
                  friend_first_name: currUser.first_name,
                  friend_last_name: currUser.last_name,
                });
            
            await currUser.save();
            await friendUser.save();
                
      }catch(error){
            console.log(error + "couldn't add friends");
      }
      
};