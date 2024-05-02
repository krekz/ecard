// Home Page
export const cardsData = [
  {
    title: "Step 1",
    description: "Card Description",
    content:
      "Choose your favourite design template from our exclusive catalogue",
    hasButton: true,
  },
  {
    title: "Step 2",
    description: "Card Description",
    content:
      "Fill in the informations about your upcoming event (wedding, open house , etc..)",
    hasButton: false,
  },
  {
    title: "Step 3",
    description: "Card Description",
    content:
      "Submit your payment after you've done. And voila you can now share your e-card to your guest live !",
    hasButton: false,
  },
];

export const sectionsData = [
  {
    imageSource: "/modern-design.svg",
    imageAlt: "modern-design",
    title: "Breath-taking Designs",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil quisquam expedita suscipit, quaerat id ipsum repellendus, deleniti earum, vero in error optio architecto obcaecati possimus accusamus alias doloribus cum quo consequuntur maiores sapiente? Possimus temporibus modi, enim, ducimus doloribus ipsa pariatur exercitationem reiciendis, qui tempore at iste architecto sint veniam.",
    imagePosition: "left",
  },
  {
    imageSource: "/delivered.svg",
    imageAlt: "delivered",
    title: "Instant Delivery",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda laborum odit possimus provident, sunt neque a explicabo. Dolore, tenetur placeat distinctio quibusdam quisquam dolorem quos omnis, inventore officia reiciendis perferendis numquam ea itaque atque corrupti nihil aut nostrum quam repellendus excepturi facilis ad. Minus exercitationem eum provident excepturi impedit voluptatem!",
    imagePosition: "right",
  },
  {
    imageSource: "/relaxing.svg",
    imageAlt: "relax",
    title: "Time and Cost Saving",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, assumenda! Numquam facere dolor iusto eveniet sed laborum quia quaerat aspernatur id temporibus rem, non, ullam mollitia enim soluta. Accusantium odit vitae voluptates molestias, sunt sapiente vero nemo autem est suscipit, neque sequi sint ea nostrum, id eaque temporibus asperiores natus!",
    imagePosition: "left",
  },
];
//End of Home Page


// Catalog Page 
//Filter by section
export const checkboxList = [
  {
    id: "wedding",
    label: "Wedding (5)",
  },
  {
    id: "celebration",
    label: "Celebration (5)",
  },
];

//Card Item Section
export interface CardItem {
  id: string;
  title: string;
  category: "Wedding" | "Celebration";
  image: string;
  width: number;
  height: number;
  alt: string;
  isPopular: boolean;
  isNewest: boolean;
}


export const cardList: CardItem[] = [
  {
    id: "1",
    title: "WED-1",
    category: "Wedding",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: false,
    isNewest: false,
  },
  {
    id: "2",
    title: "WED-2",
    category: "Wedding",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: true,
    isNewest: false,

  },
  {
    id: "3",
    title: "WED-3",
    category: "Wedding",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: true,
    isNewest: false,

  },
  {
    id: "4",
    title: "WED-4",
    category: "Wedding",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: false,
    isNewest: false,

  },
  {
    id: "5",
    title: "WED-5",
    category: "Wedding",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: true,
    isNewest: true,

  },
  {
    id: "6",
    title: "RAY-6",
    category: "Celebration",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: false,
    isNewest: true,
  },
  {
    id: "7",
    title: "RAY-7",
    category: "Celebration",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: false,
    isNewest: true,
  },
  {
    id: "8",
    title: "RAY-8",
    category: "Celebration",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: true,
    isNewest: false,
  },
  {
    id: "9",
    title: "RAY-9",
    category: "Celebration",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: false,
    isNewest: false,
  },
  {
    id: "10",
    title: "RAY-10",
    category: "Celebration",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: false,
    isNewest: false,
  },
];
// End of Catalog Page


// Pricing Page
import { LuCheck, LuX } from "react-icons/lu";
import { IconType } from "react-icons/lib";

interface PlanItem {
  name: string;
  price: string;
  defaultStyling: string;
  features: FeatureItem[];
}

interface FeatureItem {
  feature: string;
  included: boolean;
  icon: React.ReactElement<IconType>;
}

export const subscriptionPlans: PlanItem[] = [
  {
    name: "Basic",
    price: "RM30",
    defaultStyling: "shadow-md",
    features: [
      { feature: "Music", included: true, icon: <LuCheck /> },
      { feature: "Donation", included: true, icon: <LuCheck /> },
      { feature: "Calendar", included: true, icon: <LuCheck /> },
      { feature: "Location", included: true, icon: <LuCheck /> },
      { feature: "Contact", included: true, icon: <LuCheck /> },
      { feature: "RSVP", included: false, icon: <LuX /> },
      { feature: "Gift", included: false, icon: <LuX /> },
    ],
  },
  {
    name: "Premium",
    price: "RM50",
    defaultStyling:
      "border-yellow-400 border-4 scale-105 before:content-['RECOMMENDED'] before:bg-yellow-400 before:text-center before:w-1/2 before:mx-auto before:rounded-lg before:py-1 before:text-white before:font-bold",
    features: [
      { feature: "Music", included: true, icon: <LuCheck /> },
      { feature: "Gallery", included: true, icon: <LuCheck /> },
      { feature: "Donation", included: true, icon: <LuCheck /> },
      { feature: "Calendar", included: true, icon: <LuCheck /> },
      { feature: "Location", included: true, icon: <LuCheck /> },
      { feature: "Contact", included: true, icon: <LuCheck /> },
      { feature: "RSVP", included: true, icon: <LuCheck /> },
      { feature: "Gift", included: true, icon: <LuCheck /> },
    ],
  },
];

// End of Pricing Page