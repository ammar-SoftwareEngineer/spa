export type AppLocale = "en" | "ar";

export type LocalizedText = Record<AppLocale, string>;

export type NavItem = {
  key: string;
  href: string;
  children?: NavItem[];
};

export type SocialLink = {
  name: string;
  href: string;
};

export type SiteData = {
  branding: {
    name: string;
    logo: string;
  };
  contact: {
    phone: string;
    fax?: string;
    email: string;
  };
  social: SocialLink[];
  media: {
    heroVideo: string;
    whoWeAreImage: string;
    missionImage: string;
    visionImage: string;
    teamBannerImage: string;
    isoBannerImage: string;
    servicesPattern: string;
  };
};

export type ServiceItem = {
  icon: string;
  titleKey: string;
  descKey: string;
};

export type CategoryItem = {
  badgeKey: string;
  titleKey: string;
  descKey: string;
  image: string;
  link: string;
};

export type SectorItem = {
  icon: string;
  titleKey: string;
  descKey: string;
};

export type PartnerItem = {
  name: string;
  logo: string;
};

export type BlogPost = {
  id: number;
  date: LocalizedText;
  readTime: LocalizedText;
  category: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  href: string;
  image: string;
};

export type AboutCounter = {
  value: number;
  suffix: string;
  key: string;
  icon: string;
};

export type WhyMetric = {
  id: number;
  titleKey: string;
  descKey: string;
  rawNumber: number;
  textValKey?: string;
  suffix?: string;
  icon?: string;
  isHighlight?: boolean;
  isCta?: boolean;
};

export type TeamMember = {
  id: number;
  nameKey: string;
  roleKey: string;
  image: string;
};
