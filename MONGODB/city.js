// Collection "city " which contains the documents given as below(Perform on Mongo Terminal)
// {city:"pune",
// type:"urban",
// state: "MH",
// population: "5600000"}

// -using mapreduce, find statewise population

// using mapreduce, find typewise population.

// u as below(Perform on Mongo

// -using mapreduce, find citywise population

use city
db.city.insertMany([
    {
        city:"pune",
        type:"urban",
        state:"MH",
        population:"5600000"
    },
    {
        city:"Nagpur",
        type:"urban",
        state:"MH",
        population:"2400000"
    },
    {
        city:"nashik",
        type:"semi-urban",
        state:"MH",
        population:"1500000"
    },
    {
        city:"Surat",
        type:"urban",
        state:"GJ",
        population:"7000000"
    },
    {
        city:"Ahmedabad",
        type:"urban",
        state:"GJ",
        population:"7000000"
    }
])

var mapState=function(){
    emit(this.state,this.population);
}

var reducePopultion=function(key,values){
    return Array.sum(values);
}

db.city.mapReduce(
    mapState,
    reducePopultion,
    {
        out:"Statewise_popultion"
    }

);
db.Statewise_popultion.find()

var mapState=function(){
    emit(this.city,this.population);
}
var reducePopultion=function(key,values){
    return Array.sum(values);
}

db.city.mapReduce(
    mapState,
    reducePopultion,
    {
        out:"Citywise_popultion"
    }

);
 db.Citywise_popultion.find()

var mapState=function(){
    emit(this.type,this.population);
}
var reducePopultion=function(key,values){
    return Array.sum(values);
}

db.city.mapReduce(
    mapState,
    reducePopultion,
    {
        out:"Typewise_popultion"
    }

);
 db.Typewise_popultion.find()