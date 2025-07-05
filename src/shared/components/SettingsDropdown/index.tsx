import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { settingsData } from './settingsData';
import { useOutsideClick } from './useOutsideClick';

const SettingsDropdown = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null!);
    const navigate = useNavigate();

    useOutsideClick(dropdownRef, () => setOpen(false));

    return (
        <div className="relative" ref={dropdownRef}>
            {/* TODO: 네비게이션 바의 '설정' 버튼 클릭 시 드롭다운이 열리도록 구현 필요 */}
            {/* 현재는 SettingsDropdown UI 확인용 임시 버튼 */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900"
            >
                설정
            </button>

            {/* TODO: font-family 적용 필요 */}
            {/* TODO: 레이아웃 적용 시 위치 수정하기 */}
            {open && (
                <div className="font-pretendard absolute right-0 z-50 mt-[120px] flex h-[610px] w-[320px] flex-col justify-center rounded-xl bg-white p-6 shadow-lg">
                    <h2 className="mb-10 text-center text-[28px] leading-tight font-semibold text-black">설정</h2>

                    {settingsData.map((section, i) => (
                        <div key={section.category} className={i === 0 ? '' : 'mt-6'}>
                            <h3 className="mb-6 pl-3 text-[24px] font-semibold text-black">{section.category}</h3>
                            <ul className="flex flex-col gap-3 pl-3">
                                {section.items.map((item) => (
                                    <li key={item.label}>
                                        <button
                                            onClick={() => {
                                                setOpen(false);
                                                if (item.path) void navigate(item.path);
                                                else if (item.onClick) item.onClick();
                                            }}
                                            className="w-full text-left text-lg font-medium text-black/70 transition-colors hover:text-black"
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {i < settingsData.length - 1 && (
                                <hr className="w-0.85 mx-auto mt-4 border-t border-black/30" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SettingsDropdown;
