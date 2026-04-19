/** Same shape as `DashboardStats` from `useDashboardData` (kept local to avoid import cycles). */
export type KpiStatsLike = {
  clients: { total: number; active: number };
  reports: { total: number; completed: number; recent: number };
  newsletters: { total: number; published: number; recent: number };
  integration: {
    status: string;
    yuki_connected: boolean;
    email_connected: boolean;
  };
  system_health: { score: number; status: string };
};

/** Mirrors `DashboardStats` / `Activity` from useDashboardData (kept local to avoid import cycles). */
export const SHOWCASE_DASHBOARD_STATS: KpiStatsLike = {
  clients: { total: 12, active: 9 },
  reports: { total: 28, completed: 24, recent: 4 },
  newsletters: { total: 6, published: 4, recent: 2 },
  integration: {
    status: "connected",
    yuki_connected: true,
    email_connected: true,
  },
  system_health: { score: 88, status: "operational" },
};

export const SHOWCASE_RECENT_ACTIVITY = [
  {
    id: "s1",
    type: "report",
    title: "Q4 consolidated report",
    description: "Generated and shared with client",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: "completed",
  },
  {
    id: "s2",
    type: "email",
    title: "Invoice reminder batch",
    description: "Scheduled send",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    status: "pending",
  },
  {
    id: "s3",
    type: "system",
    title: "Yuki sync",
    description: "Balances updated",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    status: "completed",
  },
  {
    id: "s4",
    type: "newsletter",
    title: "Monthly client update",
    description: "Draft ready for review",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    status: "draft",
  },
] as const;

const M = SHOWCASE_DASHBOARD_STATS;

/**
 * When the API returns an empty workspace (all main totals zero), fill KPIs with the same
 * numbers used in showcase mode so Theme 1 cards stay visually populated.
 */
export function withKpiMockFallback(stats: KpiStatsLike): KpiStatsLike {
  const isEmptyWorkspace =
    stats.clients.total === 0 &&
    stats.reports.total === 0 &&
    stats.newsletters.total === 0;

  return {
    ...stats,
    clients: stats.clients.total === 0 ? { ...M.clients } : { ...stats.clients },
    reports: stats.reports.total === 0 ? { ...M.reports } : { ...stats.reports },
    newsletters:
      stats.newsletters.total === 0 ? { ...M.newsletters } : { ...stats.newsletters },
    system_health:
      isEmptyWorkspace && stats.system_health.score === 0
        ? { ...M.system_health }
        : { ...stats.system_health },
    integration: isEmptyWorkspace ? { ...M.integration } : { ...stats.integration },
  };
}
