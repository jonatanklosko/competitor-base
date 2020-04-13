#!/bin/bash

cd "$(dirname "$0")"

outfile="../downloads/neo4j.tar.gz"
neo4j_path="../neo4j"

wget -O $outfile https://neo4j.com/artifact.php?name=neo4j-community-4.0.3-unix.tar.gz

mkdir $neo4j_path
tar xzvf $outfile -C $neo4j_path --strip-components=1

$neo4j_path/bin/neo4j start
