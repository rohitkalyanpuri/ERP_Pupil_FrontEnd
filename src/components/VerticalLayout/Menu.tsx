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
    label: "Applications",
    isHeader: true,
  },
  {
    id: 4,
    label: "Parents",
    novidade: false,
    icon: "user",
    link: "/#",
    subItems: [
      {
        id: 5,
        label: "All Parents",
        link: "/parents",
        parentId: 4,
      },
      {
        id: 6,
        label: "Parent Import",
        link: "/parent-import",
        parentId: 4,
      },
    ],
  },
  {
    id: 7,
    label: "Students",
    icon: "user",
    link: "/students",
  },
  {
    id: 8,
    label: "Calendar",
    icon: "calendar",
    link: "/calendar",
  },
];

export { menuItems };
