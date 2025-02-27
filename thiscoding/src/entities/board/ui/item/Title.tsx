import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import router from 'next/router';

interface titleProps {
  language: string;
  title: string;
  qnaId: string;
}

const Title = ({ language, title, qnaId }: titleProps) => {
  const QnaDetailRouter = () => {
    router.push(`/qna/${qnaId}`);
  };
  return (
    <div className="flex gap-2 mx-4 mt-3">
      <div className="text-white min-w-[70] p-2 w-auto h-[25] flex justify-center items-center rounded-full bg-[#444444]">
        {language}
      </div>
      <div>{title}</div>
      <div className="text-center">
        <CheckCircleIcon className="text-[#0095E8]" />
      </div>
    </div>
  );
};

export default Title;
