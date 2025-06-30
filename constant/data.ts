import { BarChart3, Briefcase, Mail, Settings, User } from "lucide-react";

export const adminLeftMenus = [
    { icon: BarChart3, label: "Dashboard", link:'/admin/dashboard', active: true },
    { icon: Briefcase, label: "Projects", link:'/admin/projects' },
    { icon: User, label: "Profile", link:'/admin/profile' },
    { icon: Mail, label: "Messages", link:'/admin/messages' },
    { icon: Settings, label: "Settings", link:'/admin/setting' },
]