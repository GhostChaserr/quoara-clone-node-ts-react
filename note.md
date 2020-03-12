



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

