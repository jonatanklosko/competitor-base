export function nodeUrl(node) {
  if (node.labels.includes('Competition')) {
    return `/competitions/${node.properties.wcaId}`;
  }
  if (node.labels.includes('Person')) {
    return `/persons/${node.properties.wcaId}`;
  }
  throw new Error('The given node has no corresponding page.');
}

export function unique(array) {
  return [...new Set(array)];
}

export function range(from, to) {
  return Array.from({ length: to - from + 1 }).map((_, i) => from + i);
}
