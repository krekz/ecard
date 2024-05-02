import { Button } from "@/components/ui/button";
import { subscriptionPlans } from "@/lib/constant";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const PricingPage = () => {
  return (
    <div className="container p-10 space-y-8 ">
      <h1 className="text-5xl font-semibold text-center">Pricing</h1>
      <div className="flex justify-center gap-5 flex-wrap">
        {subscriptionPlans.map(({ name, price, defaultStyling, features }) => (
          <Card
            key={name}
            className={`w-[28rem] flex flex-col p-5 gap-5 ${defaultStyling}`}
          >
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <p className="text-3xl font-bold">{price}</p>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2">
                {features.map(({ feature, included, icon }, index) => (
                  <li
                    key={index}
                    className={`flex gap-2 items-center font-medium ${
                      included ? "" : "text-muted-foreground"
                    }`}
                  >
                    {icon}
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="min-w-full">
              <Button className="w-full">Subscribe</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
