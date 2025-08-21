type Props = { title: string; desc?: string };

const EmptyState = ({ title, desc }: Props) => {
    return (
        <div className="w-full rounded-lg bg-white px-4 py-8 text-center">
            <p className="text-xl font-semibold text-black">{title}</p>
            {desc ? <p className="text-l mt-3 text-gray-700">{desc}</p> : null}
        </div>
    );
};

export default EmptyState;
