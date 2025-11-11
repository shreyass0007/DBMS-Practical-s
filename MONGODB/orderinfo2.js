// Collection “orderinfo”  which contains the documents given as below(Perform on Mongo 
// Terminal) 
// { 
// } 
// cust_id:123 
// cust_name:”abc” 
// status:”A” 
// price:250 
// i. Add “Age” field to the orderinfo collection 
// ii. Create the complex index on orderinfo collection and fire the queries and drop the 
// duplicates. 
// iii. Display the average price for each customer group by status 
// iv. Change the customer‟s name whose status is “B” 

show dbs
use order2
db.order.insertMany([
    {
        cust_id:123,
        cust_name:"abc",
        status:"A",
        price:250
    },
    {
        cust_id:124,
        cust_name:"xyz",
        status:"A",
        price:300
    },
    {
        cust_id:125,
        cust_name:"pqr",
        status:"A",
        price:270
    },
    {
        cust_id:126,
        cust_name:"lmn",
        status:"A",
        price:310
    }
])
// i.. Add “Age” field to the orderinfo collection
db.order.updateMany({},{$set:{age:30}})
//ii. Create the complex index on orderinfo collection and fire the queries and drop the 
// duplicates.
db.order.createIndex({cust_name:1,status:1,price:-1})
db.order.aggregate([
// 1) identify duplicate groups (cust_id with count > 1)
db.order.aggregate([
  { $group: { _id: "$cust_id", count: { $sum: 1 }, ids: { $push: "$_id" } } },
  { $match: { count: { $gt: 1 } } }
]).forEach(function(doc) {
  print("Duplicate group for cust_id:", doc._id, "count:", doc.count);
  // Remove all but the first id in doc.ids
  var idsToRemove = doc.ids.slice(1); // remove everything except first
  db.orderinfo.remove({ _id: { $in: idsToRemove } });
});

db.order.updateMany(
    {status:"B"},
    {$set:{cust_name:'NameisB'}}
)