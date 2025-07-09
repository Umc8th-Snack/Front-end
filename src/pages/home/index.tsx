import jopengImg from '../../shared/assets/jopeng.jpg';
import studypengImg from '../../shared/assets/studypeng.jpg';
import ArticleCard from '../../shared/components/ArticleCard/ArticleCard';

const dummyArticles = [
    { title: '펭귄은 귀엽습니다.', imageUrl: jopengImg },
    { title: '펭귄의 매력에 푹 빠져보세요!!', imageUrl: studypengImg },
    { title: '기사 제목 3', imageUrl: '' },
    { title: '기사 제목 4', imageUrl: '' },
];

const HomePage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="flex gap-8">
                {dummyArticles.map((article, idx) => (
                    <ArticleCard key={idx} title={article.title} imageUrl={article.imageUrl} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
