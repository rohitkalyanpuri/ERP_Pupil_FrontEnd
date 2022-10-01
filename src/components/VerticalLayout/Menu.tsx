interface MenuItemsProps {
    id: number;
    novidade ?: any;
    label: string;
    icon ?: string;
    link ?: string;
    badge?:string;
    badgecolor?:string;
    subItems ?: any;
    isHeader ?: boolean
}

const menuItems: Array<MenuItemsProps> = [
    {
        id: 1,
        label: "Dashboards",
        isHeader : true
    },
    {
        id: 2,
        label: "Sales",
        icon: "monitor",
        link: "/sales",
        // badge:"5+",
        badgecolor:"badge-soft-secondary"
    },
   
    {
        id: 3,
        label: "Applications",
        isHeader : true
    },
    {
        id: 4,
        label: "Parents",
        icon: "user",
        link: "/parents"
    },
    {
        id: 5,
        label: "Students",
        icon: "user",
        link: "/students"
    },
    {
        id: 6,
        label: "Calendar",
        icon: "calendar",
        link: "/calendar"
    },
    
    
];

export { menuItems };
