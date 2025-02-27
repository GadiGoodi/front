const Footer = () => {
  return (
    <>
      <footer className="bg-[#2C2C2C] text-white py-8 text-sm relative px-6">
        <div className="text-left px-6">
          <div className="text-xl">THISCODING;</div>
          <div className="mt-2">
            <div>
              <span>(주)디스코딩 | </span>
              <button>개인정보처리방침</button>
              <span> | </span>
              <button>이용약관</button>
            </div>
            <div>
              개인정보보호책임자: 서혜리, 류인수, 권재원, 조원진, 김시언, 정종욱
              | 이메일: info@thiscoding.com
            </div>
            <div>
              전화번호: 070-1234-5678 | 주소: 서울특별시 강남구 테헤란로 57번길
              14층
            </div>
          </div>
          <div className="mt-2">THISCODING © 2024. All rights reserved.</div>
        </div>

        <div className="absolute top-4 right-6 flex space-x-4">
          <a
            href="https://github.com/GadiGoodi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/png/githubIcon.png"
              alt="GitHub Link"
              className="w-8 h-8 object-contain cursor-pointer"
            />
          </a>

          <a
            href="https://www.figma.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/png/figmaIcon.png"
              alt="Figma Link"
              className="w-8 h-8 object-contain cursor-pointer"
            />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
