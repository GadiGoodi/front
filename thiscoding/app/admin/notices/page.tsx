'use client'
import "@/app/globals.css"
import SideTap from "@/app/(components)/SideTap";
import Headers from "@/app/(components)/common/Headers";
import Notices from "@/app/(components)/admin/notices/Notices";
export default function Home() {
  return (
    <div>
      <Headers />
      <div className="flex">
        <SideTap />
        <Notices />
      </div>
    </div>
  );
}
