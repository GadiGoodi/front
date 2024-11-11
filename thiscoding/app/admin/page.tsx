'use client'
import "@/app/globals.css"
import SideTap from "../(components)/SideTap";
import Headers from "../(components)/common/Headers";
import Report from "../(components)/admin/Report"
export default function Home() {
  return (
    <div>
      <Headers />
      <div className="flex">
        <SideTap />
        <Report />
      </div>
    </div>
  );
}
