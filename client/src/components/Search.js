import React, { Fragment, useState, useEffect } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { CircularProgress, TextField } from '@material-ui/core';
import { runQuery } from '../lib/database';

const queryForLabel = (label) => `
  CALL db.index.fulltext.queryNodes("search", $search) YIELD node
  ${label ? `WHERE '${label}' IN labels(node)` : ''}
  RETURN node AS person
  LIMIT 10
`;

function Search({ onChange, debounceMs = 150, label = null }) {
  const [loading, setLoading] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), debounceMs);
    return () => clearTimeout(timeout);
  }, [search, debounceMs]);

  useEffect(() => {
    if (debouncedSearch === '') {
      setNodes([]);
      setLoading(false);
    } else {
      setLoading(true);
      runQuery(queryForLabel(label), { search: debouncedSearch })
        .then((result) => setNodes(result.map((record) => record.person)))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [debouncedSearch, label]);

  return (
    <Autocomplete
      autoHighlight
      onChange={(_event, node) => onChange(node)}
      options={nodes}
      getOptionLabel={(node) => node.properties.name}
      onInputChange={(_event, value, reason) => {
        if (reason === 'input') {
          setLoading(true);
          setSearch(value);
        }
      }}
      getOptionSelected={(node, selectedNode) =>
        node.identity.equals(selectedNode.identity)
      }
      /* The database already handles filtering. */
      filterOptions={(options) => options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default Search;
