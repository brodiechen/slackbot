My slackbot does three different things:

1. When the bot "hears" the message "hello" or "hi" from the user, it replies the user with a message including a randomly generated greeting and quote.

2. When the bot "hears" the message "class schedules", it asks for the user to input a date (dd/mm/yy) and then checks that date with the stored date values in the object named course. If there is a match, the bot replies the user with a confirmation message ("Yes, today has class!) and relevant class topic on that day. (Note: only six dates and class topics are created in the object named course.)

3. When the bot "hears" the message "members list", it replies the user with a full list of active class members including their email addresses. (Question: I have only managed to output those details on the console, but not on slack.)
