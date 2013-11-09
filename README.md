Job Application project between Brian H. and Richard L.

Resources
---------
mongodb.org
Mongo Collection Commands
Mongoose

Requirements
-------------
###Part I (Submitting the Form)

1. Let's start by getting the data to submit to the server. Write some client-side JS to serialize the form on submit $('#myform').serialize() and send the data to the post endpoint /applicant via AJAX $.post()
2. In the /applicant route console.log() the data req.body
3. Send a response back to the client like this res.send({success : 'Success!'});
4. Write some jQuery to show the hidden success message located in index.jade when you the client receives a response in the $.post call

###Part II (MongoDB)

1. Install Mongoose in your project npm install mongoose --save.
2. Include Mongoose in your app.js on the server var mongoose = require('mongoose');
3. Call .connect() to connect to MongoDB. Give your DB a name and connect mongoose.connect('mongodb://localhost/mycompanyname');
4. Start Mongodb by running sudo mongod in a new Terminal tab
5. Based on the data received from the client in the "/applicant" endpoint, think about how you would structure the data in the database. Create a Mongoose model based on how the data should be structured. For example : var Cat = mongoose.model('Cat', { name: String });
6. Remember that Mongoose will not create the database or the collections until you attempt to insert something into the database. 

###Part III (Storing the data)

Now lets go back to the /applicant endpoint.
1. Store the recieved data from req.body in your "applicants" model that you previously created var kitty = new Cat({ name: 'Zildjian' }); kitty.save(). Use the example on the Mongoose homepage to guide you http://mongoosejs.com/
2. Go into your Mongo Shell and see if the data was successfully stored after the form is submitted. db.applicants.find()
3. Run these commands in Mongo Shell to see your new DB and collection

```
show dbs 
use applications 
show collections
```

###Part IV (Listing the applicants)

1. Now in the /applicants route, lets pull out all of our applicants from your "applicants" collection Cat.find({}, ...)
2. Take that data and pass it to the "applicants" view using res.render('applicants', data)
3. In the applicants.jade file, write some jade to loop through the applicants you are passing and output the name of the applicant in a list.
4. Once you have written the jade logic to list out the applicants you should be able to hit http://localhost:3000/applicants and see a list of the submitted applications

###Bonus I

1. Add a delete button to each of your applicant names in the applicants list /applicants
2. When the button is clicked, send an AJAX request to the server to delete the item from your Mongo Collection
3. When the client receives the response from the server, remove the item from the list using jQuery

###Bonus II (Application renderer)

1. Create a jade file that can render and job applicant.
2. Create a route that renders your new jade file and passes applicant data to it. This route should look like "/:userid". In Express this route will take anything that is passed to it and the :userid is accessed by using req.params
3. In your list that displays your applicants. Make each name a link.
4. When you click on this link it should go to a route that looks something like "/5266ec1d3939f24149000001"
