import Button from "@/components/button";

type TripLocationProps = {
  location: string;
};

export function TripLocation({ location }: TripLocationProps) {
  return (
    <div className="flex flex-col p-4">
      <h2 className="font-semibold text-gray-900">Localização</h2>

      <div className="w-full h-[450px] mt-2.5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d16355661.183298014!2d-59.620471310430304!3d-12.139241330081118!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1744153741693!5m2!1spt-BR!2sbr"
          className="w-full h-full"
          loading="lazy"
        />
      </div>

      <p className="text-gray-900  text-sm font-semibold mt-4">{location}</p>
      <Button variant="outlined" className="mt-4">
        Ver no Google Maps
      </Button>
    </div>
  );
}
