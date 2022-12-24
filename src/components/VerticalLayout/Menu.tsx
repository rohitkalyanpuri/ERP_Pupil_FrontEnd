interface MenuItemsProps {
  id: number;
  novidade?: any;
  label: string;
  icon?: string;
  link?: string;
  badge?: string;
  badgecolor?: string;
  subItems?: any;
  isHeader?: boolean;
}

const menuItems: Array<MenuItemsProps> = [
  {
    id: 1,
    label: "Dashboards",
    isHeader: true,
  },
  {
    id: 2,
    label: "Sales",
    icon: "monitor",
    link: "/sales",
    // badge:"5+",
    badgecolor: "badge-soft-secondary",
  },
  {
    id: 3,
    label: "Masters",
    isHeader: true,
  },
  {
    id: 4,
    label: "Grades",
    icon: "user",
    link: "/grades",
  },
  {
    id: 5,
    label: "Divisions",
    icon: "user",
    link: "/divisions",
  },
  {
    id: 6,
    label: "Academics",
    icon: "user",
    link: "/academics",
  },
  {
    id: 7,
    label: "Applications",
    isHeader: true,
  },
  {
    id: 8,
    label: "Parents",
    novidade: false,
    icon: "user",
    link: "/#",
    subItems: [
      {
        id: 9,
        label: "All Parents",
        link: "/parents",
        parentId: 8,
      },
      {
        id: 10,
        label: "Import Parent",
        link: "/parent-import",
        parentId: 8,
      },
    ],
  },
  {
    id: 11,
    label: "Students",
    novidade: false,
    icon: "user",
    link: "/#",
    subItems: [
      {
        id: 12,
        label: "All Students",
        link: "/students",
        parentId: 11,
      },
      {
        id: 13,
        label: "Import Students",
        link: "/student-import",
        parentId: 11,
      },
    ],
  },
  {
    id: 14,
    label: "Calendar",
    icon: "calendar",
    link: "/calendar",
  },
];

export { menuItems };
