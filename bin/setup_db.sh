#!/bin/bash

# This script is meant to make it easy to setup a local Neo4j database
# and fill it with pre-computed data.

cd "$(dirname "$0")"

data_archive="../downloads/wca-neo4j-import.tar.gz"

if [ ! -f $data_archive ]; then
  echo "Please download https://drive.google.com/file/d/1Asy6vatrbrLUPkCMStP5skyNFKg1EK1O/view?usp=sharing to the downloads directory and run this script again."
else
  echo "Unpacking the TSV data into data/import."
  tar xzvf $data_archive -C ../data
  echo "Downloading Neo4j."
  ./install_neo4j.sh
  echo "Importing data to the local database."
  ../data/import.sh

  echo -e "\nFinished"
  echo "* To start the database run: neo4j/bin/neo4j start"
  echo "* To stop the database run: neo4j/bin/neo4j stop"
  echo "* To open the interactive Neo4j tool navigate to http://localhost:7474"
  echo "* To execute queries you can use Cypher shell directly: neo4j/bin/cypher-shell"
fi
