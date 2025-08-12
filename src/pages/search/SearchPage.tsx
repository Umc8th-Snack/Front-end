import { Fragment } from 'react';

interface ArticleItemProps {
    showDivider: boolean;
}

const ArticleItem = ({ showDivider }: ArticleItemProps) => (
    <Fragment>
        <h2 className="text-36px-semibold mb-2 text-black">기사 제목</h2>
        <p className="text-black-70 text-20px-medium mb-6 w-[760px]">
            검색한 키워드가 포함된 기사의 본문 내용 검색한 키워드가 포함된 기사의 본문 내용 검색한 키워드가 포함된
            기사의 본문 내용 검색한 키워드가 포함된 기사의 본문 내용 검색한 키워드가 포함된 기사의 본문 내용 검색한
            키워드가 포함된 기사의 본문 내용 검색한 키워드가 포함된 기사의 본문 내용...
        </p>
        {showDivider && (
            <>
                <hr className="mx-auto w-[780px] border border-black/30" />
                <div className="pb-10"></div>
            </>
        )}
    </Fragment>
);

function SearchPage() {
    const articles = [1, 2, 3]; // 더미 데이터
    return (
        <div className="border-main-30 relative mx-auto mt-10 w-[880px] rounded-[20px] border-[3px] bg-white p-12">
            {articles.map((_, idx) => (
                <ArticleItem key={idx} showDivider={idx < articles.length - 1} />
            ))}
        </div>
    );
}

export default SearchPage;
