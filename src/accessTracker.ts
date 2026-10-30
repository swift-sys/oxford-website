const visitorKey = "site_visitor_id";

function getVisitorId(): string {
  let id = localStorage.getItem(visitorKey);

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(visitorKey, id);
  }

  return id;
}

async function sendPageView(): Promise<void> {
  try {
    await fetch("/api/page-view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitorId: getVisitorId(),
        url: window.location.pathname,
        title: document.title,
        referrer: document.referrer || null,
        timestamp: new Date().toISOString(),
      }),
      keepalive: true,
    });
  } catch {}
}

export function startAccessTracker(): () => void {
  void sendPageView();

  const handlePageView = (): void => {
    void sendPageView();
  };

  window.addEventListener("app-page-view", handlePageView);

  return () => {
    window.removeEventListener("app-page-view", handlePageView);
  };
}
