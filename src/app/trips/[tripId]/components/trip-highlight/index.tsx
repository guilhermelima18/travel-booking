import { FaCheckCircle } from "react-icons/fa";

type TripHighlightProps = {
  highlights: string[];
};

export function TripHighlight({ highlights }: TripHighlightProps) {
  if (!highlights) return;

  return (
    <div className="flex flex-col p-4">
      <h2 className="font-semibold text-gray-900">Destaques</h2>

      <div className="grid grid-cols-2 gap-2 mt-2.5">
        {highlights.map((highlight) => (
          <div key={highlight} className="flex items-center gap-1">
            <FaCheckCircle size={14} className="text-purple-600" />
            <p className="text-gray-900 text-xs">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
