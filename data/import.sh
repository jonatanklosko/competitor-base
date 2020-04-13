#!/bin/bash

# This script imports nodes and relationships from TSV files to the local Neo4j database.

cd "$(dirname "$0")"

neo4j_path="../neo4j"
data_path="./import"

$neo4j_path/bin/neo4j-admin import \
  --delimiter=TAB --array-delimiter=";" \
  --nodes=$data_path/country.tsv \
  --nodes=$data_path/event.tsv \
  --nodes=$data_path/person.tsv \
  --nodes=$data_path/competition.tsv \
  --nodes=$data_path/round.tsv \
  --relationships=$data_path/citizen_of.tsv \
  --relationships=$data_path/organized_in.tsv \
  --relationships=$data_path/held_in.tsv \
  --relationships=$data_path/of_event.tsv \
  --relationships=$data_path/result_in.tsv \
  --relationships=$data_path/personal_best.tsv \
  --relationships=$data_path/competed_in.tsv
