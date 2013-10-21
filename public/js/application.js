$(document).ready(function() {

  // Snippet taken from StackOverflow to serialize form data into JSON objects
  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
  };  

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
    var that = this;
    var group = new Group();
    group.fetch({
      success: function(group){
        var template = _.template($('#edit-expense-template').html(), {expense:null, members: group.models} )
        that.$el.prepend(template);
      }
    });

  },

  saveExpense: function(event){
    var expenseDetails = $(event.currentTarget).serializeObject();
    console.log(expenseDetails);
    var expense = new Expense();
    expense.save(expenseDetails, {
      success: function(expense){
        mainRouter.navigate('', {trigger: true});
      }
    });
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