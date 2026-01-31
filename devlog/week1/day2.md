**Devlog — Day2**
- Today i have started by learning docker compose. Postgresql image was pulled from docker hub and was added in the compose.yml file in database folder
- Inorder to run the docker easily, i added a command in package.json, But i was faced with an issue where i was not able to add the specific location of compose file to it
- '-f' needs to be added to the commands for the location to be made seen
- i follow the method of adding it into package.json becuase the original commands could be long and difficult to memorize,also these original commands could work only where it is stored. I want to retrieve it from the root folder itself, so it is best to add a command in package.json

### Zod and drizzle orm
- Then i understood more about zod and drizzle orm
- zod is mostly used for runtime data validation(runtime data usually means data that comes from outside like a http request and not found in the code.For eg: a data that comes from an api or from the client side) and parsing, so it doesnt require a database to work. It just checks whether the data is valid or is shaped correctly at runtime
- typescript doesnt exist in runtime.it only exist in compile time. So whenever a runtime data comes, zod is the one that checks or  validates the data

