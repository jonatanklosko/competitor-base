#!/bin/bash

cd "$(dirname "$0")"

neo4j_path="../neo4j"

time cat load.cypher | $neo4j_path/bin/cypher-shell -u neo4j
