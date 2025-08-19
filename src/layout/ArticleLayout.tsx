import { type ReactNode } from 'react';

import RelatedArticleList from '@/pages/article/components/RelatedArticleList/RelatedArticleList';

interface ArticleLayoutProps {
    children: ReactNode;
    sidebarContent?: ReactNode;
}

const ArticleLayout = ({ children, sidebarContent }: ArticleLayoutProps) => {
    return (
        <div className="px-6 py-6">
            <div className="mx-auto grid max-w-[1100px] grid-cols-[100%] lg:grid-cols-[70%_30%]">
                <div>
                    <div className="flex flex-col gap-4 py-6 lg:px-6">{children}</div>
                </div>

                {/* Sidebar */}
                <aside className="mt-8">
                    <div className="sticky top-15 flex lg:justify-end">
                        <div className="w-full lg:w-auto">
                            {sidebarContent || <RelatedArticleList onClose={() => {}} articleId={0} />}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ArticleLayout;
