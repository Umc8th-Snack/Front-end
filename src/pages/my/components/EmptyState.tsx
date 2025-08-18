type Props = { title: string; desc?: string };

const EmptyState = ({ title, desc }: Props) => {
    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white px-4 py-8 text-center">
            <p className="text-base font-semibold text-gray-800">{title}</p>
            {desc ? <p className="mt-1 text-sm text-gray-500">{desc}</p> : null}
        </div>
    );
};

export default EmptyState;
