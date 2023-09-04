// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) {
      
      res.redirect('/index'); // User is authenticated, proceed to the next route handler
    } else {
      return next(); // User is not authenticated, redirect to login page
    }
  }

module.exports = isAuthenticated;