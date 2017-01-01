
Meteor.methods({

    //add security for access_token instead of hardwired approach, validation window for sent/recieved and error handling scripts. 
    //https://github.com/ttezel/twit
    
    
    
twoute: function(id) {

if (!id || !this.userId) return;
var quote = Quotes.findOne({_id:id});
if (!quote || !quote.quote || !quote.author) return;

var tweet = '"';

if (quote.quote.length>138) {

 tweet += quote.quote.slice(0,135);
 tweet += '..."';
} else {

tweet += quote.quote + '" --' + quote.author;
}
if (tweet.length>140) {

tweet = tweet.slice(0,137) + '...';

}

Twit.post('statuses/update', {status: tweet}, 
          
          //function(err, data, response) replaced with Meteor.bindEnvironment

   Meteor.bindEnvironment(function(err,data,response) {
    console.log(data);
    console.log(response);
    //RoboMongo verifies $set change as tweeted so you don't repeat
   Quotes.update({_id:id},{$set:{tweeted:true}});
   })
);
return tweet;
}


});