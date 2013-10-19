$(document).ready(function() {


/***************** BACKBONE ROUTERS *********************/

  var Router = Backbone.Router.extend({
    routes: {
      '':'home'
    }  
  });



/***************** BACKBONE MODELS **********************/


/***************** BACKBONE COLLECTIONS *****************/


/***************** BACKBONE VIEWS ***********************/


/////////// INITIALIZE OBJECTS HERE  //////////////

  var mainRouter = new Router();

  mainRouter.on('route:home', function(){
    console.log("Landed on home page");
  });

  Backbone.history.start();
});