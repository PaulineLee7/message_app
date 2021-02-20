const express=require('express');
const bodyParser = require('body-parser');
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var requestPromise = require('request-promise');
const app = express();
var cors= require('cors');
const port = process.env.PORT || 5000
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')
require('dotenv').config()

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const db = admin.firestore();

const JWT_SECRET_KEY = 'sbghvf6798vuv';


//Creating a token
const genAccessToken = (res, user) => {
    const token = jwt.sign(user, JWT_SECRET_KEY, {expiresIn: '300s'});
    return res.cookie('token', token, {
      secure: false,
      httpOnly: true,
    });
 };
//Authentication function middleware
app.use(function(req, res, next) {    
    const token = req.cookies.token;
       jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
           console.log(req.cookies)
            req.userSession = user;  
            console.log(user)       
            next();
        });
});
// app.get('/userInfo', function(req, res) {
//     if (req.userSession) {
//       // send back user data from userSession however you want
//       res.json()
//     } else {
//       console.log("fail");// send back nothing or an empty object since the user isn't logged in
//     }
// })
//create a new post
 app.post('/Create', async (req, res) => {
        try {
                await db.collection('posts').add({
                title: req.body.post,
               
            });
        return res.status(200).send();
            } catch (error) {
                console.log(error);
                return res.status(404).send(error);
            }
});

//Get posts
app.get('/api/read', async (req, res) => {
    try {
        const posts = [];
        const querySnapshot = await db.collection('posts').get()
        querySnapshot.forEach((doc) => {
          const { title, comment} = doc.data();
          posts.push({
            key: doc.id,
            doc, 
            title,
            comment
          }); 
       
    });return res.status(200).json(posts)  
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
       }
    });


//read one post
app.get('/api/readpost/:id', async (req, res) => {
    try {
        const document = db.collection('posts').doc(req.params.id);
        let item = await document.get();
        let response = item.data();
        
        return res.status(200).send(response);
        } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

  
//Update post
app.put('/Update/:id', async (req, res) => {
        try {
           const document = db.collection('posts').doc(req.params.id);
           await document.update({
                title: req.body.post,
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    });

//read comments
app.get('/Read/:id/:id', async (req, res) => {
    try {
        const posts = [];
        const querySnapshot = await db.collection('posts').doc(req.params.id).collection('comments').get()
        querySnapshot.forEach((doc) => {
          const { title, comment} = doc.data();
          posts.push({
            key: doc.id,
            doc, 
            title,
            comment
          }); 
       
    });return res.status(200).json(posts)  
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
       }
    });


// Comment on a post
app.post('/Comment/:id', async (req, res) => {
    try {   
        // await db.collection('posts').doc(req.params.id).update({
        //     comment: req.body.post,
        await db.collection('posts').doc(req.params.id).collection('comments').add({
            comment: req.body.post,
        }) 
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//Delete a post
app.delete('/api/delete/:id', async (req, res) => {
        try {
            const document = db.collection('posts').doc(req.params.id);
            await document.delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    });

//VmpKMGIxTXlSa2hWV0d4V1lteHdjRlJVU2xOT2JHUlhXVE5vYTJKVldrcFdWbEYzVUZFOVBR

app.get('/login', (req,res)=> {
    //res.setHeader('Set-Cookie', 'loggedIn=true');
    res.status(301).redirect(`https://stg-account.samsung.com/accounts/v1/STWS/signInGate?response_type=code&locale=en&countryCode=US&client_id=3694457r8f&redirect_uri=http://localhost:5000/hi&state=CUSTOM_TOKEN&goBackURL=http://localhost:3000`);
});  
    

app.get('/hi', (req, res)=>{
    //if(req.session.isLoggedIn=true){
console.log('hello');
    var options = {
        url: `https://${req.query.auth_server_url}/auth/oauth2/token`,
        method: 'POST',
        form: {
            grant_type: "authorization_code",
            code: req.query.code,
            client_id: "3694457r8f",
            client_secret: "ECF8F31E32F6DA9DC17C7704A1A4DE47"
        
        },
    
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }    
    };
   
    //This example assumes a promise based request library
    requestPromise(options)
    .then(response => {
        let json = JSON.parse(response);

    var optionss = {
            url: `https://${req.query.api_server_url}/v2/profile/user/user/${json.userId}`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + json.access_token, //Access token provided from above response
                'x-osp-appId': "3694457r8f",
                'x-osp-userId': json.userId //userId provided from above response
            }
        };
    
    requestPromise(optionss)
    .then(response => {
        let profile = extractProfileInfo(response, json.access_token);
    });
        //You now have readable user profile information as a JSON object in 'profile'
    //});
//});
//});
    const parseXML = require("xml2js").parseString; //Example XML Parsing library

    function extractProfileInfo(body, accessToken) {
        return new Promise(function(resolve, reject) {
            parseXML(body, function(err, obj) {
                if(err) {
                    return reject("parse: " + err);
                } else {
                    try {
                        var guid = obj.UserVO.userID[0];
                        var userName = obj.UserVO.userBaseVO[0].userName[0];
                        var nameInfo = obj.UserVO.userBaseVO[0].userBaseIndividualVO[0];
                        var email = "";
                        obj.UserVO.userIdentificationVO.forEach(function(x) {
                            if(x.loginIDTypeCode[0] === "003") {
                                email = x.loginID[0];
                            }
                        });
                        var lname = (nameInfo ? nameInfo.familyName[0] : " ");
                        var fname = (nameInfo ? nameInfo.givenName[0] : " ");
                        var profileImg = "";
                        if (obj.UserVO.userBaseVO[0].photographImageFileURLText) {
                            profileImg = obj.UserVO.userBaseVO[0].photographImageFileURLText[0];
                        }
         
                        var profileJSON = {
                            "guid": guid,
                            "name": userName,
                            "email": email,
                            "token": accessToken,
                            "lastName": (lname || " "),
                            "firstName": (fname || " "),
                            "profileImg": profileImg
                        };
                        genAccessToken(res, {user: profileJSON.guid});
                        res.status(301).redirect('http://localhost:3000/Login')
                        return resolve(profileJSON);
                    } catch(ex) {
                        return reject("parse: " + ex);
                    }
                } 
              
            });
        });
    }
}); 
});

// app.post('/Login', (req, res)=>{
//     const token = genAccessToken({ userName: guid});
//     res.json(token);
// });

app.get('/logout', (req,res)=> {
    res.status(301).redirect(`https://stg-account.samsung.com/accounts/v1/STWS/signOutGate?client_id=3694457r8f&state=CUSTOM_TOKEN&signOutURL=http://localhost:3000/log_out`);
}); 

app.get('/log_out', (req, res)=>{
    res.status(301).redirect('/log_out');
})
// app.get('/', (req,res)=> {
//     res.redirect(`http://localhost:${config.fusionAuthPort}/oauth2/authorize?client_id=${config.clientID}&redirect_uri=${config.redirectURI}&response_type=code`);
// });

//sign out url: https://stg-account.samsung.com/accounts/v1/STWS/signOutGate?client_id=3694457r8f&state=CUSTOM_TOKEN&signOutURL=http://localhost:3000/logout/complete
  app.listen(port, (req,res)=>{
    console.info(`Running on ${port}`)
  })
