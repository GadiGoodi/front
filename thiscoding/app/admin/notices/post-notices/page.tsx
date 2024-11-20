'use client'
import "@/app/globals.css"
import Headers from "@/app/(components)/common/Headers";
import AdminNoticesPost from "@/app/(components)/admin/adminNotices/postNotices/AdminPostNotices";
export default function Home() {
  return (
    <div>
      <Headers />
      <div className="flex-col">
        <AdminNoticesPost />
      </div>
    </div>
  );
}
