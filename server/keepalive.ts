export function setupKeepAlive() {
  // Render spins down free web services after 15 minutes of inactivity.
  // Pinging the service every 14 minutes (840000 milliseconds) keeps it awake.
  const interval = 14 * 60 * 1000;
  const url = process.env.CUSTOM_DOMAIN || process.env.RENDER_EXTERNAL_URL;

  if (!url) {
    console.log("No CUSTOM_DOMAIN or RENDER_EXTERNAL_URL available. Keep-alive cron job not started.");
    return;
  }

  console.log(`Started keep-alive cron job for: ${url}`);
  
  setInterval(async () => {
    try {
      console.log(`[Cron] Pinging ${url} to keep service alive...`);
      const response = await fetch(url);
      if (response.ok) {
        console.log(`[Cron] Ping successful: ${response.status} ${response.statusText}`);
      } else {
        console.error(`[Cron] Ping completed with non-OK status: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("[Cron] Error pinging service:", error);
    }
  }, interval);
}
