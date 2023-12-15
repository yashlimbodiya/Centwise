import User from '../models/UserSchema.js';
import Group from '../models/GroupSchema.js';

export const findUsers = async (request) => {
      try{
            //console.log(request);
            const { description, users } = request.body;
            const userDocuments = await User.find({ email: { $in: users } });
            const userReferences = userDocuments.map((user) => ({ user: user._id }));
            userReferences.push({ user: request.user._id });
            const newGroup = new Group({
              description,
              users: userReferences,
            });
            await newGroup.save();

            await Promise.all(
                  userDocuments.map(async (user) => {
                    user.groups.push({
                      group: newGroup._id,
                      group_name: newGroup.description, 
                      you_paid: 0,
                      you_lent: 0,
                    });
                    await user.save();
                  })
                );

                //console.log(newGroup);

            return newGroup;    
      }catch(error){
            console.log(error + "couldn't create group");
      }
      
};