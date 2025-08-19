import { type ReactNode } from 'react';

import RelatedArticleList from '@/pages/article/components/RelatedArticleList/RelatedArticleList';

interface ArticleLayoutProps {
    children: ReactNode;
    sidebarContent?: ReactNode;
}

const ArticleLayout = ({ children, sidebarContent }: ArticleLayoutProps) => {
    return (
        <div className="px-6 py-6">
            <div className="mx-auto grid max-w-[1100px] grid-cols-[70%_30%]">
                <div>
                    <div className="flex flex-col gap-4 px-6 py-6">{children}</div>
                </div>

                {/* Sidebar */}
                <aside className="mt-8">
                    <div className="sticky top-15 flex justify-end">
                        {sidebarContent || <RelatedArticleList onClose={() => {}} articleId={0} />}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ArticleLayout;
