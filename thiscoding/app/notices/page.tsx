'use client'
import "@/app/globals.css"
import Headers from "@/app/(components)/common/Headers";
import Notices from "../(components)/notices/Notices";
export default function Home() {
  return (
    <div>
      <Headers />
      <Notices />
    </div>
  );
}
