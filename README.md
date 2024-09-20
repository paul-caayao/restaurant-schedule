# Restaurant Schedule
## Description
Created a test app that can read .json file that contains restaurant data with their opening hours. Data is being saved into MongoDB instance


# Installation 
Make sure to update the .env values for the DB credentials
Execute script "node index.js"

# Usage
GET /api/restaurants

# Sample Data
GET /api/restaurants?dateTime=2024-09-20T12:00:00

Test Data is being initialized when the request is sent.
Parameter is in ISO-8601 DateTime Format

# Test 
Execute script "npm run test". The test coverage covers the Restaurant Service and the Controller with assertions on expected behavior.
