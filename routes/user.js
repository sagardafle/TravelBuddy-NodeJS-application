
/*
 * GET users listing.
 */
//var mongoURL = "mongodb://localhost:27017/waterqualitydb";
var mongoURL = "mongodb://admin:admin@ds015403.mlab.com:15403/travelbuddy";
var mongo = require("./mongo");
var multer  =   require('multer');

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.userLogin = function(req,res){
    var storage =   multer.diskStorage({

        destination: function (req, file, callback) {

            callback(null, './uploads');
        },
        filename: function (req, file, callback) {
            callback(null,Date.now()+file.originalname);
        }
    });

    var upload = multer({ storage : storage}).single('upload_file');

    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });

    console.log(req.body)
	/*var emailaddress = req.param("emailaddress");
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");;
	var password = req.param("password");
	var phone = req.param("phone");
    var pp = req.param("upload_file")
	console.log(upload_file +" is the pp");
	var json_responses;
	
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');

		coll.insert({emailaddress: emailaddress, firstname:firstname,lastname:lastname, password:password, phone:phone}, function(err, result){
			if (result) {
				console.log("inserted successfully....");
				json_responses = {"statusCode" : 200,"emailaddress":emailaddress,"firstname":firstname };
				res.send(json_responses);
			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		});
	}); */
	};
	
exports.getUser = function(req,res){
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('login');
	var emailaddress = req.param("emailaddress");
	console.log("email address............",emailaddress);
	coll.find({emailaddress:emailaddress}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"profile":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
};

exports.userInterest = function(req,res)
{

	var emailaddress = req.param("emailaddress");
	var city = req.param("city");
	var activity = req.param("activity");;
	var budget = req.param("budget");
	var json_responses;
	
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('interest');

		coll.insert({emailaddress: emailaddress, city:city,activity:activity, budget:budget}, function(err, result){
			if (result) {
				console.log("inserted successfully....");
				json_responses = {"statusCode" : 200,"interest":result};
				res.send(json_responses);
			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		});
	});
	
};

exports.userersWithSameInterest = function(req,res)
{
	console.log("inside userersWithSameInterest...........");

	var json_responses;
	var city = req.param("city");
	var activity = req.param("activity");;
	var budget = req.param("budget");
	
//	mongo.connect(mongoURL, function(){
//		console.log('Connected to mongo at: ' + mongoURL);
//		var coll = mongo.collection('interest');
//	 console.log("city.......",city);
//	 console.log("activity.......",activity);
//	 console.log("budget.......",budget);
//	
//		coll.find({city:{value: city},activity:{value: activity}, budget:budget}).toArray(function (err, result) {
//		      if (err) {
//		        console.log(err);
//		      } else if (result.length) {
//		        console.log('Found users...:', result);
//
//		        json_responses = {"statusCode" : 200,"users":result};
//				res.send(json_responses);
//		        	
//		      } else {
//		        console.log('No document(s) found with defined "find" criteria!');
//		      }
//		      //Close connection
//		   //   db.close();
//		    });
//		});
		
		

	var resultArray = [];
	for(var i = 0; i< city.length;i++)
		{
		var citiName = city[i];
		var activityName = activity[i];
		var budgetName = budget[i];
		
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('interest');

	//coll.find({city:citiName,activity:activityName, budget:budgetName}).toArray(function (err, result) {
	coll.find({city:{value: citiName},activity:{value: activityName}, budget:budgetName}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found users...:', result);
	        resultArray.push(result);
	        if(resultArray.length == city.length)
	        	{
	        json_responses = {"statusCode" : 200,"users":resultArray};
			res.send(json_responses);
	        	}
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
		}
	
};

exports.getUserInterest = function(req,res)
{
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var emailaddress = req.param("emailaddress");
	var coll = mongo.collection('interest');
	coll.find({emailaddress:emailaddress}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"interest":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});


};

exports.updateUser = function(req,res)
{
	var id = req.param("id");
	var email = req.param("emailaddress");
	var name = req.param("firstname");
	var last = req.param("lastname");
	var ph = req.param("phone");
	var ObjectId = require('mongodb').ObjectID;
	var json_responses;
	mongo.connect(mongoURL, function(){
		var coll = mongo.collection('login');

		coll.update({_id:ObjectId(id)},{$set:{emailaddress:email,firstname:name,lastname:last,phone:ph}}, function(err, result){
			if (result) {
				console.log("inserted successfully....");
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		});
	});
	
	
}

exports.deleteSensor = function(req,res)
{

	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('sensor');
	var id = req.param("_id");
	var ObjectId = require('mongodb').ObjectID;
	
	console.log("id to be deleted........."+id);
	
	coll.remove({"_id" : ObjectId(id)}, function(err, result) {
          if (err) {
              console.log(err);
          }
          console.log(result);
          coll.find({}).toArray(function (err, result) {
    	      if (err) {
    	        console.log(err);
    	      } else if (result.length) {
    	        console.log('Found:', result);
    	        json_responses = {"statusCode" : 200,"sensors":result};
    			res.send(json_responses);
    	      } else {
    	        console.log('No document(s) found with defined "find" criteria!');
    	      }
    	      //Close connection
    	   //   db.close();
    	    });
      });
	});
};


exports.updateSensorStatus = function(req,res){
	var id = req.param("_id");
	var sensorstatus = req.param("status");
	var type = req.param("type");
	var loc = req.param("location");
	
	console.log("id:................",id);
	console.log("sensorstatus:................",sensorstatus);
	console.log("type........",type);
	console.log("loc........",loc);
	
	var ObjectId = require('mongodb').ObjectID;
	var json_responses;
	mongo.connect(mongoURL, function(){
		var coll = mongo.collection('sensor');

		coll.update({_id:ObjectId(id)},{$set:{status:sensorstatus}}, function(err, result){
			if (result) {
				console.log("inserted successfully...status.");
				json_responses = {"statusCode" : 200};
				
				
				mongo.collection('usersensors').find({sensortype:type,location: loc}).toArray(function (err, result) {
					
					if(result.length > 0)
					{
						var id = result[0]._id;
						console.log("id................",id);
						
						mongo.collection('usersensors').update({_id:ObjectId(id)},{$set:{status:sensorstatus}}, function(err, result){
							
					});
					}
					
				});
					
				}
				
				
				
				//res.send(json_responses);
			
		});
	});
};

exports.getLocations = function(req,res){
	
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('sensor');
	var type = req.param("sensortype");
	
	coll.find({sensortype:type}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"locations":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
	
};

exports.getHubsForUsers = function(req,res){
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('sensor');
	var type = req.param("sensortype");
	var loc = req.param("location");
	
	coll.find({sensortype:type,location:loc}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"hubs":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
}
	
exports.addSensorForUser = function(req,res){
	var user = req.param("username");
	var name = req.param("sensorname");
	var type = req.param("sensortype");;
	var hb = req.param("hub");
	var lc = req.param("location");
	var use = req.param("usage");
	var amt = req.param("amount");
	var sts = req.param("status");
	var json_responses;
	
	console.log("sensor name...........",name);
	
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('usersensors');

		coll.insert({username: user, sensorname:name,sensortype:type, hub:hb, location:lc, usage:use,amount:amt,status:sts}, function(err, result){
			if (result) {
				console.log("inserted successfully....");
				json_responses = {"statusCode" : 200, "sensorname":name,"sensortype":type, "hub":hb, "location":lc,"status":sts };
				res.send(json_responses);
			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		});
	});
};


exports.getSensorForUser = function(req,res){
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('usersensors');
	var name = req.param("username");
	
	coll.find({username:name}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"usersensors":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
};

exports.getSensorForAllUsers = function(req,res){
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('usersensors');
	
	coll.find({}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"usersensors":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
};

exports.deleteSensorForUser = function(req,res){

	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('usersensors');
	var id = req.param("_id");
	var ObjectId = require('mongodb').ObjectID;
	
	console.log("id to be deleted........."+id);
	
	coll.remove({"_id" : ObjectId(id)}, function(err, result) {
          if (err) {
              console.log(err);
          }
          console.log(result);
          coll.find({}).toArray(function (err, result) {
    	      if (err) {
    	        console.log(err);
    	      } else if (result.length) {
    	        console.log('Found:', result);
    	        json_responses = {"statusCode" : 200,"sensors":result};
    			res.send(json_responses);
    	      } else {
    	        console.log('No document(s) found with defined "find" criteria!');
    	      }
    	      //Close connection
    	   //   db.close();
    	    });
      });
	});
}
	