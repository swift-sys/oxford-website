import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  Check,
  CheckCircle2,
  CircleHelp,
  Globe,
  LoaderCircle,
  LockKeyhole,
  Plus,
  RefreshCw,
  Search,
  Shield,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

import "./admin.css";

type ApiResponse = {
  ips?: string[];
  success?: boolean;
  error?: string;
};

export default function Admin() {
  const [ips, setIps] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [newIp, setNewIp] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [removingIp, setRemovingIp] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [confirmIp, setConfirmIp] = useState<string | null>(null);

  const request = useCallback(
    async (
      method: "GET" | "POST" | "DELETE",
      ip?: string,
    ): Promise<ApiResponse> => {
      const response = await fetch("/api/admin/allowlist", {
        method,
        credentials: "same-origin",
        headers:
          method === "GET"
            ? { Accept: "application/json" }
            : {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
        ...(ip ? { body: JSON.stringify({ ip }) } : {}),
      });

      const data = (await response.json().catch(() => ({}))) as ApiResponse;

      if (!response.ok) {
        throw new Error(
          data.error || `Request failed (${response.status})`,
        );
      }

      return data;
    },
    [],
  );

  const loadIps = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await request("GET");
      setIps(Array.isArray(data.ips) ? data.ips : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load the allowlist",
      );
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    void loadIps();
  }, [loadIps]);

  const filteredIps = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return ips;

    return ips.filter((ip) => ip.toLowerCase().includes(query));
  }, [ips, search]);

  async function addIp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const ip = newIp.trim();

    if (!ip) {
      setError("Enter an IP address first.");
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    try {
      await request("POST", ip);
      setNewIp("");
      setNotice(`Added ${ip} to the allowlist.`);
      await loadIps();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to add the IP address",
      );
    } finally {
      setSaving(false);
    }
  }

  async function removeIp(ip: string) {
    setRemovingIp(ip);
    setError("");
    setNotice("");

    try {
      await request("DELETE", ip);
      setNotice(`Removed ${ip} from the allowlist.`);
      setConfirmIp(null);
      await loadIps();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to remove the IP address",
      );
    } finally {
      setRemovingIp(null);
    }
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <a className="admin-brand" href="/" aria-label="Central London home">
          <span className="admin-brand-icon">
            <ShieldCheck size={22} />
          </span>

          <span>
            <strong>Central London</strong>
            <small>Security Console</small>
          </span>
        </a>

        <div className="admin-auth-status">
          <span className="status-dot" />
          <LockKeyhole size={15} />
          <span>Protected session</span>
        </div>
      </header>

      <div className="admin-content">
        <section className="admin-heading">
          <div>
            <div className="admin-eyebrow">
              <Shield size={14} />
              ACCESS CONTROL
            </div>

            <h1>Security dashboard</h1>

            <p>
              Manage trusted IP addresses and VPN access exceptions.
            </p>
          </div>

          <button
            type="button"
            className="admin-button admin-button-secondary"
            onClick={() => void loadIps()}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle size={17} className="admin-spin" />
            ) : (
              <RefreshCw size={17} />
            )}
            Refresh
          </button>
        </section>

        {error && (
          <div className="admin-alert admin-alert-error" role="alert">
            <AlertCircle size={19} />
            <span>{error}</span>
            <button
              type="button"
              aria-label="Dismiss error"
              onClick={() => setError("")}
            >
              <X size={17} />
            </button>
          </div>
        )}

        {notice && (
          <div className="admin-alert admin-alert-success" role="status">
            <CheckCircle2 size={19} />
            <span>{notice}</span>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setNotice("")}
            >
              <X size={17} />
            </button>
          </div>
        )}

        <section className="admin-stats">
          <article className="admin-stat-card">
            <div className="admin-stat-top">
              <span>Total allowlisted IPs</span>
              <Globe size={19} />
            </div>

            <strong>{loading ? "—" : ips.length}</strong>

            <small>Persisted in Redis</small>
          </article>

          <article className="admin-stat-card">
            <div className="admin-stat-top">
              <span>VPN protection</span>
              <ShieldCheck size={19} />
            </div>

            <strong className="admin-stat-active">Enabled*</strong>

            <small>Depends on deployed server checks</small>
          </article>

          <article className="admin-stat-card">
            <div className="admin-stat-top">
              <span>Admin authentication</span>
              <LockKeyhole size={19} />
            </div>

            <strong className="admin-stat-active">Access</strong>

            <small>Cloudflare Access JWT required</small>
          </article>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div className="admin-panel-title">
              <div className="admin-panel-icon">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h2>IP allowlist</h2>
                <p>These addresses bypass the VPN restriction.</p>
              </div>
            </div>

            <span className="admin-count">{ips.length} addresses</span>
          </div>

          <form className="admin-add-form" onSubmit={addIp}>
            <label className="admin-input-wrap">
              <Globe size={18} />
              <input
                type="text"
                inputMode="text"
                autoComplete="off"
                spellCheck={false}
                value={newIp}
                onChange={(event) => setNewIp(event.target.value)}
                placeholder="Enter an IPv4 or IPv6 address"
                aria-label="IP address to allowlist"
                required
              />
            </label>

            <button
              type="submit"
              className="admin-button admin-button-primary"
              disabled={saving || !newIp.trim()}
            >
              {saving ? (
                <LoaderCircle size={17} className="admin-spin" />
              ) : (
                <Plus size={18} />
              )}
              Add address
            </button>
          </form>

          <div className="admin-list-toolbar">
            <label className="admin-search">
              <Search size={17} />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search addresses..."
                aria-label="Search allowlisted addresses"
              />

              {search && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearch("")}
                >
                  <X size={15} />
                </button>
              )}
            </label>

            <span className="admin-results">
              {filteredIps.length} shown
            </span>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>IP ADDRESS</th>
                  <th>STATUS</th>
                  <th className="admin-actions-column">ACTION</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3}>
                      <div className="admin-state">
                        <LoaderCircle
                          size={22}
                          className="admin-spin"
                        />
                        <span>Loading allowlist...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredIps.length === 0 ? (
                  <tr>
                    <td colSpan={3}>
                      <div className="admin-state">
                        {search ? (
                          <Search size={23} />
                        ) : (
                          <CircleHelp size={23} />
                        )}

                        <strong>
                          {search
                            ? "No matching addresses"
                            : "No allowlisted addresses"}
                        </strong>

                        <span>
                          {search
                            ? "Try another search term."
                            : "Add an IP address using the form above."}
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredIps.map((ip) => (
                    <tr key={ip}>
                      <td>
                        <div className="admin-ip-cell">
                          <span className="admin-ip-icon">
                            <Globe size={17} />
                          </span>
                          <code>{ip}</code>
                        </div>
                      </td>

                      <td>
                        <span className="admin-badge">
                          <Check size={13} />
                          Allowlisted
                        </span>
                      </td>

                      <td className="admin-actions-column">
                        {confirmIp === ip ? (
                          <div className="admin-confirm-actions">
                            <button
                              type="button"
                              className="admin-confirm-remove"
                              disabled={removingIp === ip}
                              onClick={() => void removeIp(ip)}
                            >
                              {removingIp === ip ? (
                                <LoaderCircle
                                  size={15}
                                  className="admin-spin"
                                />
                              ) : (
                                <Check size={15} />
                              )}
                              Confirm
                            </button>

                            <button
                              type="button"
                              className="admin-cancel-remove"
                              onClick={() => setConfirmIp(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="admin-icon-button"
                            aria-label={`Remove ${ip} from allowlist`}
                            title="Remove address"
                            onClick={() => setConfirmIp(ip)}
                          >
                            <Trash2 size={17} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <footer className="admin-panel-footer">
            <Activity size={16} />
            <span>
              Changes are stored in Redis and apply to subsequent access checks.
            </span>
          </footer>
        </section>

        <div className="admin-security-note">
          <LockKeyhole size={18} />
          <p>
            <strong>Security note</strong>
            <span>
              IP allowlisting does not replace authentication. Keep Cloudflare
              Access enabled for this dashboard and its API.
            </span>
          </p>
        </div>

        <footer className="admin-footer">
          <span>Central London Security Console</span>
          <span>Access management</span>
        </footer>
      </div>
    </main>
  );
}
