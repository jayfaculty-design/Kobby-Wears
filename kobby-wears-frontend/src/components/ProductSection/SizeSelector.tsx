import { ChevronDown } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category?: string;
  img_url: string;
  available: boolean;
  featured: boolean;
  color: string;
  size?: string;
  quantity?: number;
}

interface SizeSelectorProps {
  product: Product;
  selectedSize: string;
  onSizeChange: (size: string) => void;
  sizes: string[];
  disabled?: boolean;
}

const SizeSelector = ({
  selectedSize,
  onSizeChange,
  sizes,
  disabled = false,
}: SizeSelectorProps) => {
  return (
    <div className="relative">
      <div className="text-xs text-neutral-500 mb-1">Size</div>
      <div className={`relative inline-block ${disabled ? "opacity-60" : ""}`}>
        <select
          value={selectedSize}
          onChange={(e) => onSizeChange(e.target.value)}
          disabled={disabled}
          className={`
            appearance-none
            bg-neutral-50
            border
            ${
              disabled
                ? "border-black"
                : "border-neutral-200 hover:border-neutral-400"
            }
            rounded-md
            py-1.5
            pl-3
            pr-8
            text-sm
            font-medium
            focus:outline-none
            focus:ring-2
            focus:ring-primary-color
            focus:border-transparent
            cursor-pointer
            transition-all
            duration-200
            ${disabled ? "cursor-not-allowed" : ""}
          `}
        >
          {sizes.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
};

export default SizeSelector;
