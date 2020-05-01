#!/bin/bash

# This script downloads Neo4j and any necessary extensions to the local directory.

cd "$(dirname "$0")"

outfile="../downloads/neo4j.tar.gz"
gds_outfile="../downloads/neo4j-gds.zip"
neo4j_path="../neo4j"

if [ ! -f $outfile ]; then
  wget -O $outfile https://neo4j.com/artifact.php?name=neo4j-community-4.0.3-unix.tar.gz
fi

if [ ! -f $gds_outfile ]; then
  wget -O $gds_outfile https://s3-eu-west-1.amazonaws.com/com.neo4j.graphalgorithms.dist/graph-data-science/neo4j-graph-data-science-1.2.0-preview-standalone.zip
fi

# Unpack neo4j to a local directory.
mkdir $neo4j_path
tar xzvf $outfile -C $neo4j_path --strip-components=1

# Unpack Graph Data Science library into plugins.
unzip $gds_outfile -d $neo4j_path/plugins

echo -e "\ndbms.security.procedures.unrestricted=gds.*" >> $neo4j_path/conf/neo4j.conf

# Set the password of 'neo4j' user to 'password'.
$neo4j_path/bin/neo4j-admin set-initial-password password
