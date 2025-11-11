// Collection “orderinfo” which contains the documents given as below(Perform on Mongo 
// Terminal) 
// { 
// } 
// cust_id:123 
// cust_name: “abc”, 
// status: “A”, 
// price: 250 
// i. 
// Find the total price for each customer and display in the order of total price. 
// ii. Find the distinct customer names 
// iii. Display the “price” of  customers whose status is 'A' 
// iv. Delete the customers whose status is 'A' 
show dbs
use simpleorder
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

// i. Find the total price for each customer and display in the order of total price. 
db.order.aggregate([
    {
        $group:{
            _id:"$cust_id",
            total_Price:{$sum:"$price"}
        }

    }
])
// ii. Find the distinct customer names 
db.order.distinct("cust_name")

// iii. Display the “price” of  customers whose status is 'A' 
db.order.aggregate([
    {
        $project:{
            _id:0,
            
            cust_name:1,
            status:{
                $cond:{
                    if:{
                        $eq:["$status","A"]
                    },
                    then: "A",
                    else:"No A"
                }
            }
            
        }
    }
])

// iv. Delete the customers whose status is 'A' 
db.order.deleteMany({status:"A"})
