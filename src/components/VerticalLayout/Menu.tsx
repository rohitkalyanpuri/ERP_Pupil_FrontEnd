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
    label: "Applications",
    isHeader: true,
  },
  {
    id: 7,
    label: "Parents",
    novidade: false,
    icon: "user",
    link: "/#",
    subItems: [
      {
        id: 8,
        label: "All Parents",
        link: "/parents",
        parentId: 7,
      },
      {
        id: 9,
        label: "Parent Import",
        link: "/parent-import",
        parentId: 7,
      },
    ],
  },
  {
    id: 10,
    label: "Students",
    icon: "user",
    link: "/students",
  },
  {
    id: 11,
    label: "Calendar",
    icon: "calendar",
    link: "/calendar",
  },
];

export { menuItems };
