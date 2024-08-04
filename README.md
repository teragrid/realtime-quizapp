## Introduction 
The app is to create a technical solution for a real-time quiz feature for an English learning application. This feature will allow users to answer questions in real-time, compete with others, and see their scores updated live on a leaderboard.

# Implement one of the core components below using the technologies that you are comfortable with. The rest of the system can be mocked using mock services or data.
Requirements for the Implemented Component:

Real-time Quiz Participation: Users should be able to join a quiz session using a unique quiz ID.
Real-time Score Updates: Users' scores should be updated in real-time as they submit answers.
Real-time Leaderboard: A leaderboard should display the current standings of all participants in real-time.

# Build For the Future:

Scalability: Design and implement your component with scalability in mind. Consider how the system would handle a large number of users or quiz sessions. Discuss any trade-offs you made in your design and implementation.
Performance: Your component should perform well even under heavy load. Consider how you can optimize your code and your use of resources to ensure high performance.
Reliability: Your component should be reliable and handle errors gracefully. Consider how you can make your component resilient to failures.
Maintainability: Your code should be clean, well-organized, and easy to maintain. Consider how you can make it easy for other developers to understand and modify your code.
Monitoring and Observability: Discuss how you would monitor the performance of your component and diagnose issues. Consider how you can make your component observable.

## Install libraries
 Run scripts in root folder
- cp .env.example .env
- yarn 
- yarn start

## Migrate database
- yarn db:migrate
- use https://sequelize.org/docs/v6/other-topics/migrations/

## Postgree 
- use GUI POSTGRE https://www.beekeeperstudio.io/
- change value in file .env 

## JWT 
- Go to https://jwt.io/ copy SECRET_KEY to .env 