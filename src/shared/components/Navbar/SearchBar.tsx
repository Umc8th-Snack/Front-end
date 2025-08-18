import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchIcon from '@/shared/assets/search.svg?react';

const SearchBar = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const goToSearch = () => {
        if (keyword.trim()) {
            void navigate(`/search?query=${encodeURIComponent(keyword.trim())}`);
        }
    };

    return (
        <div className="border-main mx-4 flex h-[35px] w-full min-w-[250px] gap-4 rounded-full border px-4 py-2 outline-none focus:ring-1 focus:ring-blue-400 md:h-[40px] md:max-w-[455px] md:min-w-[300px] lg:h-[45px] lg:max-w-[555px] lg:min-w-[350px]">
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        void goToSearch();
                    }
                }}
                placeholder="찾고싶은 기사가 있나요?"
                className="placeholder:text-16px-medium md:text-18px-medium lg:text-20px-medium text-main-70 w-full pl-1 outline-none focus:outline-none"
            />
            <button onClick={() => void goToSearch()} className="hover:cursor-pointer">
                <SearchIcon className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
            </button>
        </div>
    );
};

export default SearchBar;
