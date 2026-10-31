const visitorKey = "site_visitor_id";

let lastTrackedUrl = "";
let isTracking = false;

function getVisitorId(): string {
  let id = localStorage.getItem(visitorKey);

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(visitorKey, id);
  }

  return id;
}

async function sendPageView(): Promise<void> {
  const currentUrl =
    window.location.pathname +
    window.location.search +
    window.location.hash;

  if (currentUrl === lastTrackedUrl) {
    return;
  }

  lastTrackedUrl = currentUrl;

  try {
    const response = await fetch("/api/page-view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitorId: getVisitorId(),
        url: currentUrl,
        title: document.title,
        referrer: document.referrer || null,
        timestamp: new Date().toISOString(),
      }),
      keepalive: true,
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("[AccessTracker] Request failed:", response.status, details);
    }
  } catch (error) {
    console.error("[AccessTracker] Network error:", error);
  }
}

export function startAccessTracker(): () => void {
  if (isTracking) {
    return () => {};
  }

  isTracking = true;

  void sendPageView();

  window.addEventListener("app-page-view", sendPageView);

  return () => {
    window.removeEventListener("app-page-view", sendPageView);
    isTracking = false;
  };
}
