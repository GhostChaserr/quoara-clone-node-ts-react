



# APP TIMELINE
[x] Server setup
  [X] Models
    [x] User model
    [x] Shared models
    [x] Question model
    [x] Space model
	[] Routes
		[X] Auth
			[X] Register user
			[X] Login user
			[X] Query logged in user
			[X] Query user questions
		[] Question
			[x] Create question
			[x] Query questions
			[x] Vote question
			[x] Answer question
			[x] Trash question
		[] Space
			[] Register space
			[] Query space
			[] Post space question
		[] Error handling
			[] Custom error handling for API endpoints
			
[X] Client setup
	[] Routes
		[x] Login route
		[x] Register route
		[x] Quetions route
		[x] Spaces route
		[x] Space detail view
		[x] Feed route
	[] Redux
		[x] Auth state
		[x] Questions state
		[x] Spaces state
		[x] Space questions state
		[x] Types
	[] Forms
		[x] Register form
		[x] Login form
		[x] Post question form
		[x]	Post answer form
	[] Actions
		[x] Upvote question
		[x] Post question
		[x] Join space
		[x] Leave space
		[x] Upvote space question
		[x] Jon leave space
		[x] Post space queston
	[] Queries
		[x] Query questions
		[x] Query workplaces
		[x] Query user posted questions
		[x] Query user created spaces
	[] Swagger interation
	[] Side quests
		[] Testing Login route
		[] Testing Register route
		[x] Prevent user to upvote question twice

	
# Endpoints - AUTH

> POST - http://localhost:3000/api/v1/register
{
	"name":"george",
	"lastName":"batsiashvili",
	"password":"g2eorge123",
	"email":"nuca_kaxelo@gmail.com"
}

> POST - http://localhost:3000/api/v1/authenticate
{
	"password":"g2eorge123",
	"email":"nuca_kaxelo@gmail.com"
}

> GET - http://localhost:3000/api/v1/users
{

}

> GET - http://localhost:3000/api/v1/me/questions
{

}

> GET - http://localhost:3000/api/v1/me
{

}

# Endpoints - QUESTION

> POST - http://localhost:3000/api/v1/questions 
{
	"tags": ["enterprenruaship", "food"],
	"question":"ra aris sauketso gza imistvis"
}

> GET - http://localhost:3000/api/v1/questions
{

}

> PUT - http://localhost:3000/api/v1/questions/5e6a1ef127e409248851f8a3?action=answer-question
{
	answer: "some answer"
}

> PUT - http://localhost:3000/api/v1/questions/5e6a1ef127e409248851f8a3?action=upvote-question
{

}

> PUT - http://localhost:3000/api/v1/questions/5e6a2f44f470552670a9115b?action=trash-question


# ENDPOINTS - SPACE

> POST - http://localhost:3000/api/v1/spaces
{
	"title":"sivrce1",
	"description": "sivrce2",
	"tags": ["sivrce1"]
}

> GET - http://localhost:3000/api/v1/spaces
{
	
}

> POST - http://localhost:4000/api/v1/spaces/5e6a3b845089ab2748100744?action=join-space
{

}

> POST - http://localhost:4000/api/v1/spaces/5e6a3b845089ab2748100744?action=leave-space
{

}