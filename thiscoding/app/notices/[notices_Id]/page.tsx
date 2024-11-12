'use client'
import "@/app/globals.css"
import Headers from "@/app/(components)/common/Headers";
import NoticesDetail from "@/app/(components)/notices/[notices_Id]/NoticesDetail";
export default function Home() {
  return (
    <div>
      <Headers />
      <NoticesDetail />
    </div>
  );
}
