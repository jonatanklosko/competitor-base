export function nodeUrl(node) {
  if (node.labels.includes('Competition')) {
    return `/competitions/${node.properties.wcaId}`;
  }
  if (node.labels.includes('Person')) {
    return `/persons/${node.properties.wcaId}`;
  }
  throw new Error('The given node has no corresponding page.');
}
