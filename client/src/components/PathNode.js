import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, ButtonBase } from '@material-ui/core';

function PathNode({ node }) {
  const isCompetition = node.labels.includes('Competition');
  const url = isCompetition
    ? `/competitions/${node.properties.wcaId}`
    : `/persons/${node.properties.wcaId}`;

  return (
    <ButtonBase component={RouterLink} to={url}>
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
