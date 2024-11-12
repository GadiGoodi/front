import "@/app/globals.css"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ReportContent = () => {
  return (
    <tr className="border-b border-black h-[50]">
      <td className="flex justify-center items-center h-[50] text-center">
        <div>
          <div className="flex justify-center items-center rounded-full w-[80] h-[30] bg-[#444444] text-white">기타</div>
        </div>
      </td>
      <td className="text-center">어쩌구 저쩌구 샬라샬라</td>
      <td className="text-center">단소살인마</td>
      <td className="text-center">2024.11.10</td>
      <td className="text-center"><CheckCircleIcon className="text-[#0095E8]" /><CheckCircleOutlineIcon className="text-[#EBEBEB]" /></td>
    </tr>
  );
}
export default ReportContent;
