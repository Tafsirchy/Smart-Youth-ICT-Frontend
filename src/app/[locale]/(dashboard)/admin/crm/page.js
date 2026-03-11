'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// ─── Status config ─────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  new:        { label: 'New',        color: '#6366f1' },
  contacted:  { label: 'Contacted',  color: '#f59e0b' },
  interested: { label: 'Interested', color: '#3b82f6' },
  enrolled:   { label: 'Enrolled',   color: '#10b981' },
  cold:       { label: 'Cold',       color: '#6b7280' },
  lost:       { label: 'Lost',       color: '#ef4444' },
};

const SOURCE_LABELS = {
  facebook: 'Facebook', whatsapp: 'WhatsApp', organic: 'Organic',
  referral: 'Referral', seminar: 'Seminar',   other: 'Other',
};

// ─── Status Badge ───────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.new;
  return (
    <span
      className="crm-badge"
      style={{ '--badge-color': cfg.color }}
    >
      {cfg.label}
    </span>
  );
}

// ─── Stats Bar ──────────────────────────────────────────────────────────────
function StatsBar({ stats }) {
  return (
    <div className="crm-stats">
      <div className="crm-stats__card crm-stats__card--total">
        <span className="crm-stats__num">{stats.total ?? 0}</span>
        <span className="crm-stats__lbl">Total Leads</span>
      </div>
      {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
        <div key={key} className="crm-stats__card" style={{ '--badge-color': cfg.color }}>
          <span className="crm-stats__num">{stats[key] ?? 0}</span>
          <span className="crm-stats__lbl">{cfg.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Lead Detail Modal ──────────────────────────────────────────────────────
function LeadDetailModal({ lead, onClose, onSave }) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [form, setForm] = useState({
    status:      lead.status || 'new',
    followUpDate: lead.followUpDate ? lead.followUpDate.split('T')[0] : '',
    interest:    lead.interest || '',
  });
  const [note,    setNote]    = useState('');
  const [notes,   setNotes]   = useState(lead.notes || []);
  const [saving,  setSaving]  = useState(false);
  const [savingNote, setSavingNote] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`${API}/crm/${lead._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) { onSave(json.data); onClose(); }
    } finally { setSaving(false); }
  }

  async function handleAddNote() {
    if (!note.trim()) return;
    setSavingNote(true);
    try {
      const res = await fetch(`${API}/crm/${lead._id}/note`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text: note }),
      });
      const json = await res.json();
      if (json.success) { setNotes(json.data); setNote(''); }
    } finally { setSavingNote(false); }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel crm-modal">
        {/* Header */}
        <div className="crm-modal__header">
          <div>
            <h2 className="crm-modal__name">{lead.name}</h2>
            <p className="crm-modal__contact">
              {lead.phone && <span>📞 {lead.phone}</span>}
              {lead.email && <span>✉️ {lead.email}</span>}
            </p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="crm-modal__body">
          {/* Left col — edit form */}
          <div className="crm-modal__col">
            <h3 className="crm-modal__section-title">Lead Details</h3>

            <label className="form-label">Source</label>
            <p className="crm-modal__text">{SOURCE_LABELS[lead.source] || lead.source}</p>

            <label className="form-label">Interested In</label>
            <input
              className="form-input"
              value={form.interest}
              onChange={(e) => setForm(f => ({ ...f, interest: e.target.value }))}
              placeholder="Course or service name"
            />

            <label className="form-label">Status</label>
            <select
              className="form-input"
              value={form.status}
              onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
            >
              {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>

            <label className="form-label">Follow-up Date</label>
            <input
              type="date"
              className="form-input"
              value={form.followUpDate}
              onChange={(e) => setForm(f => ({ ...f, followUpDate: e.target.value }))}
            />

            <button
              className="btn btn--primary w-full mt-4"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>

          {/* Right col — notes */}
          <div className="crm-modal__col">
            <h3 className="crm-modal__section-title">Notes</h3>

            <div className="crm-notes">
              {notes.length === 0 && (
                <p className="crm-notes__empty">No notes yet.</p>
              )}
              {[...notes].reverse().map((n, i) => (
                <div key={i} className="crm-note">
                  <p className="crm-note__text">{n.text}</p>
                  <time className="crm-note__time">
                    {new Date(n.createdAt).toLocaleString()}
                  </time>
                </div>
              ))}
            </div>

            <div className="crm-add-note">
              <textarea
                className="form-input"
                rows={3}
                placeholder="Add a note…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <button
                className="btn btn--outline w-full"
                onClick={handleAddNote}
                disabled={savingNote || !note.trim()}
              >
                {savingNote ? 'Adding…' : 'Add Note'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Add Lead Modal ─────────────────────────────────────────────────────────
function AddLeadModal({ onClose, onCreated }) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [form, setForm] = useState({ name: '', phone: '', email: '', source: 'other', interest: '' });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/crm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) { onCreated(json.data); onClose(); }
    } finally { setLoading(false); }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel" style={{ maxWidth: '480px' }}>
        <div className="crm-modal__header">
          <h2 className="crm-modal__name">Add New Lead</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <input className="form-input" placeholder="Full Name *" value={form.name} onChange={set('name')} required />
          <input className="form-input" placeholder="Phone Number" value={form.phone} onChange={set('phone')} />
          <input className="form-input" type="email" placeholder="Email" value={form.email} onChange={set('email')} />
          <input className="form-input" placeholder="Interested in…" value={form.interest} onChange={set('interest')} />
          <select className="form-input" value={form.source} onChange={set('source')}>
            {Object.entries(SOURCE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <button className="btn btn--primary" type="submit" disabled={loading}>
            {loading ? 'Adding…' : 'Add Lead'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function AdminCRMPage() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [leads,       setLeads]       = useState([]);
  const [stats,       setStats]       = useState({});
  const [total,       setTotal]       = useState(0);
  const [page,        setPage]        = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search,      setSearch]      = useState('');
  const [loading,     setLoading]     = useState(true);
  const [selected,    setSelected]    = useState(null);
  const [showAdd,     setShowAdd]     = useState(false);

  const LIMIT = 20;
  const totalPages = Math.ceil(total / LIMIT);

  const fetchLeads = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const qs = new URLSearchParams({ page, limit: LIMIT, status: statusFilter, q: search });
      const res = await fetch(`${API}/crm?${qs}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) { setLeads(json.data); setTotal(json.total); }
    } finally { setLoading(false); }
  }, [token, page, statusFilter, search]);

  const fetchStats = useCallback(async () => {
    if (!token) return;
    const res = await fetch(`${API}/crm/stats`, { headers: { Authorization: `Bearer ${token}` } });
    const json = await res.json();
    if (json.success) setStats(json.data);
  }, [token]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);
  useEffect(() => { fetchStats(); }, [fetchStats]);

  function handleSaved(updated) {
    setLeads(ls => ls.map(l => l._id === updated._id ? updated : l));
    fetchStats();
  }

  async function handleDelete(id) {
    if (!confirm('Delete this lead?')) return;
    await fetch(`${API}/crm/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setLeads(ls => ls.filter(l => l._id !== id));
    setTotal(t => t - 1);
    fetchStats();
  }

  function handleCreated(lead) {
    setLeads(ls => [lead, ...ls]);
    setTotal(t => t + 1);
    fetchStats();
  }

  const STATUS_TABS = ['all', ...Object.keys(STATUS_CONFIG)];

  return (
    <div className="crm-page">
      {/* Page header */}
      <div className="crm-page__header">
        <div>
          <h1 className="crm-page__title">CRM — Lead Management</h1>
          <p className="crm-page__subtitle">{total} total leads</p>
        </div>
        <button className="btn btn--primary" onClick={() => setShowAdd(true)}>
          + Add Lead
        </button>
      </div>

      {/* Stats bar */}
      <StatsBar stats={stats} />

      {/* Filters */}
      <div className="crm-filters">
        <div className="crm-status-tabs">
          {STATUS_TABS.map((s) => (
            <button
              key={s}
              className={`crm-tab ${statusFilter === s ? 'crm-tab--active' : ''}`}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              style={statusFilter === s && STATUS_CONFIG[s] ? { '--badge-color': STATUS_CONFIG[s].color } : {}}
            >
              {s === 'all' ? 'All' : STATUS_CONFIG[s].label}
            </button>
          ))}
        </div>
        <input
          className="form-input crm-search"
          placeholder="Search by name, phone, email…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      {/* Table */}
      <div className="crm-table-wrap">
        {loading ? (
          <div className="crm-loading">Loading leads…</div>
        ) : leads.length === 0 ? (
          <div className="crm-empty">No leads found.</div>
        ) : (
          <table className="crm-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Source</th>
                <th>Interest</th>
                <th>Status</th>
                <th>Follow-up</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="crm-table__row"
                  onClick={() => setSelected(lead)}
                >
                  <td className="crm-table__name">{lead.name}</td>
                  <td className="crm-table__contact">
                    {lead.phone && <span>{lead.phone}</span>}
                    {lead.email && <span className="crm-table__email">{lead.email}</span>}
                  </td>
                  <td>{SOURCE_LABELS[lead.source] || lead.source}</td>
                  <td>{lead.interest || '—'}</td>
                  <td><StatusBadge status={lead.status} /></td>
                  <td>
                    {lead.followUpDate
                      ? new Date(lead.followUpDate).toLocaleDateString()
                      : '—'}
                  </td>
                  <td>
                    <button
                      className="crm-table__del-btn"
                      onClick={(e) => { e.stopPropagation(); handleDelete(lead._id); }}
                      title="Delete lead"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="crm-pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`blog-pagination__btn ${page === p ? 'blog-pagination__btn--active' : ''}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Modals */}
      {selected && (
        <LeadDetailModal
          lead={selected}
          onClose={() => setSelected(null)}
          onSave={handleSaved}
        />
      )}
      {showAdd && (
        <AddLeadModal
          onClose={() => setShowAdd(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
}
