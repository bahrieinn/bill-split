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
      'new':'newExpense',
      'delete/:id':'deleteExpense'
    }  
  });

/***************** BACKBONE MODELS **********************/

var Expense = Backbone.Model.extend({
  // backbone knows to append to url depending on HTTP request
  // e.g. PUT will use '/users/id'
  // but  POST will simply use '/users'
  urlRoot: '/expenses'
});

var UserStats = Backbone.Model.extend({
  urlRoot: '/users/stats'
})

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

var UserSummary = Backbone.View.extend({
  el: '.summary',

  render: function(){
    var that = this;
    var stats = new UserStats();
    stats.fetch({
      success: function(stats){
        var template = _.template($('#user-summary').html(), {stats: stats.attributes} )
        that.$el.html(template);
      }
    });
  }
});

var ExpenseList = Backbone.View.extend({
  el: '.page',

  events: {
    'click .delete':'deleteExpense'
  },

  render: function(){
    var that = this;
    var expenses = new Expenses();
    expenses.fetch({
      success: function(expenses){
        var template = _.template($('#bills-table').html(), {expenses: expenses.models})
        that.$el.html(template);
      }
    });
  },

  deleteExpense: function(event){
    var that = this;
    var expense_id = $(event.currentTarget).prev().val();
    this.expense = new Expense({'id': expense_id});
    this.expense.destroy({
      success: function(response, options){
        mainRouter.navigate('delete/:id');
        mainRouter.navigate('', {trigger: true});
      }
    });
    return false;
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
  }

});

/////////// INITIALIZE OBJECTS HERE  //////////////
  var userSummary = new UserSummary();
  var expenseList = new ExpenseList();
  var newExpenseForm = new EditExpense();

  var mainRouter = new Router();

  mainRouter.on('route:home', function(){
    userSummary.render();
    expenseList.render();
  });

  mainRouter.on('route:newExpense', function(){
    newExpenseForm.render();
  });

  Backbone.history.start();
});