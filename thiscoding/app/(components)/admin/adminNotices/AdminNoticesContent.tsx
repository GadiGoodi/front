import useAdmin from "@/app/(hooks)/admin/useAdmin";
import { AdminNoticesListDTO } from "@/app/(models)/admin/adminNotices/AdminNoticesListDTO";
import "@/app/globals.css"
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
const AdminNoticesContent = ({ notices }: { notices: AdminNoticesListDTO }) => {

  const { removeAdminNotices } = useAdmin();
  const router = useRouter();


  const NoticesDetailRouter = () => {
    router.push(`/admin/notices/${notices.id}`)
  }

  return (
    <>
      <tr className="border-b border-black h-[40] text-sm">
        <td className="flex justify-center items-center h-[45] text-center">
          <div>
            <div
              onClick={NoticesDetailRouter}
              className="flex justify-center items-center rounded-full w-[70] h-[30] bg-[#444444] text-white">{notices.category}</div>
          </div>
        </td>
        <td className="text-center" onClick={NoticesDetailRouter}>{notices.title}</td>
        <td className="text-center">{notices.createDate}</td>
        <td className="text-center">{notices.viewCount}</td>
        <td className="text-center"><button onClick={() => removeAdminNotices(notices.id)}><DeleteIcon /></button></td>
      </tr>
    </>
  );

}
export default AdminNoticesContent;
