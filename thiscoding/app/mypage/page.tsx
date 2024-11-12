'use client'
import "@/app/globals.css"
import SideTap from "@/app/(components)/SideTap";
import Headers from "@/app/(components)/common/Headers";
export default function Home() {
  return (
    <div>
      <Headers />
      <div className="flex">
        <SideTap />
      </div>
    </div>
  );
}
