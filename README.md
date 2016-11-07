# Sytac Play

[![Build Status](https://semaphoreci.com/api/v1/industrial/play/branches/master/shields_badge.svg)](https://semaphoreci.com/industrial/play)

Technology quiz app!
## System Requirements

## Installation
The play project consists of two elements, the Node.js Application
Server and the MongoDB Database. The URL of the mongodb service can be
configured in `src/server/datasources.json`.

```
git clone git@github.com:sytac/play.git
npm install
```

### Development
```
npm run develop
```

### Production
```
npm run production
```

## Results
You can get the results as a CSV file like this (on the server running the app):
```
cd build
./bin/quizEntries
```

There is now a quiz-entries.csv file in the current directory.
