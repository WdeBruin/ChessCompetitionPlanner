# ChessCompetitionPlanner
This application was built for Schaakclub Dordrecht, to manage the youth competition.
The idea is that on club evenings we can have a check-in of players, after which the round schedule is generated. Results are immediately processed.
All should work on a mobile phone.
It uses Angular 6.0 and ngrx/store. 
The app is going to store data in a database through a CRUD REST API.

At the moment this is work in progress. Not ready for use. Feel free to use this code.

## Development server (frontend)
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build (frontend)
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## API
The api is an example in .NET Core 2.1. Which allows for very quick scaffolding of CRUD controllers. And generation of database tables with EF. In future we are probably going to run a low hostingcost PHP API.

## DB
Database is just SQLite file
