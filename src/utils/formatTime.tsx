export function formatTime(min: number): string {
  return min >= 60
    ? `${(min - (min % 60)) / 60}&nbsp;ч ${min % 60}&nbsp;мин`
    : `${min}&nbsp;мин`;
}
