import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type LocationProps = {
  locations: {
    city: {
      location: string;
      visits: number;
      country: string;
    }[];
    country: {
      location: string;
      visits: number;
    }[];
  };
};

const Location = ({ locations }: LocationProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row justify-between">
            Location
          </CardTitle>
          <CardDescription className="flex justify-between">
            <span>City</span>
            <span>Visits</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {locations.city.map((city) => (
            <div key={city.location} className="flex flex-row justify-between">
              <p>{city.location}</p>
              <p>{city.visits}</p>
            </div>
          ))}
          <p className="text-2xl font-bold">{}</p>
        </CardContent>
        <CardFooter>
          <p>{}</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default Location;
