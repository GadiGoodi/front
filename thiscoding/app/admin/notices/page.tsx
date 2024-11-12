'use client'
import "@/app/globals.css"
import SideTap from "@/app/(components)/SideTap";
import Headers from "@/app/(components)/common/Headers";
import AdminNotices from "@/app/(components)/admin/adminNotices/AdminNotices";
export default function Home() {
  return (
    <div>
      <Headers />
      <div className="flex">
        <SideTap />
        <AdminNotices />
      </div>
    </div>
  );
}
