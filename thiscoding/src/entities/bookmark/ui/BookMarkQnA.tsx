import BookMarkQnAContent from './item/BookMarkQnAContent';
const BookMarkQnA = () => {
  return (
    <>
      <div className="w-[950] h-[650] bg-[#FFFFFF] ml-24 rounded-2xl border-[#EBEBEB]">
        <div className="mb-12" />
        <div className="border-b border-black mx-[50]" />
        <BookMarkQnAContent />
        <BookMarkQnAContent />
        <BookMarkQnAContent />
        <BookMarkQnAContent />
      </div>
    </>
  );
};
export default BookMarkQnA;
