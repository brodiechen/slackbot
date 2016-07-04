/**
 * Your slackbot token is available as the global variable:

process.env.SLACKBOT_TOKEN

 * When deployed to now.sh, the URL of your application is available as the
 * global variable:

process.env.NOW_URL

 * The URL is useful for advanced use cases such as setting up an Outgoing
 * webhook:
 * https://github.com/howdyai/botkit/blob/master/readme-slack.md#outgoing-webhooks-and-slash-commands
 *
 */
var Botkit = require('botkit');
var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
var bot = controller.spawn({
  token: process.env.SLACKBOT_TOKEN
})
bot.startRTM(function(error, whichBot, payload) {
  if (error) {
    throw new Error('Could not connect to Slack');
  }
});

//-----------------------------------------------------------------------------
controller.hears(['hello','hi'],['direct_message','direct_mention','mention'],function(bot,message) {

	var greetings = [
		"Hey! How are things with you?",
		"Hey! How's it going?",
		"How's life been trating you?",
		"What's cracking?",
		"What's good?",
		"What's happening?"
		];

	var quotes = [
			'"The journey of a thousand miles begins with one step." - Lao Tzu',
			'"Dream big and dare to fail." - Norman Vaughan',
			'"What you do speaks so loudly that I cannot hear what you say." - Ralph Waldo', 
			'"You must be the change you wish to see in the world." - Gandhi',
			'"Keep your face to the sunshine and you can never see the shadow." - Helen Keller'
			];

    // pick a random item from an array
	function pickRandomOutput(input) {
		return input[Math.floor(Math.random() * input.length)];
	}

	var randomGreeting = pickRandomOutput(greetings);
	var randomQuote = pickRandomOutput(quotes);
	var randomGreetingQuote = randomGreeting + "\nQuote of Today: " + randomQuote;

    bot.reply(message, randomGreetingQuote);
});


//-----------------------------------------------------------------------------
controller.hears('class schedules',['direct_message','direct_mention','mention'],function(bot,message) {

    bot.startConversation(message,function(err,convo) {

    	convo.ask('Please enter the date so that I can check if you have class on that day. (dd/mm/yy)', function(response,convo) {

		var course = {
			name: "JS1SYD",
			instructor: "Jess",
			"teaching assistant": "Amy",
			"lesson date": ["01/07/2016", "03/07/2016", "05/07/2016", "07/07/2016", "09/07/2016", "11/07/2016"],
			curriculum:["Installfest", "JS on the Command Line", "Data Types", "Conditionals and Loops", "Functions and Scope", "Object and JSON"]
		};

		// date (dd/mm/yy) input from the user 
		var userInput = response.text; 

		// check to see if having class at dates
		for (var i = 0; i < course.curriculum.length; i++) {
			if (course["lesson date"][i] === userInput) {
				var classTopic = "Today's topic: " + course.curriculum[course["lesson date"].indexOf(userInput)];
				var classInfo = "Yes, today has class! " + classTopic;
				
				// finish checking all dates
			} else if (i === course.curriculum.length - 1 ) {
				var noClass = "No class today!"
			}
		}

      	convo.say('Please wait, checking if you have class on : ' + response.text + " ...\n");
      	convo.say(classInfo || noClass);
      	convo.next();

    	});

  	})

});


//-----------------------------------------------------------------------------

controller.hears(['members list'],['direct_message','direct_mention','mention'],function(bot,message) {

	bot.api.users.list({},function(error,response) {
		
		// retrieve user names and emails from the user list
		for (i = 0; i < response.members.length; i++) {
			var realName = response.members[i].profile.real_name;
			var email = response.members[i].profile.email;

			// exclude unactive users such as other bots
			if (email != undefined || email != null) {
				var individualProfile = "Name: " + realName + " \nE-mail: " + email;
				console.log(individualProfile);
				bot.reply(message, individualProfile); 
			}
  		}

  	})
     
});






