import '@/app/globals.css';
import React from 'react';
import PaginationMui from '@mui/material/Pagination';
const Pagination = () => {
  return (
    <>
      <div className="flex justify-center items-center ">
        <PaginationMui
          count={1}
          variant="outlined"
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': {},
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: '#0095eb', // 클릭 시 배경색
              color: '#ffffff', // 클릭 시 글자색
              borderColor: '#ffffff',
              borderRadius: '12px',
            },
            '& .MuiPaginationItem-root:hover': {
              backgroundColor: '#e0f7ff', // 호버 시 배경색
              borderColor: '#ffffff',
              borderRadius: '12px',
            },
          }}
        />
      </div>
    </>
  );
};

export default Pagination;
