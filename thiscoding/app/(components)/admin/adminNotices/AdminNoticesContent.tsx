import { AdminNoticesListDTO } from "@/app/(models)/admin/adminNotices/AdminNoticesListDTO";
import "@/app/globals.css"
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useRouter } from "next/navigation";
const AdminNoticesContent = ({ notices }: { notices: AdminNoticesListDTO }) => {
  const router = useRouter();

  const deleteNotices = () => {
    const result = axios.delete(`http://localhost:8080/api/admin/notices/${notices.id}`)
      .then(res => {
        console.log(res);
        router.push("/admin/notices?page=0");
        // router.refresh();
      }).catch(err => (
        console.log(err)
      ))
    return result;
  }

  const NoticesDetailRouter = () => {
    router.push(`/admin/notices/${notices.id}`)
  }

  return (
    <>
      <tr className="border-b border-black h-[50]" onClick={NoticesDetailRouter}>
        <td className="flex justify-center items-center h-[50] text-center">
          <div>
            <div className="flex justify-center items-center rounded-full w-[80] h-[30] bg-[#444444] text-white">{notices.category}</div>
          </div>
        </td>
        <td className="text-center">{notices.title}</td>
        <td className="text-center">{notices.createDate}</td>
        <td className="text-center">{notices.viewCount}</td>
        <td className="text-center"><DeleteIcon onClick={() => deleteNotices()} /></td>
      </tr>
    </>
  );

}
export default AdminNoticesContent;
