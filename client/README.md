# Web client

This is a React application talking directly to the Neo4j database
using the official [JavaScript driver](https://neo4j.com/docs/api/javascript-driver/current).

## Motivation

It's often necessary to build an interactive interface layer over the underlying database,
just so that less technical staff can access the data easily. Web technology stack makes it
easy to create such an interface and visualizations, but usually involves talking to the
database through a dedicated service (i.e. server).

The Neo4j's native network protocol *Bolt* operates over a TPC connection or WebSockets
and thus can be talked to directly from the web browser, which may come in handy in some cases.
This application demonstrates such usage.

## Development

Node.js is rquired.

```
npm install
npm start
```

Also makes sure to start the Neo4j server.
