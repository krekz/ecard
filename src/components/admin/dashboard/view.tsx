import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LuUser, LuEye, LuTimer, LuTrendingUp } from "react-icons/lu";

type InsightData = {
  current: number | string;
  change: number;
};

type ViewProps = {
  insight: {
    uniqueVisitors?: InsightData;
    totalPageViews?: InsightData;
    averageTime?: InsightData;
    bounceRate?: InsightData;
    newVisitors?: InsightData;
    returningVisitor?: InsightData;
  };
};

const insightConfig = [
  {
    key: "uniqueVisitors",
    title: "Visitors",
    description: "Total number of visitors who have visited your website.",
    icon: LuUser,
  },
  {
    key: "totalPageViews",
    title: "Views",
    description: "Total number pages viewed. Repeated views also counted.",
    icon: LuEye,
  },
  {
    key: "bounceRate",
    title: "Bounce Rate",
    description:
      "The percentage of visitors who quickly exit your website without exploring further.",
    icon: LuTrendingUp,
  },
  {
    key: "averageTime",
    title: "Average Time",
    description: "The average amount of time visitors spend on your website.",
    icon: LuTimer,
  },
];

const InsightCard = ({
  title,
  description,
  icon: Icon,
  data,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  data?: InsightData;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex flex-row justify-between">
        {title} <Icon />
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">
        {data?.current}{title === "Bounce Rate" && data?.current !== undefined ? "%" : ""}
      </p>
    </CardContent>
    <CardFooter>
      <p>{data?.change}%</p>
    </CardFooter>
  </Card>
);

const View = ({ insight }: ViewProps) => {
  return (
    <>
      {insightConfig.map(({ key, title, description, icon }) => (
        <InsightCard
          key={key}
          title={title}
          description={description}
          icon={icon}
          data={insight[key as keyof typeof insight]}
        />
      ))}
    </>
  );
};

export default View;
