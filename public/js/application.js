$(document).ready(function() {


/***************** BACKBONE ROUTERS *********************/

  var Router = Backbone.Router.extend({
    routes: {
      '':'home'
    }  
  });



/***************** BACKBONE MODELS **********************/


/***************** BACKBONE COLLECTIONS *****************/

var Expenses = Backbone.Collection.extend({
  // Fetch call will look to get '/expenses' action in Sinatra
  url: '/expenses'
});

/***************** BACKBONE VIEWS ***********************/

//Change templating from ERB style <% %> to mustache style {{ }}
_.templateSettings = {
  interpolate: /\{\{\=(.+?)\}\}/g,
  evaluate: /\{\{(.+?)\}\}/g
};

var ExpenseList = Backbone.View.extend({
  el: '.page',

  render: function(){
    var that = this;
    var expenses = new Expenses();
    expenses.fetch({
      success: function(expenses){
        var template = _.template($('#bills-table').html(), {expenses: expenses.models})
        that.$el.html(template);
      }
    });
  }
});

/////////// INITIALIZE OBJECTS HERE  //////////////
  var expenseList = new ExpenseList();

  var mainRouter = new Router();

  mainRouter.on('route:home', function(){
    expenseList.render();
  });


  Backbone.history.start();
});