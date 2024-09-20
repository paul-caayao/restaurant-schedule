# Restaurant Schedule
## Description
Created a test app that can read .json file that contains restaurant data with their opening hours. Based on the test data provided, I've structured the database schema to have opening and closing time per day. 

# Installation 
Make sure to update the .env values for the DB credentials
Execute script 
"npm install"
"node index.js"

# Usage
GET /api/restaurants

# Sample Data
GET /api/restaurants?dateTime=2024-09-20T12:00:00
This should return:
[
    "Pirata Restaurant",
    "Roganic Causeway Bay",
    "Rex Wine & Grill",
    "Hansik Gooo",
    "Bibi & Baba"
]

GET /api/restaurants?dateTime=2024-09-21T05:30:00
[
    "Pirata Restaurant",
    "Drink & Club"
]

Test Data is being initialized when the app is started.
Parameter is in ISO-8601 DateTime Format.

# Test 
Execute script "npm run test". The test coverage covers the Restaurant Service and the Controller with assertions on expected behavior.


