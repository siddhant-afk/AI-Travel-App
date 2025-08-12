import { v } from "convex/values";
import { mutation } from "./_generated/server";





export const CreateNewUser = mutation({
    args : {
        name : v.string(),
        email : v.string(),
        imageUrl : v.string()
    },
    handler : async(ctx,args) =>{

        // Fetch the user based on email provided
        
        const user = await ctx.db.query('UserTable')
        .filter((q) => q.eq(q.field('email'),args.email))
        .collect();

        // If user does not exist
        if(user?.length == 0){
            const userData = {
                name : args.name,
                email : args.email,
                imageUrl : args.imageUrl
            }

            // Create new user
            const result = await ctx.db.insert('UserTable', userData);
            return userData;
        }
       
        // If user already exists
        return user[0];
    }
})