'use client'
import "@/app/globals.css"
import Headers from "@/app/(components)/common/Headers";
import AdminNoticesDetail from "@/app/(components)/admin/notices/[adminNotice_Id]/AdminNoticesDetail";
export default function Home() {
  return (
    <div>
      <Headers />
      <div className="flex">
        <AdminNoticesDetail />
      </div>
    </div>
  );
}
