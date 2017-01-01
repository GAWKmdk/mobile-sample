
Template.detail.events({

    'click .toggle-edit': function (e) {
        
        e.preventDefault();
        
        var editflag = Session.equals('editing', true);
        
        if (editflag && Meteor.userId()) {
            
            var upQuote = {};
            
            upQuote.title = $('#input-title').val();
            upQuote.quote = $('#input-quote').val();
            upQuote.author = $('#input-author').val();
            upQuote.tags = $('#input-tags').val();
            upQuote.owner = Meteor.userId();
            
Quotes.upsert({
    
    _id: this._id
}, {
    
    $set:upQuote

});
        }
        
        if (!editflag && !Meteor.userId()) return; 
           Session.set('editing', (!editflag));
           
        
    },
    
    'click .toggle-delete': function (e) {
         
        e.preventDefault();
        
        var quoteId = this._id;
        
        var confirm = window.confirm("Delete this Card ? This can not be undone. ");
        
        if(confirm){
        Quotes.remove({ _id: quoteId });
            Router.go('/');
    }
    },
    
    'click #btn-tweet': function (e) {
        if (this.tweeted) return;
        var tweet = window.confirm("Tweet this quote to your account?");
        
        if(tweet) {
        Meteor.call('twoute', this._id, function(err,result){
            if (!err) {
                console.log(result);
                
                alert("Tweet posted --hypothetically");
            }
        });
        
        //Router.go('/');
        }
    } 
});


Template.detail.helpers({
    
    
    tagsFormatted: function () {

    var tags = this.tags;
        
        if (!tags) return [];
    
        return _.map(tags.split(','),function(d) {
            
            var retTag = '#' + d;
    return {
      
        tag: retTag
    
    };            
            
        });
    
    },
    
    editbuttonstate: function() {

    return (Session.get('editing')) ?
        
        'glyphicon-ok' : 'glyphicon-pencil';
        
        
    },
    
    editing : function() {

    return (Session.equals('editing', true));
        
    },
    tweetText: function() {
        
        return (this.tweeted)?'Tweeted':'Tweet This';
    },
    tweetColor: function() {
        return (this.tweeted)?'btn-success':'btn-info';
    }
    
});




