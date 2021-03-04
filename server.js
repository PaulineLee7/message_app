const express=require('express');
const bodyParser = require('body-parser');
const path = require('path');
var admin = require("firebase-admin");
const firebase = require('firebase');
const config = require('config');
var serviceAccount = require("./serviceAccountKey.json");
var requestPromise = require('request-promise');
const app = express();
var cors= require('cors');
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/client/build")));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const db = admin.firestore();
const FieldValue = require('firebase-admin').firestore.FieldValue;


//Creating a token
const genAccessToken = (res, user) => {
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {expiresIn: '600s'});
    return res.cookie('token', token, {
      secure: false,
      httpOnly: true,
    });
 };

//Authentication function middleware
app.use(function (req, res, next) {    
    const token = req.cookies.token;
       jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
          //console.log(req.cookies)
            req.userSession = user;  
            //console.log(user.user)       
            next();
        });
});

app.get('/userInfo', function(req, res) {
    if (req.userSession) {
       userInfo=req.userSession;
       user=userInfo.user;
       res.json(userInfo);
       
    } else {
      console.log("Not Logged on");
    }
});

//create a new post
 app.post('/Create', async (req, res) => {
     if(req.userSession){
        try {
                await db.collection('posts').add({  
                title: req.body.post,    
                creator: req.userSession.user,
                description: req.body.description,
                upVotes: 0,
               
            });
            res.redirect(process.env.REDIRECT)
            } catch (error) {
                console.log(error);
                return res.status(404).send(error);
            }
        }else{
            res.sendStatus(503);
        }
});

app.put('/Vote/:id', async (req, res)=>{
    if(req.userSession){
    try {
        const document = db.collection('posts').doc(req.params.id);
        await document.update({
             upVotes: FieldValue.increment(1)
         });
         return res.sendStatus(200);
     } catch (error) {
         console.log(error);
         return res.sendStatus(500);
     }
 }else{
    res.sendStatus(503);
    }
 });

//Get posts
app.get('/api/read', async (req, res) => {
    try {
        const posts = [];
        const querySnapshot = await db.collection('posts').get();
        querySnapshot.forEach((doc) => {
          const { title, comment, upVotes, creator, description } = doc.data();
          posts.push({
            key: doc.id,
            doc, 
            title,
            description,
            upVotes,
            creator,
            comment
          }); 
       
    });return res.status(200).json(posts);  
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
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
        return res.sendStatus(500);
    }
});

  
//Update post
app.put('/Update/:id', async (req, res) => {
    if(req.userSession){
        try {
           const document = db.collection('posts').doc(req.params.id);
           await document.update({
                title: req.body.post,
                description: req.body.description,
            });
            return res.sendStatus(200);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }else{
        res.sendStatus(503);
    }
});

//read comments
app.get('/Read/:id', async (req, res) => {
    try {
        const posts = [];
        const querySnapshot = await db.collection('posts').doc(req.params.id).collection('comments').get();
        querySnapshot.forEach((doc) => {
          const { title, comment, creator} = doc.data();
          posts.push({
            key: doc.id,
            doc, 
            title,
            creator,
            comment
          }); 
       
    });return res.status(200).json(posts);  
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
       }
    });



    //read one comment
app.get('/ReadComment/:id/:commentid', async (req, res) => {
    try {
        const document = db.collection('posts').doc(req.params.id).collection('comments').doc(req.params.commentid);
        let item = await document.get();
        let response = item.data();
        
        return res.status(200).send(response);
        } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//Update one comment
app.put('/update/comment/:id/:commentid', async (req, res) => {
    if(req.userSession){
        try {
            const document = db.collection('posts').doc(req.params.id).collection('comments').doc(req.params.commentid);
            await document.update({
                comment: req.body.post,
            });
            return res.sendStatus(200);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }else{
        res.sendStatus(503);
    }
}); 

// Comment on a post
app.post('/Comment/:id', async (req, res) => {
    if(req.userSession){
    try {   
        await db.collection('posts').doc(req.params.id).collection('comments').add({
            comment: req.body.post,
            creator: req.userSession.user,
        }); 
        // return res.sendStatus(200);
        res.status(301).redirect(process.env.REDIRECT);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}else{
    res.sendStatus(503);
}
});

//Delete a post
app.delete('/api/delete/:id', async (req, res) => {
    if(req.userSession){
        try {
            const document = db.collection('posts').doc(req.params.id);
            await document.delete();
            res.status(301).redirect(process.env.REDIRECT);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }else{
        res.sendStatus(503);
    }
});

//Delete a posts comment
app.delete('/delete/comment/:id/:commentid', async (req, res) => {
    if(req.userSession){
        try {
            const document = db.collection('posts').doc(req.params.id).collection('comments').doc(req.params.commentid);
            await document.delete();
            
            return res.sendStatus(200);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }else{
        res.sendStatus(503);
    }
});


app.get('/login', (req,res)=> {
    res.status(301).redirect(`https://stg-account.samsung.com/accounts/v1/STWS/signInGate?response_type=code&locale=en&countryCode=US&client_id=3694457r8f&redirect_uri=${process.env.URL}/callback&state=CUSTOM_TOKEN&goBackURL=${process.env.URL}`);
});  
    
app.get('/callback', (req, res)=>{
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
                        genAccessToken(res, {user: profileJSON.guid, email: profileJSON.email, 
                            firstName: profileJSON.firstName, username: profileJSON.name});
                        res.redirect(process.env.REDIRECT);
                        //res.status(301).redirect('http://localhost:3000');
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

app.get('/logout', (req,res)=> {
    res.clearCookie('token');
    res.status(301).redirect(`https://stg-account.samsung.com/accounts/v1/STWS/signOutGate?client_id=3694457r8f&state=CUSTOM_TOKEN&signOutURL=${process.env.URL}`);
}); 

app.get(`/*`, function(req, res) {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(port, (req,res)=>{
    console.info(`Running on ${port}`);
});

