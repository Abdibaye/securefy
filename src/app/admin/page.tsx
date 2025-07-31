



import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";


// Dummy stats and recent activity
const stats = [
  { label: "Total Requests", value: 124, color: "bg-blue-100 text-blue-800" },
  { label: "Approved", value: 67, color: "bg-green-100 text-green-800" },
  { label: "Pending", value: 41, color: "bg-yellow-100 text-yellow-800" },
  { label: "Rejected", value: 16, color: "bg-red-100 text-red-800" },
  { label: "Success Rate", value: "80%", color: "bg-indigo-100 text-indigo-800" },
];

const recent = [
  { id: 1, name: "Amina Yusuf", date: "2025-07-30T14:12:00Z", status: "Pending" },
  { id: 2, name: "Samuel Bekele", date: "2025-07-30T10:05:00Z", status: "Approved" },
  { id: 3, name: "Liya Tadesse", date: "2025-07-29T18:30:00Z", status: "Rejected" },
  { id: 4, name: "Abdi Nuru", date: "2025-07-29T09:45:00Z", status: "Pending" },
  { id: 5, name: "Sara Mohammed", date: "2025-07-28T16:20:00Z", status: "Approved" },
];

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Approved"
      ? "bg-green-100 text-green-800"
      : status === "Pending"
      ? "bg-yellow-100 text-yellow-800"
      : status === "Rejected"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800";
  return <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>{status}</span>;
}

export default function AdminIndexPage() {
  return (
    <div className="min-h-screen flex flex-col w-full mx-auto px-2 md:px-6 py-2">
            {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex flex-col items-center py-6 px-2">
            <div className={`text-lg font-bold mb-1 ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Chart Area */}
      <div className="bg-white rounded-xl shadow border border-gray-100 mb-8 p-4">
        <h2 className="text-lg font-semibold mb-2">Request Trends</h2>
        <ChartAreaInteractive />
      </div>

      {/* Recent Activity & Quick Links */}
      <div className="grid md:grid-cols-3 gap-6 flex-1">
        {/* Recent Activity */}
        <div className="md:col-span-2 bg-white rounded-xl shadow border border-gray-100 p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-2 px-3 text-left font-semibold text-gray-700">Name</th>
                  <th className="py-2 px-3 text-left font-semibold text-gray-700">Date</th>
                  <th className="py-2 px-3 text-left font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50 transition">
                    <td className="py-2 px-3 font-medium">{item.name}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(item.date).toLocaleString()}</td>
                    <td className="py-2 px-3"><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Quick Links */}
        <div className="flex flex-col gap-4 justify-between">
          <Card className="flex flex-col items-center justify-center py-8 gap-3">
            <div className="text-lg font-semibold mb-2">Quick Actions</div>
            <Link href="/admin/verify" className="w-full">
              <Button className="w-full" size="lg">Submit Verification</Button>
            </Link>
            <Link href="/admin/request" className="w-full">
              <Button className="w-full" variant="outline" size="lg">View Requests</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}