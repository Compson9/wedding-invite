export type CountdownTime = {
  days: number;
  hours: number;
  mins: number;
  secs: number;
};

export function computeCountdown(target: Date): CountdownTime {
  const diff = Math.max(0, target.getTime() - Date.now());

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}
