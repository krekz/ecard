import { User } from "next-auth";
import { NextFont } from "next/dist/compiled/@next/font";

export type TOrganizers = {
  father: string;
  mother: string;
  bride: string;
  groom: string;
  couple: string;
  phone_number: string;
  heirs?: {
    name?: string;
    phone?: string;
    relation?: string;
  }[];
  name?: string;
  account?: string;
};

export type CardFormProps = {
  dataFromDB?: {
    id?: string;
    father?: string;
    mother?: string;
    bride?: string;
    groom?: string;
    couple?: string;
    phone_number?: string;
    youtube_url?: string | null;
    designId?: string;
    primary_font?: string;
    secondary_font?: string;
    images?: {
      url: string;
    }[];
    // plan: string;
    // heirs?:
    //   | {
    //       id?: number | null;
    //       name?: string | null;
    //       phone_number?: string | null;
    //       relationship?: string | null;
    //       eCardId?: string | null;
    //     }[]
    //   | null;
    donation?: {
      id: number;
      bank: string | null;
      qrCode: string | null;
      eCardId: string | null;
      acc_name: string | null;
      acc_number: string | null;
    } | null;
    event?: {
      id: number;
      date: Date;
      address: string;
      gMap?: string | null;
      program?: {
        name?: string | null;
        start_time?: string | null;
      }[];
      venue: string;
      greeting: string;
    } | null;
    Design?: {
      designId: string;
      category: string;
      name: string;
      front_design_url: string;
      content_design_url: string;
    };
  };

  user?: User | undefined;
};

export type TFonts = {
  id: string;
  font: NextFont;
  name: string;
};

export type TLogLib = {
  insight: {
    uniqueVisitors: {
      current: number;
      change: number; // this is a change from comparable time range in the past.
    };
    totalPageViews: {
      current: number;
      change: number;
    };
    averageTime: {
      current: string;
      change: number;
    };
    bounceRate: {
      current: number;
      change: number;
    };
    newVisitors: {
      current: number;
      change: number;
    };
    returningVisitor: {
      current: number;
      change: number;
    };
  };
  data: {
    pages: {
      page: string;
      visits: number;
    }[];
    devices: {
      device: string;
      visits: number;
    }[];
    referrer: {
      referrer: string;
      visits: number;
      referrerDomain: string;
    }[];
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
    os: {
      os: string;
      visits: number;
    }[];
    browser: {
      browser: string;
      visits: number;
    }[];
    utmSources: {
      utmSource: string;
      visits: number;
    }[];
    utmCampaigns: {
      utmCampaign: string;
      visits: number;
    }[];
    onlineVisitors: number;
  };
  graph: {
    uniqueVisitorsByDate: {
      date: string;
      visits: number;
    }[];
    uniqueSessionByDate: {
      date: string;
      visits: number;
    }[];
  };
};
