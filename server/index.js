const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const keys = require('./keys');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: keys.email.user,
        pass: keys.email.pass
    }
});
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});
const objectkeys=(object,keys)=>{
    let objectkeys=Object.keys(object);
    let includes=keys.every(key=>objectkeys.includes(key));
    return includes;
}

class User extends Model {}
class Catergory extends Model {}
class Post extends Model {}
class UserComment extends Model {}

User.init({
    username:DataTypes.STRING,
    passcode:DataTypes.STRING,
    email:DataTypes.STRING,
    mail:DataTypes.BOOLEAN,
    comments:DataTypes.STRING,
},{sequelize})
Catergory.init({
    name:DataTypes.STRING,
    description:DataTypes.STRING,
},{sequelize})
Post.init({
    title:DataTypes.STRING,
    sideimage:DataTypes.STRING,
    headerimage:DataTypes.STRING,
    content:DataTypes.STRING,
    categories:DataTypes.STRING,
    comments:DataTypes.STRING,
    description:DataTypes.STRING,
},{sequelize})
UserComment.init({
    content:DataTypes.STRING,
    post:DataTypes.INTEGER,
    user:DataTypes.STRING,
},{sequelize})

async function main(){
    await sequelize.authenticate();
    await sequelize.sync();

    if(!await User.findOne({where:{username:keys.admin.user}})){
        await User.create({
            username:keys.admin.user,
            passcode:keys.admin.passcode,
            email:keys.admin.email,
            mail:false,
            comments:"[]",
        })
    }

    app.listen(4000)
}

app.use(express.json())
app.use(cors())  

main()

app.get('/:gistid/gist/',async function(req,res){
    res.send(`
        <html>
            <head>
                <title>Gist ${req.params.gistid}</title>
            </head>
            <body>
            <script src="https://gist.github.com/codingtuba/${req.params.gistid}.js"></script>
            </body>
        </html>
    `)
})
app.get('/',async function(req, res){
    let [posts,catergories]=[await Post.findAll(),await Catergory.findAll()];
    posts.forEach(post=>{
        post.comments=JSON.parse(post.comments);
        post.categories=JSON.parse(post.categories);
        post.content=JSON.parse(post.content);
    })
    res.json({
        posts:posts,
        catergories:catergories
    })
})
app.get('/:postid/',async function(req, res){
    try{
        let post=JSON.parse(JSON.stringify(await Post.findOne({where:{id:req.params.postid}})));
        post.comments=JSON.parse(post.comments)?await UserComment.findAll({where:{id:req.params.postid}}):JSON.parse(post.comments);
        post.categories=req.query.view?await Catergory.findAll({where:{id:JSON.parse(post.categories)}}):JSON.parse(post.categories);
        post.content=JSON.parse(post.content);
        res.status(200).json(post)
    }catch(e){res.status(404).send("Post not found")}
})
app.post("/comment/",async function (req,res){
    if(objectkeys(req.body,['username','passcode','content','post'])){
        if(await User.findOne({where:{username:req.body.username,passcode:req.body.passcode}})){
            let comment=await UserComment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.body.username,
            })
            let post=await Post.findOne({where:{id:req.body.post}});
            post.comments=JSON.parse(post.comments);
            post.comments.push(comment.id);
            post.comments=JSON.stringify(post.comments);
            await post.save()
            res.status(200).send("Comment created")
        }else{
            res.status(401).send("Unauthorized")
        }
    }else{
        res.status(406).send("Missing parameters")
    }
})

app.delete('/:postid/',async function(req, res){
    if(req.body.passcode){
        if(req.body.passcode===keys.admin.passcode){
            await Post.destroy({where:{id:req.params.postid}});
            res.send("Post deleted")
        }else{
            res.status(403).send("Wrong passcode")
        }
    }else{res.status(406).send("No passcode")}
})

app.post("/register/", async function(req, res){
    if(objectkeys(req.body,['username','passcode','email'])){
        if(!(await User.findOne({where:{username:req.body.username}}))){
            if(!(await User.findOne({where:{email:req.body.email}}))){
                let user=await User.create({
                    username:req.body.username,
                    passcode:req.body.passcode,
                    email:req.body.email,
                    mail:false,
                    comments:"[]"
                })
                user.comments=[]
                res.json(user)        
            }else{res.status(409).send("Email already taken")}
        }else{res.status(409).send("Username already taken")}
    }
})
app.post("/login/", async function (req, res) {
    if (objectkeys(req.body, ['username', 'passcode'])) {
        let user = 
            await User.findOne({ where: { username: req.body.username } })||
            await User.findOne({ where: { email: req.body.username } });
        if (user) {
            if (user.passcode === req.body.passcode) {
                user.comments=JSON.parse(user.comments);
                res.json(user)
            } else {
                res.status(401).send("Wrong passcode")
            }
        } else {
            res.status(404).send("User not found")
        }
    }
})
app.post("/post/create/", async function (req, res) {
    if (objectkeys(req.body, ['title', 'content', 'categories', 'description', 'sideimage', 'headerimage', 'passcode'])) {
        if(req.body.passcode==keys.admin.passcode){
            let post=await Post.create({
                title:req.body.title,
                content:JSON.stringify(req.body.content),
                categories:JSON.stringify(req.body.categories),
                description:req.body.description,
                sideimage:req.body.sideimage,
                headerimage:req.body.headerimage,
                comments:"[]"
            })
            post.comments=[]
            res.json(post)
        }else{res.status(401).send("Wrong passcode")}
    }else{res.status(406).send("Missing parameters")}
})
app.put("/post/create/", async function (req, res) {
    if (objectkeys(req.body, ['title', 'content', 'categories', 'description', 'sideimage', 'headerimage', 'passcode', 'id'])) {
        if(req.body.passcode==keys.admin.passcode){
            let post=await Post.findOne({where:{id:req.body.id}})
            if(post){
                post.title=req.body.title;
                post.description=req.body.description;
                post.sideimage=req.body.sideimage;
                post.headerimage=req.body.headerimage;
                post.content=JSON.stringify(req.body.content);
                post.categories=JSON.stringify(req.body.categories);
                await post.save();
                res.json(post)
            }
        }else{res.status(401).send("Wrong passcode")}
    }else{res.status(406).send("Missing parameters")}
})
app.post("/catergory/",async function (req, res){
    if(objectkeys(req.body,['name','description','passcode'])){
        if(req.body.passcode==keys.admin.passcode){
            let catergory=await Catergory.create({
                name:req.body.name,
                description:req.body.description,
            })
            res.json(catergory)
        }else{res.status(401).send("Wrong passcode")}
    }else{res.status(406).send("Missing parameters")}
})
app.put("/catergory/",async function (req, res){
    if(objectkeys(req.body,['name','description','passcode','id'])){
        if(req.body.passcode==keys.admin.passcode){
            let catergory=await Catergory.findOne({where:{id:req.body.id}})
            if(catergory){
                catergory.name=req.body.name;
                catergory.description=req.body.description;
                await catergory.save();
                res.json(catergory)
            }
        }else{res.status(401).send("Wrong passcode")}
    }else{res.status(406).send("Missing parameters")}
})
app.delete("/catergory/:cid/",async function (req, res){
    if(objectkeys(req.body,['passcode'])){
        if(req.body.passcode==keys.admin.passcode){
            let catergory=await Catergory.findOne({where:{id:req.params.cid}})
            if(catergory){
                await Catergory.destroy({where:{id:req.params.cid}})
                let posts=await Post.findAll();
                for(let post of posts){
                    let categories=JSON.parse(post.categories);
                    let index=categories.indexOf(catergory.id+'');
                    if(index>-1){
                        categories.splice(index,1);
                        post.categories=JSON.stringify(categories);
                        await post.save();
                    }
                }
                res.send("Catergory deleted")
            }else{res.status(404).send("Catergory not found")}
        }else{res.status(401).send("Wrong passcode")}
    }else{res.status(406).send("Missing parameters")}
})
app.get("/catergory/:cid/",async function(req, res){
    if(req.params.cid){
        let catergory=await Catergory.findOne({where:{id:req.params.cid}})
        let posts=(await Post.findAll())
        posts=posts.filter(post=>{
            return JSON.parse(post.categories).includes(catergory.id+'')
        })
        if(catergory){
            res.json({
                catergory:catergory,
                posts:req.query.nopost?[]:posts
            })
        }else{res.status(404).send("Catergory not found")}
    }else{res.status(406).send("Missing params")}
})