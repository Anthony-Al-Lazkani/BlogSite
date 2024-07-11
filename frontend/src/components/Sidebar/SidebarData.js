import { FaHome,
        FaBlog,
        FaQuestion ,
 } from "react-icons/fa";
 import { GoLaw } from "react-icons/go";
 import { FaMessage } from "react-icons/fa6";

export const SidebarData = [
    {
        title : "Home",
        icon : <FaHome />,
        link : "/Home"
    },
    {
        title : "Blogs",
        icon : <FaBlog />,
        link : "/Home"
    },
    {
        title : "Contact Us",
        icon : <FaMessage  />,
        link : "/Home"
    },
    {
        title : "QnA",
        icon : <FaQuestion  />,
        link : "/Home"
    },
    {
        title : "Privacy Policy",
        icon : <GoLaw  />,
        link : "/Home"
    },
]