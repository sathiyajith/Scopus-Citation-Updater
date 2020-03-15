var express = require("express");
var app  = express();
const request = require('request');
const apikey = '951919cec39c3b1f09885ba8575b587b'
const xml = require("xml-parse");
var OrcidStrategy = require('passport-orcid').Strategy;
var mongoose = require("mongoose");
var nodemailer = require('nodemailer');


var ScopusSchema = new mongoose.Schema({
    name : String,
    scopusId : String,
    authorId:String,
    citationCount : Number,
    moreInfo : String
});

var Scopus = mongoose.model("Scopusdb",ScopusSchema);

var currFaculty = new Scopus({
    name:"Sabharish",
    scopusId:"2323233",
    authorId:"1212121",
    citationCount:123,
    moreInfo:"Not Available"
});

app.use(express.static("public"));
app.set("view engine","ejs");

console.log("welcome to home");


app.get("/emailing",function(req,res)
{
    var email = req.query.email;
    if (email==undefined)
    {
        console.log("no email");
    }
    else
    {
    Scopus.find({},function(err,AllScopus)
    {
        if(err)
        {
            console.log("finding is wrong");
        }
        else{
            var alldata = AllScopus;
            console.log("emailing");
            console.log(alldata);
            var req="";
            var strings;
            strings = "NAME     --->    CITATION COUNT";
            req+=strings+"\n";
            for(var i=0;i<alldata.length;i++)
            {
                strings=alldata[i]["name"]+"\t-->\t"+alldata[i]["citationCount"];
                req+=strings+"\n";
            }
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                  user: 'vckuttralam@gmail.com',
                  pass: 'scopus2020'
                }
            });

            var mailOptions = {
                from: 'vckuttralam@gmail.com',
                to: email,
                subject: 'Thanks for using our app. Here is ur requested data',
                text: req
              };

              
            
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            console.log("email ends here");
        }
    })
    }
})
app.get("/authenticate",function(req,res)
{
    var name = req.query.orcid;
    var pass = req.query.password;
    if (name.length==0 || pass.length==0)
    {
       console.log("Empty username or password");
       res.redirect("/login");
       
    }
    else
    {
        res.redirect("/index");
    }
});

app.get("/excel",function(req,res)
{
    Scopus.find({},function(err,AllScopus)
    {
        if(err)
        {
            console.log("finding is wrong");
        }
        else{
            console.log("Excel Sheet");
            res.render("excel",{Scopus:AllScopus});
        }
    })
})

app.get("/addNew",function(req,res)
{
    console.log("Excel Sheet");
    res.render("NewFaculty")
})

app.get("/adding",function(req,res)
{
    var authorId = req.query.authorId;
    var name = req.query.name;
    var scopusId = req.query.scopusId;
    if (authorId=='' || name==''||scopusId=='')
    {
        res.redirect("/addNew")
    }
    else{
    Scopus.create( new Scopus({
        name:req.query.name,
        scopusId:req.query.scopusId,
        authorId:req.query.authorId,
        citationCount:0,
        moreInfo:"Not Available"
    }))
    console.log("Adding Scopus of faculty");
    res.redirect("/excel");
    }
});

app.get("/removing",function(req,res)
{
    var x = req.query.name;
    //console.log(x);
    console.log("removing Scopus of faculty");
    Scopus.deleteOne({name:x},function(err)
    {
        if(err) {console.log("deleting is wrong");}
        else{
            console.log("deleted");
        }
    })
    res.redirect("/excel");
});


app.get("/",function(req,res)
{
    console.log("home page");
    console.log("Tests like UI, Unit, static, Jenkins supported")
   res.render("welcome") 
});
app.get("/search/citation",function(req,res)
{
    console.log("citation")
    var scopusid = req.query.scopusid 
    console.log(scopusid)
    if (scopusid=="")
    {
       console.log("Empty scopus Id");
       res.redirect("/index");
       console.log("dedede");
       
    }
    else
    {
        var url = "https://api.elsevier.com/content/search/scopus?query=SCOPUS-ID("+scopusid+")&field=citedby-count&apiKey=951919cec39c3b1f09885ba8575b587b";
        request(url, function (error, response, body) {
        if(error)
        {
            console.error('error in Citations :', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            res.send("error")
        }
        else if(!error)
        {
            var jsonObj = xml.parse(body);        
            res.render("citation",{data:jsonObj});
        }
    });
    }
});

app.get("/search/scopus",function(req,res)
{
    console.log("scopus")
    var keyword = req.query.keyword 
   if (keyword=="")
   {
       console.log("Empty keyword");
       res.redirect("/index");
       
   }
   else
   {
    var url = "https://api.elsevier.com/content/search/scopus?query=all("+keyword+")&apiKey="+apikey;
    request(url, function (error, response, body) {
    if(error)
    {
        console.error('error in Authors :', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send("error")
    }
    else if(!error)
    {
        var jsonObj = xml.parse(body);
        
        res.render("scopus",{data:jsonObj});
    }
   
    });
    }
});

app.get("/details",function(req,res)
{
    var name = req.query.name;
    console.log(name);

    Scopus.find({name:name},{'_id':0,'authorId':1},function(err,result)
    {
        if(err){}
        else{
            var searchResult = result[0]["authorId"];
            console.log(searchResult);
            //22988279600
            var options={
            url :"https://api.elsevier.com/content/author/author_id/"+searchResult+"?apiKey=8f37d808f954e09834b141d2fca97bbf",
            headers:{'Accept': 'application/json'}
            };
            request(options, function (error, response, body) {
            if(error)
            {
                console.error('error in Authors :', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                res.send("error")
            }
            else if(!error)
            {
                //var jsonObj = xml.parse(body);
                //console.log(body);
                var jsonObj = JSON.parse(body);
                //console.log(jsonObj);
                if (jsonObj['author-retrieval-response']==undefined)
                {
                    res.send("No details");
                }
                else{

                var reqData = jsonObj['author-retrieval-response'][0];
                var authprofile = reqData["author-profile"]
                var names = authprofile["preferred-name"]["indexed-name"]
                console.log(names);
                var citation = reqData["coredata"]["citation-count"];
                var query = { authorId: searchResult };
                
                console.log(query);

                Scopus.findOneAndUpdate(query, { name:names,citationCount: citation},function(err,doc,res){
                    if(err)
                    {
                        console.log("error");
                    }
                    else
                    {
                        console.log("success");
                    }
                })
                res.render("details",{data:reqData});

                }
            }
           
            });

        }
    })
});


app.get("/search/serial",function(req,res)
{
   console.log("Serial Title page"); 
   var title = req.query.title;
   var issn = req.query.issn;
   //03781119
   var url = 'https://api.elsevier.com/content/serial/title?issn='+issn+'&apiKey=951919cec39c3b1f09885ba8575b587b';

   if (issn=="")
   {
       console.log("Empty issn");
       res.redirect("/index");
       
   }
   else
   {
       request(url, function (error, response, body) {
        if(error)
        {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        }
        else if(!error  && response.statusCode==200)
        {
            var jsonObj = xml.parse(body);
            var jsonStr = xml.stringify(jsonObj,5);
            console.log()
            res.render("serial",{data:jsonObj});
        }
        });
   }
   
});

var session = require('express-session')
var passport = require('passport')
var OrcidStrategy = require('passport-orcid').Strategy

app.use(session({ secret: 'foo', resave: false, saveUninitialized: false }))
app.use('/files', express.static('files'))

app.use(passport.initialize())
app.use(passport.session())


// these are needed for storing the user in the session
passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

// add the ORCID authentication strategy
passport.use(new OrcidStrategy({
  state: true, // remove this if not using sessions
  clientID: "APP-H1VKA3G0PJUY7B5B",
  clientSecret: "278296fb-18af-4403-8200-f0e98bc25d5e",
  callbackURL: 'http://localhost:5000/auth/orcid/callback'
}, function (accessToken, refreshToken, params, profile, done) {
  // `profile` is empty as ORCID has no generic profile URL,
  // so populate the profile object from the params instead

  profile = { orcid: params.orcid, name: params.name }

  return done(null, profile)
}))

app.get("/login",function(req,res)
{
    if (req.isAuthenticated()) {
        res.send('<a href="/auth/logout">Sign out</a>')
      } else {
        res.redirect("/auth/orcid/login")
      }
    
})

app.get('/auth/orcid/login', passport.authenticate('orcid'))

app.get('/auth/orcid/callback', passport.authenticate('orcid', {
    successRedirect: '/index',
    failureRedirect: '/login'
  }))

app.get('/auth/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })
  
  
app.get("/index",checkAuth,function(req,res)
{
    var b = JSON.stringify(req.user);
    if (b==undefined)
    {
        res.send("No details");
    }
    var data = JSON.parse(b);
    res.render("index",{data:data});
   
}); 
  
  function checkAuth (req, res, next) {
    if (!req.isAuthenticated()) res.redirect('/auth/orcid/login')
    return next()
  }
  

app.get('/auth/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })




app.listen(5000,"localhost",function()
{
    console.log("server started");
    mongoose.connect("mongodb://localhost/Scopus",{useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Connected to Database");
        mongoose.set('useFindAndModify', false);
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
});
})

module.exports = app; // for testing
