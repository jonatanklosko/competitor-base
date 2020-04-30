export const SKIPPED_VALUE = 0;
export const DNF_VALUE = -1;
export const DNS_VALUE = -2;

function centisecondsToClockFormat(centiseconds) {
  if (!Number.isFinite(centiseconds)) return null;
  if (centiseconds === SKIPPED_VALUE) return '';
  if (centiseconds === DNF_VALUE) return 'DNF';
  if (centiseconds === DNS_VALUE) return 'DNS';
  return new Date(centiseconds * 10)
    .toISOString()
    .substr(11, 11)
    .replace(/^[0:]*(?!\.)/g, '');
}

function decodeMbldAttempt(value) {
  if (value <= 0) return { solved: 0, attempted: 0, centiseconds: value };
  const missed = value % 100;
  const seconds = Math.floor(value / 100) % 1e5;
  const points = 99 - (Math.floor(value / 1e7) % 100);
  const solved = points + missed;
  const attempted = solved + missed;
  const centiseconds = seconds === 99999 ? null : seconds * 100;
  return { solved, attempted, centiseconds };
}

function formatMbldAttempt(attempt) {
  const { solved, attempted, centiseconds } = decodeMbldAttempt(attempt);
  const clockFormat = centisecondsToClockFormat(centiseconds);
  return `${solved}/${attempted} ${clockFormat}`;
}

export function formatAttemptResult(attemptResult, eventId) {
  if (attemptResult === SKIPPED_VALUE) return '';
  if (attemptResult === DNF_VALUE) return 'DNF';
  if (attemptResult === DNS_VALUE) return 'DNS';
  if (eventId === '333fm') {
    const isAverage = attemptResult > 100;
    return isAverage
      ? (attemptResult / 100).toFixed(2)
      : attemptResult.toString();
  }
  if (eventId === '333mbf') return formatMbldAttempt(attemptResult);
  return centisecondsToClockFormat(attemptResult);
}
