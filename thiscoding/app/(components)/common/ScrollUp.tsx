'use client';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import '@/app/globals.css';

const ScrollUp = () => {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="fixed bottom-0 right-0 p-4">
        <button
          className="bg-[#656565] rounded-full w-[50px] h-[50px] flex items-center justify-center shadow-lg"
          onClick={backToTop}
        >
          <ArrowUpwardIcon
            className="transform"
            style={{ color: '#D9D9D9', fontSize: '20px' }}
          />
        </button>
      </div>
    </>
  );
};

export default ScrollUp;
