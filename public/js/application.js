$(document).ready(function() {


/***************** BACKBONE ROUTERS *********************/

  var Router = Backbone.Router.extend({
    routes: {
      '':'home',
      'new':'newExpense'
    }  
  });

/***************** BACKBONE MODELS **********************/

var Expense = Backbone.Model.extend({
  // backbone knows to append to url depending on HTTP request
  // e.g. PUT will use '/users/id'
  // but  POST will simply use '/users'
  urlRoot: '/expenses'
});

/***************** BACKBONE COLLECTIONS *****************/

var Expenses = Backbone.Collection.extend({
  // Fetch call will look to get '/expenses' action in Sinatra
  url: '/expenses'
});

var Group = Backbone.Collection.extend({
  url: '/group'
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

var EditExpense = Backbone.View.extend({
  el: '.page',
  
  events: {
    'submit .edit-expense-form':'saveExpense'
  },

  render: function(){
    var group = new Group();
    group.fetch({
      success: function(group){
        console.log(group);
      }
    })
    var template = _.template($('#edit-expense-template').html(), {expense:null} )
    this.$el.prepend(template);
  },

  saveExpense: function(event){
    console.log("Save expense clicked");
    return false;
  },

  deleteExpense: function(event){
    console.log("Delete expense clicked");
    return false;
  } 
});

/////////// INITIALIZE OBJECTS HERE  //////////////
  var expenseList = new ExpenseList();
  var newExpenseForm = new EditExpense();

  var mainRouter = new Router();

  mainRouter.on('route:home', function(){
    expenseList.render();
  });

  mainRouter.on('route:newExpense', function(){
    newExpenseForm.render();
  });


  Backbone.history.start();
});