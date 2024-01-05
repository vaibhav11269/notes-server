# Project Title

Backend Challenge Assessment for Speer

## Introduction

In this repository I've completed the backend challenge using Node.js,Express.js,PostgreSQL and other libraries.

## Features

I've added the signup and login feature using email as a unique identifier.
I've also added feature to get all notes,get notes by id,create/update/delete a note
I'v also added a search feature for notes based on certain keywords i.e. tags associated with each task.
Also the users can share a particular note with other users.


### Prerequisites

Libraries, or tools that are needed to install beforehand.

- express,cors,dotenv for setting up the basic project structure
- express-rate-limiter for adding a rate limit to the apis as a layer of protection from overburdening them
- mocha,chai and supertest for setting up unit and integration tests.
- I've hosted the db on vercel.

### Installation

Step-by-step guide on how to install and configure your project.

```bash
# Example installation steps
git clone https://github.com/vaibhav11269/notes-server.git
cd yourproject
npm install

#for running the test on local
npm start

#for running the tests on local
npm test

