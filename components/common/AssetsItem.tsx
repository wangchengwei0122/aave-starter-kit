import Image from 'next/image';

type AssetsItemProps = {
  symbol: string;
};

export default function AssetsItem({ symbol }: AssetsItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-200">
          <Image src={`/icons/tokens/${symbol}.svg`} alt={symbol} width={32} height={32} />
        </div>
        <div className="text-sm font-medium">{symbol}</div>
      </div>
    </div>
  );
}
