import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import AuthApi from 'splitwise-node';
import cookieParse from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import * as passportLocal from '../auth/passport-local-strategy.js';
import passportJwt from '../auth/passport-jwt-strategy.js';
import passportGoogle from '../auth/passport-google-oauth2-strategy.js';
import registerRoutes from './routes/index.js';
import connectMongo from 'connect-mongodb-session';
const MongoStore = connectMongo(session);

const oauthDetails = [{
  "consumerKey":"ZBnetoZkRyjuJ97FSHiOmNAX6Lc4xIVrCwFkeZ7G",
  "consumerSecret":"dmjNg944GUJ3Y3VRthSa9lJ0wkxcOony9f8G8O8U",
  "apiKey":"iXImDYyUdvdr938XlGs63eLc0XswsL3Sqal3i9zL",
  "tokenUrl":"https://secure.splitwise.com/oauth/token",
  "authorizeUrl":"https://secure.splitwise.com/oauth/authorize"
}];

const initialize = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParse());
  // TODO: MongoDB connection
  // MongoDB connections --> refer local copy for further code
  const db = mongoose.connection;  

  app.use(session({
    name: 'CentWise',
    secret: 'a8f3091c7baba4f391e76d36b90fd0df69086efc60b6c568dcb27b1aae6f0547',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
     store: new MongoStore({
    uri: 'mongodb+srv://vijayvargiyam:neu!121510Boston@info-6150-mananv.64mywo5.mongodb.net/centWise-pre?retryWrites=true&w=majority',
    collection: 'sessions'
  })
})); 

app.use(passport.initialize());
app.use(passport.session());
app.use(passportLocal.setAuthenticatedUser);
app.use(flash());
registerRoutes(app);


  /*let userOAuthToken, userOAuthTokenSecret;
  var authApi = new AuthApi(oauthDetails[0].consumerKey, oauthDetails[0].consumerSecret);

  
  app.get('/centwise/authorize', (req, res) => {
      
    authApi.getOAuthRequestToken()
      .then(({ token, secret }) => {
        // Store these tokens in a secure way (e.g., in a session or a database)
        userOAuthToken = token;
        userOAuthTokenSecret = secret;
        
        const userAuthUrl = authApi.getUserAuthorisationUrl(token);
        res.json({ authorizationUrl: userAuthUrl });
      })
      .catch((error) => {
        console.error('Error getting authorization URL:', error.message);
        res.status(500).send('Internal Server Error');
      });
  });

  
  app.get('/centwise/callback', (req, res) => {
    const { oauth_token, oauth_verifier } = req.query;

    authApi.getOAuthAccessToken(
      userOAuthToken,
      userOAuthTokenSecret,
      oauth_verifier
    )
    .then(({ oAuthAccessToken: accessToken, oAuthAccessTokenSecret: accessTokenSecret }) => {
      console.log('Access Token:', accessToken);
      console.log('Access Token Secret:', accessTokenSecret);
        // Now you have the access token and access token secret
        const splitwiseApi = authApi.getSplitwiseApi(accessToken, accessTokenSecret);
        //console.log("accessToken " + accessToken + " accessTokenSecret " + accessTokenSecret);
        //splitwiseApi.getCurrentUser().then(console.log);
        console.log("PRINTING GROUPS");
        //splitwiseApi.getGroups().then(console.log);
        console.log("GETTING FRIENDS");
        //splitwiseApi.getFriends().then(console.log);
        console.log("trying to create expense");
        const expense = {
          payment:"true",
          cost: "100",
          description: "Testing from centwise",
          users: [
            {
              user: "UserBasic",
              user_id: 40986117,
              paid_share: '100.0',
              owed_share: '0.0',
             net_balance: '147.97'
            },{
              user: "UserBasic",
              user_id: 56155831,
              paid_share: '0.0',
              owed_share: '100.0',
             net_balance: '147.97'
            }
          ]
        };

        const expenseConfig = {
          group_id: 51144308,
          dated_before: '2023-12-03T20:18:45Z',
          updated_before: '2023-12-03T20:18:45Z',
          limit: 20
        }
        const userShare = [{
          'user_id':40986117,
          'paid_share': "100",
          'owed_share': "0"
        },{
          'user_id':56155831,
          'paid_share': "0",
          'owed_share': "100"
        }]

        const userIDs = [{
          'user_id':40986117 //manan
        },{
          'user_id':56155831 //yash
        },{
            'user_id':38073951  //munish
          }
      ];

      // ,{
      //   'user_id':71225335  //umang
      // }
      // ,{
      //   'user_id':63401021 //uttkarsh
      // },
      // ,{
      //   'user_id':16624751 //nahata
      // },{
      //   'user_id':38073951 //munish
      // }

        const userI = {
          id: 40986117,
          first_name: 'Manan',
          last_name: 'Vijayvargiya',
          picture: {
            small: 'https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-ruby3-50px.png',
            medium: 'https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-ruby3-100px.png',
            large: 'https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-ruby3-200px.png'
          },
          custom_picture: false,
          email: 'mananvijay7@gmail.com',
          registration_status: 'confirmed',
          force_refresh_at: '2021-07-16T09:37:15Z',
          locale: 'en',
          country_code: 'IN',
          date_format: 'MM/DD/YYYY',
          default_currency: 'USD',
          default_group_id: -1,
          notifications_read: '2023-12-03T19:47:21Z',
          notifications_count: 11,
          notifications: {
            added_as_friend: true,
            added_to_group: true,
            expense_added: false,
            expense_updated: false,
            bills: true,
            payments: true,
            monthly_summary: true,
            announcements: true
          }
        }
        
        splitwiseApi.createExpense(expense, userShare)
        .then((createExpense) => {
          console.log('addUserToGroup Created:', createExpense);
        })
        .catch((error) => {
          console.error('Error creating expense:', error);
        });
        //splitwiseApi.updateUser(40986117, userI);
      //   splitwiseApi.createGroup('centWise Testing1', userIDs, 'Home', '+1')
      // .then((createGroup: any) => {
      //   console.log('Group Created:', createGroup);
      // })
      // .catch((error: any) => {
      //   console.error('Error creating expense:', error);
      // });

      //splitwiseApi.deleteGroup(58237251);
      // splitwiseApi.getExpenses(expenseConfig)
      // .then((getExpenses: any) => {
      //     console.log('addUserToGroup Created:', getExpenses);
      //   })
      //   .catch((error: any) => {
      //     console.error('Error creating expense:', error);
      //   });

      console.log("GET getCategories");
      //splitwiseApi.getCategories().then(console.log);
        //res.send('Authorization successful!');
        res.redirect('/');
      })
      .catch((error) => {
        console.error('Error getting access token:', error.message);
        res.status(500).send('Internal Server Error');
      });
  });*/
};

export default initialize;
