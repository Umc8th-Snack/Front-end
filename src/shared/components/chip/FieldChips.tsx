interface FieldChipProps {
    label: string;
}

function FieldChip({ label }: FieldChipProps) {
    return (
        <div className="text-18px-semibold bg-main flex h-[32px] w-[107px] items-center justify-center rounded-full text-white">
            {label}
        </div>
    );
}

export default FieldChip;
