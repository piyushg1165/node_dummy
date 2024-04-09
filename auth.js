const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person.js');

passport.use(new LocalStrategy(async (USERNAME, PASSWORD, done) => {
    try {
        // console.log("Received credentials" ,USERNAME, PASSWORD);
        const user = await Person.findOne({ username: USERNAME });
        if(!user) done(null, false, {message: "Incorrect username"});

        const isPasswordMatch = user.password === PASSWORD ? true : false;
        if(isPasswordMatch) {
            return done(null, user);
        }else {
            return done(null, false, {message: "Incorrect password"});
        }
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport;