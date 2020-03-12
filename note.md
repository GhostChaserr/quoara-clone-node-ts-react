



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