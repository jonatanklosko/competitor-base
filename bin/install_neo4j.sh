#!/bin/bash

# This script downloads Neo4j and any necessary extensions to the local directory.

cd "$(dirname "$0")"

outfile="../downloads/neo4j.tar.gz"
neo4j_path="../neo4j"

if [ ! -f $outfile ]; then
  wget -O $outfile https://neo4j.com/artifact.php?name=neo4j-community-4.0.3-unix.tar.gz
fi

mkdir $neo4j_path
tar xzvf $outfile -C $neo4j_path --strip-components=1
