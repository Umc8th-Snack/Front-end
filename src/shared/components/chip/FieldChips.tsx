interface FieldChipProps {
    label: string;
}

function FieldChip({ label }: FieldChipProps) {
    return (
        <div className="text-18px-semibold bg-main flex h-[35px] w-[100px] items-center justify-center rounded-full text-white lg:w-[107px]">
            {label}
        </div>
    );
}

export default FieldChip;
