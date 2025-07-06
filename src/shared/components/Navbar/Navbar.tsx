import { Link } from 'react-router-dom';

import SearchIcon from '../../assets/search.svg';
import SnackLogo from '../../assets/snack.svg';

const Navbar = () => {
    return (
        <header className="w-full">
            <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-6 px-10 py-6">
                {/* 로고 */}
                <div className="flex items-center">
                    <Link to="/" className="flex shrink-0 items-center">
                        <img src={SnackLogo} alt="Snack Logo" className="h-14 w-auto" />
                    </Link>

                    {/* 검색창 */}
                    <div className="mx-8 flex w-[700px] min-w-[200px] flex-1 gap-4 rounded-full border border-[#0557E0] px-4 py-2 outline-none focus:ring-1 focus:ring-blue-400">
                        <input
                            type="text"
                            placeholder="찾고싶은 기사가 있나요?"
                            className="placeholder: w-full pl-1 text-[20px] text-[#0557E0] outline-none focus:outline-none"
                        />
                        <button className="hover:cursor-pointer">
                            <img src={SearchIcon} alt="Search Icon" className="h-8 w-auto" />
                        </button>
                    </div>
                </div>

                {/* 우측 메뉴 */}
                <nav className="flex shrink-0 items-center gap-6 text-[20px] font-medium text-black">
                    <Link to="/login" className="transition-colors hover:text-[#0557E0]">
                        로그인
                    </Link>
                    <Link to="/" className="transition-colors hover:text-[#0557E0]">
                        홈 화면
                    </Link>
                    <Link to="/mypage" className="transition-colors hover:text-[#0557E0]">
                        마이페이지
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
