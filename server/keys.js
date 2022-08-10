// mongoose="mongodb+srv://sougata:project@123@contactmanager.utz7mbi.mongodb.net/test"

module.exports={
    MONGOURI:"mongodb+srv://sougata:project%40123@contactmanager.utz7mbi.mongodb.net/test"
};

/*The following characters must be converted using 
percent encoding
 if included in a username or password:

: / ? # [ ] @

For example, if your password in plain-text is p@ssw0rd'9'!, you need to encode your password as:

p%40ssw0rd%279%27%21*/