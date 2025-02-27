import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const Search = () => {
  return (
    <>
      <div className="relative">
        <input
          type="text"
          className="bg-[#EBEBEB] border-2 border-[#D0D0D0] p-2 pr-10 rounded-[14px]"
        />
        <button>
          <SearchOutlinedIcon
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            style={{ color: '#0095E8', fontSize: '30px' }}
          />
        </button>
      </div>
      <button className="hover:text-[#0095E8]">
        <NotificationsNoneOutlinedIcon style={{ fontSize: '30px' }} />
      </button>
    </>
  );
};

export default Search;
