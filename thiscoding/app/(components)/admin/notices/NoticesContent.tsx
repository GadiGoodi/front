import "@/app/globals.css"
import DeleteIcon from '@mui/icons-material/Delete';
const NoticesContent = () => {


  const deleteNotices = () => {
    const removeNotices = () => {
      //공지사항 삭제 api
    }
  }

  return (
    <tr className="border-b border-black h-[50]">
      <td className="flex justify-center items-center h-[50] text-center">
        <div>
          <div className="flex justify-center items-center rounded-full w-[80] h-[30] bg-[#444444] text-white">FAQ</div>
        </div>
      </td>
      <td className="text-center">자주 묻는 질문</td>
      <td className="text-center">2024-11-11 19:17:24</td>
      <td className="text-center">4738</td>
      <td className="text-center"><DeleteIcon onClick={() => deleteNotices()} /></td>
    </tr>
  );
}
export default NoticesContent;
