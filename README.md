# Converter Numbers to Roman Numerals

This project is an implementation of a simple service to convert
numbers 0 -> 100 to **Roman numeral** transcription.

The implementation of this project is based exclusively on nodejs.
Developed from scrach, without any external modules/lib
excepts **devDependencies** that are used to improve code quality.

## Setup

To install and run application, please follow this steps:

```sh
# 1) Clone this Git repository on your filesystem
git clone https://github.com/aghou/romannumerals.git

# 2) Go to project directory
cd romannumerals/

# 3) Install project dependencies
npm install

# 4) Start the project
npm start

# The server will start and listen on your localhost at port 8084

# 5) Start use roman numerals converter Service API with curl
curl http://localhost:8084/convert?n=9

# 6) Open your browser and go to http://localhost:8084 to use service with frontend interface

```

## Run tests, coverage

The app is implemented with several tests suite to enforce quality and prevent regression

```sh
# Run tests
npm test

# OR

npx jest

# For more information about tests
npx jest --verbose

# For coverage
npx jest --coverage

```
