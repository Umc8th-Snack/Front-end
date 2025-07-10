import FontTest from '../FontTest';

const HomePage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            {/* TODO: FontTest는 임시로 넣은 컴포넌트입니다. 추후 삭제 예정입니다. */}
            {/* <h1 className="text-4xl font-bold">홈 페이지</h1> */}
            <FontTest />
        </div>
    );
};

export default HomePage;
