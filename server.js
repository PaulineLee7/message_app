const express=require('express');
var firebase = require('firebase');
const bodyParser = require('body-parser');
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
const app = express();

const port = process.env.PORT || 5000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  const db = admin.firestore();

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


//Comment on a post
app.post('/Comment/:id', async (req, res) => {
    try {     
        await db.collection('posts').doc(req.params.id).update({
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
    

  app.listen(port, (req,res)=>{
    console.info(`Running on ${port}`)
  })
