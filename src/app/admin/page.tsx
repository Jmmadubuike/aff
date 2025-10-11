'use client';

import { useEffect, useState } from 'react';
import { FiDownload } from 'react-icons/fi';

const gold = '#CDA23B';
const API_URL = '/api/submissions';

export interface Submission {
  timestamp: string;
  name: string;
  email: string;
  phone: number | string;
  role: string;
  message: string;
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filtered, setFiltered] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Toast
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch submissions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL, { cache: 'no-store' });
        const json = (await res.json()) as { status: string; data: Submission[] };

        const submissionsArray: Submission[] = Array.isArray(json.data)
          ? json.data.filter((s: Submission) =>
              s.name || s.email || s.phone || s.role || s.message
            )
          : [];

        const formatted: Submission[] = submissionsArray.map((entry) => ({
          ...entry,
          timestamp:
            typeof entry.timestamp === 'string'
              ? new Date(entry.timestamp).toLocaleString()
              : entry.timestamp,
        }));

        setSubmissions(formatted);
        setFiltered(formatted);
      } catch (err) {
        console.error('❌ Failed to fetch submissions:', err);
        showToast('error', 'Failed to load submissions');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter logic
  useEffect(() => {
    let temp = [...submissions];
    if (roleFilter !== 'All') temp = temp.filter((s) => s.role === roleFilter);
    if (search.trim() !== '') {
      temp = temp.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.email.toLowerCase().includes(search.toLowerCase()) ||
          s.phone.toString().includes(search)
      );
    }
    if (startDate) temp = temp.filter((s) => new Date(s.timestamp) >= new Date(startDate));
    if (endDate) temp = temp.filter(
      (s) => new Date(s.timestamp) <= new Date(endDate + 'T23:59:59')
    );
    setFiltered(temp);
  }, [search, roleFilter, startDate, endDate, submissions]);

  // Export CSV safely
  const exportCSV = () => {
    const headers = ['Timestamp', 'Name', 'Email', 'Phone', 'Role', 'Message'];
    const rows = filtered.map((s) =>
      [s.timestamp, s.name, s.email, s.phone, s.role, s.message].map((v) => `"${v}"`)
    );
    const csvContent = [headers.map((h) => `"${h}"`), ...rows].map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'submissions.csv';
    a.click();
  };

  // Role badge colors
  const roleColors: Record<string, string> = {
    Attendee: '#6EE7B7',
    Model: '#FBBF24',
    Designer: '#60A5FA',
    Vendor: '#F87171',
    Media: '#C084FC',
  };

  // Summary stats
  const stats = submissions.reduce<Record<string, number>>((acc, s) => {
    acc[s.role] = (acc[s.role] || 0) + 1;
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="text-4xl md:text-5xl font-bold" style={{ color: gold }}>
            Submissions Dashboard
          </h1>
          <button
            onClick={exportCSV}
            className="px-6 py-3 font-semibold rounded-md hover:brightness-110 transition"
            style={{ background: gold, color: '#000' }}
          >
            <FiDownload className="inline mr-2" /> Export CSV
          </button>
        </header>

        {/* Summary */}
        <div className="flex flex-wrap gap-4 mb-6">
          {Object.entries(stats).map(([role, count]) => (
            <span
              key={role}
              style={{ background: roleColors[role] || '#555' }}
              className="px-3 py-1 rounded-full text-black font-semibold"
            >
              {role}: {count}
            </span>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            className="p-2 bg-[#333] rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-2 bg-[#333] rounded-md"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option>All</option>
            <option>Attendee</option>
            <option>Model</option>
            <option>Designer</option>
            <option>Vendor</option>
            <option>Media</option>
          </select>
          <input
            type="date"
            className="p-2 bg-[#333] rounded-md"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="p-2 bg-[#333] rounded-md"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-gray-400 text-center text-lg">Loading submissions...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">No submissions found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-[#111]">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-400 uppercase text-sm">Time</th>
                  <th className="px-6 py-3 text-left text-gray-400 uppercase text-sm">Name</th>
                  <th className="px-6 py-3 text-left text-gray-400 uppercase text-sm">Email</th>
                  <th className="px-6 py-3 text-left text-gray-400 uppercase text-sm">Phone</th>
                  <th className="px-6 py-3 text-left text-gray-400 uppercase text-sm">Role</th>
                  <th className="px-6 py-3 text-left text-gray-400 uppercase text-sm">Message</th>
                </tr>
              </thead>
              <tbody className="bg-[#222] divide-y divide-gray-700">
                {filtered.map((s, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4">{s.timestamp}</td>
                    <td className="px-6 py-4">{s.name}</td>
                    <td className="px-6 py-4">{s.email}</td>
                    <td className="px-6 py-4">{s.phone}</td>
                    <td className="px-6 py-4">
                      <span
                        style={{ background: roleColors[s.role] || '#555' }}
                        className="px-2 py-1 rounded-full text-black font-semibold"
                      >
                        {s.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">{s.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div
            className={`fixed bottom-6 right-6 px-6 py-4 rounded-md font-semibold ${
              toast.type === 'success' ? 'bg-green-500 text-black' : 'bg-red-500 text-white'
            }`}
          >
            {toast.msg}
          </div>
        )}
      </div>
    </main>
  );
}
