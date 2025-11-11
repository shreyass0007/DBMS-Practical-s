// Collection “movies” which contains the documents given as below(Perform on Mongo 
// Terminal) 
// { 
// } 
// name: “Movie1” 
// type: “action” 
// budget:1000000 
// producer:{ 
// name: “producer1” 
// address: “PUNE” 
// } 
// i. 
// Find the name of the movie having budget greater than 1,00,000. 
// ii. Find the name of producer who lives in Pune 
// iii. Update the type of movie “action” to “horror” 
// iv. Find all the documents produced by name “producer1” with their address 
show dbs
db.createCollection('movies')
db.movies.insertMany([
    {
    name:'your name',
    type:'romantic fantasy',
    buget:200000,
    producer:{
        name:"Makoto Shinkai",
        address:"Tokyo"
    }
    },

    {
    name:'I want to eat you Pancreas',
    type:'romantic fantasy',
    buget:180000,
    producer:{
        name:"Shinichiro Ushijima",
        address:"Tokyo"
    }
    },

    {
    name:'A Silent Voice',
    type:'romantic fantasy',
    buget:10000,
    producer:{
        name:"Noko Yamada",
        address:"Kyoto"
    }
    },

    {
    name:'Whiplash',
    type:'Indie Film',
    buget:450000,
    producer:{
        name:"Damien Chazelle",
        address:"New York"
    }
    },
    {
    name:'Avengers End Game',
    type:'scifi',
    buget:8900000,
    producer:{
        name:"Joe Russo",
        address:"New York"
    }
    }
])

// i. Find the name of the movie having budget greater than 1,00,000. 
db.movies.find({buget:{$gte:100000}})
// ii. Find the name of producer who lives in Pune 
db.movies.find({"producer.address":"New York"})
// iii.Update the type of movie “action” to “horror” 
db.movies.updateOne(
    {name:'Avengers End Game'},
    {$set:{type:'action'}}
)
db.movies.findOne({name:"Avengers End Game"})

//  Find all the documents produced by name “producer1” with their address

db.movies.find(
    {"producer.name": "Joe Russo"},
    { _id: 0, name: 1, "producer.address": 1 }
)
