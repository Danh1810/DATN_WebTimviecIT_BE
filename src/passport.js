const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config()
const passport = require('passport')
const db = require("../src/models/index")
const { v4: uuidv4 } = require('uuid');
const JWTmdw = require("./middleware/JWT");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/vieclamit/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        console.log(profile)
        try {
            if (profile?.id) {
                let user= await db.Users.findOrCreate({
                    where :{
                        email :profile.emails[0]?.value
                    },
                    defaults: {
                    email: profile.emails[0]?.value,
                    group_id:1,
                    username: profile?.displayName,
                    }
                })
                console.log("skdskdk",user)
                console.log("userid",user[0].email)
                const getrole = await db.Users.findOne({
                    where: {
                      email: user[0].email,
                    },
                    include: [
                      {
                        model: db.Roles, // Assuming Roles is the table for user roles
                        as: "Group",     // Ensure that 'as' matches the alias defined in your model associations
                      },
                    ],
                    raw: true,
                    nest: true, // Flatten the result so we can access 'Group.name' directly
                  });
                const payload = {
                    id: user?.id || profile.id,
                email: profile.emails[0]?.value,
                username: profile.displayName,
                role: getrole.Group.name
                }
        
                const token = await JWTmdw.createToken(payload);

                profile.tokenLogin = token;
                profile.id = user[0].id
                profile.role =getrole.Group.name
                
               
            }
        } catch (error) {
            console.log(error)
        }
        // console.log(profile);
        return cb(null, profile);

    }
));
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/vieclamit/facebook/callback",
    profileFields: ['email', 'photos', 'id', 'displayName']

},
    async function (accessToken, refreshToken, profile, cb) {
        // const tokenLogin = uuidv4()
        console.log("profile",profile)
        // profile.tokenLogin = tokenLogin
        try {

            
            if (profile?.id) {
                let user = await db.Users.findOrCreate({
                    where :{
                        email :profile.emails[0]?.value
                    },
                    defaults: {
                    email: profile.emails[0]?.value,
                    group_id:1,
                    username: profile?.displayName,
                    }
                })
        

                const getrole = await db.Users.findOne({
                    where: {
                      email: user[0].email,
                    },
                    include: [
                      {
                        model: db.Roles, // Assuming Roles is the table for user roles
                        as: "Group",     // Ensure that 'as' matches the alias defined in your model associations
                      },
                    ],
                    raw: true,
                    nest: true, // Flatten the result so we can access 'Group.name' directly
                  });
                const payload = {
                    id: user[0].id || profile.id,
                email: profile.emails[0]?.value,
                username: profile.displayName,
                role: getrole.Group.name
                }
                
        
                const token = await JWTmdw.createToken(payload);

                profile.tokenLogin = token;
                profile.id = user[0].id
                profile.role =getrole.Group.name
            }
        
        } catch (error) {
            console.log(error)
        }
        // console.log(profile);
        return cb(null, profile);
    }
));