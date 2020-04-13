#!/bin/bash

# This script generates TSV files based on a local MySQL WCA databse.
# Those TSV files are then used to import the data to Neo4j.
# Each generated file corresopnds to nodes or relations of the given type.

cd "$(dirname "$0")"

if [ $# -eq 0 ]; then
  echo "Usage: $0 <local-mysql-wca-db-name>" >> /dev/stderr
  exit 1
fi

mysql_dbname=$1

output_dir="import"
mkdir -p $output_dir

echo "Running SQL setup."
mysql $mysql_dbname < sql/setup.sql

echo "Generating TSV files:"
for query_file in sql/{nodes,relations}/*.sql; do
  filename=$(basename $query_file '.sql')
  outfile="$output_dir/$filename.tsv"
  mysql $mysql_dbname --batch < $query_file > $outfile
  echo "* $outfile"
done
