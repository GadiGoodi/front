'use client';

import JsPagination from 'react-js-pagination';

interface PaginationProps {
  totalElements: number;
  currentPage: number;
  totalPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalElements,
  currentPage,
  totalPage,
  pageSize,
  onPageChange,
}: PaginationProps) => {
  const handleChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="absolute translate-x-1/2 -translate-y-1/2 bottom-3.5 flex flex-col items-center justify-center">
      <JsPagination
        totalItemsCount={totalElements}
        onChange={handleChange}
        activePage={currentPage + 1}
        pageRangeDisplayed={10}
        itemsCountPerPage={pageSize}
        innerClass="flex"
        linkClass="flex p-1 text-center justify-center mx-1 min-w-8 border border-gray-300 rounded hover:border-gray-500 cursor-pointer text-sm text-gray-500"
        activeLinkClass="bg-blue-500 text-white"
        itemClass=""
        // prevPageText={'<'}
        // nextPageText={'>'}
        hideFirstLastPages={true}
      />
    </div>
  );
};
