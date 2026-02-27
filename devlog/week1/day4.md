# Devlog — Day4
There was difficulty in setting up psql. i wanted to use the values in docker container for setting up psql.thats when i came up with these terms
1. unix domain socket
2. tcp

eventhough i was familiar with tcp, i wasnt sure on what **unix** was and what it does.
basically you can connect psql through both ways. unix is one of those methods
- **unix** is a method for processes to communicate on a single machine without any network overheads, so it doesnt require any ip address. it communicates through socket file(sockets are filesystem objects). these are stored in memory.

since docker containers dont share unix sockets with host by default(because docker containers isolate filesystems), i was facing this error:
```bash 
sudo -u postgres psql  -p 5433
psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5433" failed: No such file or directory
Is the server running locally and accepting connections on that socket?

```

so i used tcp connection to connect with psql

this is the command to run psql:
```bash
sudo -u postgres psql -h localhost -d app_db -p 5433

```