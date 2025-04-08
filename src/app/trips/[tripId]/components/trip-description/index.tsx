type TripDescriptionProps = {
  description: string;
};

export function TripDescription({ description }: TripDescriptionProps) {
  return (
    <div className="flex flex-col p-4">
      <h2 className="font-semibold text-gray-900">Sobre a viagem</h2>

      <p className="text-xs leading-5 text-gray-900 mt-2.5">{description}</p>
    </div>
  );
}
