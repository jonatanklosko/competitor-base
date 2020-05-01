# competitor-base

A project for DB classes at AGH UST, Poland.

The Polish documentation is available [here](docs/docs.md).

Developed by:
- Jonatan Kłosko, [@jonatanklosko](https://github.com/jonatanklosko)
- Oliwia Masiarek, [@omasiarek](https://github.com/omasiarek)

## Setup

**Database**

Run the setup script and follow the instructions.

```
bin/setup_db.sh
```

The script downloads and unpacks Neo4j 4.0 along with Data Science Library
into a local directory, so it doesn't interfere with any global installation.
On top of that it also imports all the necessary data to the local database.
The process can be reverted any time by removing the `neo4j` directory.

The script also starts the server, whereas later you can manage its state by running:

```
neo4j/bin/neo4j start|stop|status
```

The Neo4j interface can be accessed at [http://localhost:7474](http://localhost:7474).

*Note: the initial credentials are `user: neo4j, password: password`.*


**Web client**

Please see the correspondig [README](client/README.md).
