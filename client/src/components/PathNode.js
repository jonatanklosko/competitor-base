import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, ButtonBase } from '@material-ui/core';
import { nodeUrl } from '../lib/utils';

function PathNode({ node }) {
  const isCompetition = node.labels.includes('Competition');

  return (
    <ButtonBase component={RouterLink} to={nodeUrl(node)}>
      <Box
        p={2}
        boxShadow={2}
        bgcolor={isCompetition ? 'text.secondary' : 'text.primary'}
        color="white"
        borderRadius={8}
      >
        <Typography variant="subtitle1">{node.properties.name}</Typography>
      </Box>
    </ButtonBase>
  );
}

export default PathNode;
