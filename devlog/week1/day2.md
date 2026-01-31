# Devlog — Day2
- Today i have started by learning docker compose. Postgresql image was pulled from docker hub and was added in the compose.yml file in database folder
- Inorder to run the docker easily, i added a command in package.json,Faced an issue where Docker could not find the compose file.
- '-f' needs to be added to the commands to specify the path to the compose file.
- i follow the method of adding it into package.json becuase the original commands could be long and difficult to memorize,also these original commands could work only where it is stored. I want to retrieve it from the root folder itself, so it is best to add a command in package.json

### 1. Zod and drizzle orm
- Then i understood more about zod and drizzle orm
- **zod** is mostly used for runtime data validation(runtime data usually means data that comes from outside like a http request and not found in the code.For eg: a data that comes from an api or from the client side) and parsing, so it doesnt require a database to work. It just checks whether the data is valid or is shaped correctly at runtime
- typescript doesnt exist in runtime.it only exist in compile time. So whenever a runtime data comes, zod is the one that checks or  validates the data
- Then i added **drizzle orm** to it, which is responsible for data migration,schema creation and generation
- i learned to set up drizzle orm from the documentation rather than using any sort of help from an ai

