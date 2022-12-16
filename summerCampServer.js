
process.stdin.setEncoding("utf8");
const portNum = process.argv[2];

console.log(`Web server started and running at http://localhost:${portNum}`);
const prompt = "Stop to shutdown the server: ";
process.stdout.write(prompt);
process.stdin.setEncoding("utf8");



process.stdin.on('readable', () => {  


  let dataInput = process.stdin.read();
	if (dataInput !== null) {
		let command = dataInput.trim();
		if (command === "stop") {
			console.log("Shutting down the server");
            loop=false;
            process.exit(0);  // stop exits the server
    
        } 
    }

});




const path = require("path");

var total = 0;
require("dotenv").config({ path: path.resolve(__dirname, '/.env') }) 

const userName = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;

const { MongoClient, ServerApiVersion } = require('mongodb');

const databaseAndCollection = {db: "CMSC335_DB", collection:"campApplicants"};

async function main() {
    
let express = require('express');//required
const { response } = require("express");
const { request } = require("http");

const app = express();

app.use(express.urlencoded({ extended: true }));







app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  response.render('index');
  
});




app.get('/application', (request, response) => {
    response.render('application')
    
  });



  app.get('/review', (request, response) => {
    response.render('review')
    
  });


  app.get('/searchGpa', (request, response) => {
    response.render('searchGpa')
    
  });


  app.get('/removeApplicants', (request, response) => {
    response.render('removeApplicants')

    
  });






 
    
    
    
    
    
    
    
    const uri = "mongodb+srv://project6:lLPdGZcYm7FwoYzV@cluster0.rjp5tfl.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
     
    app.post('/application', async(request, response) => {
      client.connect();
      try {
        
       
       
       
        let app1 = {name: request.body.name, email: request.body.email, gpa: request.body.gpa, information: request.body.information};
         insertApp(client, databaseAndCollection, app1);

         

       
       
        //await insertMultipleMovies(client, databaseAndCollection, moviesArray);

        response.render('appData', {
            name: request.body.name,
            email: request.body.email,
            gpa: Number(request.body.gpa),
            information: request.body.information
            
          });

    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }

});

app.post('/review', async(request, response) => {
  client.connect();
  try{
    let foundEmail = request.body.emailSearch; 
    //const result = lookUpOneEntry(client, databaseAndCollection, foundEmail);

    let filter = {email: foundEmail};
    const result = await client.db(databaseAndCollection.db)
                        .collection(databaseAndCollection.collection)
                        .findOne(filter);


    response.render('appData', {
        name: result.name,
        email: result.email,
        gpa: result.gpa,
        information: result.information
        
      });

    } catch (e) {
      console.error(e);
  } finally {
      //await client.close();
  }

    


    
}); 


app.post('/searchGpa', async(request, response) => {
  client.connect();
  try{
let foundGpa = request.body.gpaSearch;

let filter = {gpa : { $gte: foundGpa}};
    const cursor = client.db(databaseAndCollection.db)
    .collection(databaseAndCollection.collection)
    .find(filter);

    
    const ans = await cursor.toArray();
    
var display = "<table border=2>";
display = display + "<th><strong> Name </strong> </th>";
display = display + "<th><strong>GPA</strong></th>";

ans.forEach(function (item, index) {
  display = display + "<tr><td>"+ item.name+"</td>";
  display = display + "<td>" + item.gpa + "</td> </tr>";
  
}); 


    response.render('displayGpa', {
      gpaTable:display
      
    });

    


} catch (e) {
  console.error(e);
} finally {
  //await client.close();
}


});




app.post('/removeApplicants', async(request, response) => {
  
  var temp = total;
  client.connect();
  deleteMany(client, databaseAndCollection);

  response.render('removedDisplay', {
    number: temp
  });

 



}); 













const port = portNum;
app.listen(port);
}



async function insertApp(client, databaseAndCollection, app1) {
  total+=1;
  const result = await client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).insertOne(app1);
    
    
}

async function lookUpOneEntry(client, databaseAndCollection, emailName) {
    let filter = {email: emailName};
    const result = await client.db(databaseAndCollection.db)
                        .collection(databaseAndCollection.collection)
                        .findOne(filter);



    return result;

    
}



async function deleteMany(client, databaseAndCollection) {
  let filter = {};
  const result = await client.db(databaseAndCollection.db)
                 .collection(databaseAndCollection.collection)
                 .deleteMany(filter);


  total = 0;


  
  
   
}










//main().catch(console.error);


main()












