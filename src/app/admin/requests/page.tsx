"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Example admin protection HOC (replace with your actual auth logic)
// import { requireAdmin } from "@/lib/auth";

const STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

function StatusBadge({ status }: { status: string }) {
  const color =
    status in STATUS_COLORS
      ? STATUS_COLORS[status as keyof typeof STATUS_COLORS]
      : "bg-gray-100 text-gray-800";
  return <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>{status}</span>;
}

export default function RequestsPage() {
  // requireAdmin(); // Uncomment and implement for real admin protection

  // Dummy data for demonstration
  const DUMMY_REQUESTS = [
    {
      id: "1",
      fullName: "Amina Yusuf",
      nationalId: "FA1234567",
      status: "Pending",
      createdAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    },
    {
      id: "2",
      fullName: "Samuel Bekele",
      nationalId: "FA9876543",
      status: "Approved",
      createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
    },
    {
      id: "3",
      fullName: "Liya Tadesse",
      nationalId: "FA5555555",
      status: "Rejected",
      createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
    },
    {
      id: "4",
      fullName: "Abdi Nuru",
      nationalId: "FA1111222",
      status: "Pending",
      createdAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    },
    {
      id: "5",
      fullName: "Sara Mohammed",
      nationalId: "FA3333444",
      status: "Approved",
      createdAt: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),
    },
    {
      id: "6",
      fullName: "Yonas Alemu",
      nationalId: "FA6666777",
      status: "Pending",
      createdAt: new Date(Date.now() - 3600 * 1000 * 10).toISOString(),
    },
    {
      id: "7",
      fullName: "Mekdes Fikru",
      nationalId: "FA8888999",
      status: "Rejected",
      createdAt: new Date(Date.now() - 3600 * 1000 * 30).toISOString(),
    },
    {
      id: "8",
      fullName: "Hana Getachew",
      nationalId: "FA2222333",
      status: "Approved",
      createdAt: new Date(Date.now() - 3600 * 1000 * 80).toISOString(),
    },
    {
      id: "9",
      fullName: "Dawit Kebede",
      nationalId: "FA4444555",
      status: "Pending",
      createdAt: new Date(Date.now() - 3600 * 1000 * 15).toISOString(),
    },
    {
      id: "10",
      fullName: "Selamawit Tulu",
      nationalId: "FA7777888",
      status: "Approved",
      createdAt: new Date(Date.now() - 3600 * 1000 * 100).toISOString(),
    },
    {
      id: "11",
      fullName: "Kebede Alemayehu",
      nationalId: "FA9999000",
      status: "Pending",
      createdAt: new Date(Date.now() - 3600 * 1000 * 200).toISOString(),
    },
  ];

  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 7;
  const [totalPages, setTotalPages] = useState(Math.ceil(DUMMY_REQUESTS.length / PAGE_SIZE));
  const router = useRouter();

  // Filter and paginate dummy data
  const filtered = DUMMY_REQUESTS.filter(req =>
    (!statusFilter || req.status === statusFilter) &&
    (!search || req.fullName.toLowerCase().includes(search.toLowerCase()) || req.nationalId.toLowerCase().includes(search.toLowerCase()))
  );
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)));
    if (page > Math.ceil(filtered.length / PAGE_SIZE)) setPage(1);
  }, [filtered.length]);

  const handleRowClick = (id: string) => {
    router.push(`/admin/request/${id}`);
  };

  return (
    <div className="w-full mx-auto mt-5 p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search by name or ID..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-56 shadow-sm"
          />
          <select
            className="border rounded px-2 py-1 text-sm bg-white shadow-sm"
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="text-sm text-gray-500">Page {page} of {totalPages}</div>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
        <div className="min-w-[900px]">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="py-3 px-4 text-gray-700 font-semibold">Full Name</TableHead>
              <TableHead className="py-3 px-4 text-gray-700 font-semibold">Fayda ID</TableHead>
              <TableHead className="py-3 px-4 text-gray-700 font-semibold">Status</TableHead>
              <TableHead className="py-3 px-4 text-gray-700 font-semibold">Date Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-400 py-8">No requests found.</TableCell>
              </TableRow>
            ) : (
              paginated.map((req) => (
                <TableRow
                  key={req.id}
                  className="hover:bg-blue-50 cursor-pointer transition group"
                  onClick={() => handleRowClick(req.id)}
                >
                  <TableCell className="py-3 px-4 font-medium group-hover:text-blue-700">{req.fullName}</TableCell>
                  <TableCell className="py-3 px-4">{req.nationalId}</TableCell>
                  <TableCell className="py-3 px-4">
                    <StatusBadge status={req.status} />
                  </TableCell>
                  <TableCell className="py-3 px-4 text-gray-500">{req.createdAt ? new Date(req.createdAt).toLocaleString() : "-"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 items-center mt-6">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => setPage(p => Math.max(1, p - 1))}
          className="min-w-[90px]"
        >
          Previous
        </Button>
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded text-sm font-medium border transition ${page === i + 1 ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50"}`}
              onClick={() => setPage(i + 1)}
              disabled={page === i + 1}
              type="button"
            >
              {i + 1}
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          className="min-w-[90px]"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
