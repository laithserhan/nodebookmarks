
/*
    Variables
*/

var mongoose = require('mongoose'),
    mongodb = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nodebookmarks', 
    db = mongoose.createConnection(mongodb), 
    Schema = mongoose.Schema,    
    BookmarkSchema,
    Bookmark;
  
  
BookmarkSchema = new Schema({

    id: Schema.ObjectId,
    
    owner: Schema.Types.ObjectId,
    
    title: {
        'type': String, 
        'default': ''
    },
    
    url: {
        'type': String, 
        'unique': false
    },
    
    notes: {
       'type': String, 
       'default': ''
    },
    
    starred: {
        'type': Boolean, 
        'default': false
    },
    
    publik: {
        'type': Boolean, 
        'default': false
    },
    
    date: {
        'type': Date, 
        'default': Date.now
    },
    
    tags: {
        'type': Array, 
        'default': ['uncategorised']
    }
});


Bookmark =  db.model('Bookmark', BookmarkSchema);




function get (opts, fn) {
    "use strict";
    
    var database =  db.model('Bookmark');
    
    database.find(opts.query, opts.fields, {sort: {date: -1}, skip: opts.skip, limit: opts.limit}, function (err, bookmarks) {
    
        var cleanbookmarks = bookmarks.map(function (bookmark) {
            var temparray = {};
 
            temparray.id = bookmark._id.toHexString();
            temparray.tags = bookmark.tags; 
            temparray.date = bookmark.date.getTime();
            temparray.publik = bookmark.publik;
            temparray.starred = bookmark.starred;
            temparray.notes = bookmark.notes; 
            temparray.title = bookmark.title; 
            temparray.url = bookmark.url;

            return temparray;
        });
        
        fn(err, cleanbookmarks);
    });
}






function search (opts, fn) {
    "use strict";
    
    var database =  db.model('Bookmark');
    
    database.find(opts.query, opts.fields, {sort: {date: -1}, skip: opts.skip, limit: opts.limit}).or(opts.find).execFind(function (err, bookmarks) {
    
        var cleanbookmarks = bookmarks.map(function (bookmark) {
            var temparray = {};
 
            temparray.id = bookmark._id.toHexString();
            temparray.tags = bookmark.tags; 
            temparray.date = bookmark.date.getTime();
            temparray.publik = bookmark.publik;
            temparray.starred = bookmark.starred;
            temparray.notes = bookmark.notes; 
            temparray.title = bookmark.title; 
            temparray.url = bookmark.url;

            return temparray;
        });
        
        fn(err, cleanbookmarks);
    });
}






function add (bookmarkObj, fn) {
    "use strict";
    
    var bookmark = new Bookmark(bookmarkObj);

    
    bookmark.save(function (err) {
        if (!err) {
            var temparray = {};
 
            temparray.id = bookmark._id.toHexString();
            temparray.tags = bookmark.tags; 
            temparray.date = bookmark.date.getTime();
            temparray.publik = bookmark.publik;
            temparray.starred = bookmark.starred;
            temparray.notes = bookmark.notes; 
            temparray.title = bookmark.title; 
            temparray.url = bookmark.url;
            
            fn(false,  temparray);
        }
        else {
            fn(true, bookmark);
        }            
    });
}






function update (id, bookmarkObj, fn) {
    "use strict";
    
    var database =  db.model('Bookmark');
    
    database.findById(id, function (err, bookmark) {
        var prop;
        
        if (!(!!err) && bookmark) {
            
            for (prop in bookmarkObj) {
                if (bookmarkObj.hasOwnProperty(prop)) {
                    bookmark[prop] = bookmarkObj[prop];
                }
            }
            
            bookmark.save(function (err) {
                if (!!err) {
                    fn(true, {});
                }
                else {
                    fn(false, bookmark);
                }
            });
        }
        else {
            fn(true, {});
        }
    });    
}



function find (id, fn) {
    "use strict";
    
    var database = db.model('Bookmark');
    
    database.findOne({_id: id}, function (err, bookmark) {
        if (!(!!err) && bookmark) {
            fn(false, bookmark);
        }
        else {
            fn(true, {});
        }
    });    
}




function remove(id, fn) {
    "use strict";
    
    var database =  db.model('Bookmark');
    
    database.findOne({_id: id}, function (err, bookmark) {
        if (!(!!err) && bookmark) {
            
            bookmark.remove(function (err) {
                if (!!err) {
                    fn(true, {});
                }
                else {
                    fn(false, bookmark);
                }
            });
        }
        else {
            fn(true, {});
        }
    });    
}



module.exports.get = get;
module.exports.search = search;
module.exports.add = add;
module.exports.update = update;
module.exports.find = find;
module.exports.remove = remove;


