import {
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiNextdotjs,
  SiFramer,
  SiReact,
  SiPhp,
  SiMysql,
  SiBootstrap,
  SiFigma,
  SiVercel,
} from "react-icons/si";

const iconSize = 24;

export const ProjectList = [
  {
    id: 5,
    title: "Contacts App",
    description:
      "contact app is an app that provides phone number identification service. With this application, users can view the tags or names of stored phone numbers",
    slug: "Contacts-App",
    link_demo: "https://react-contact-apps.vercel.app/",
    link_github: "https://github.com/zidanabbas/react-contact-apps",
    tech_stack: [
      {
        title: "Reactjs",
        icon: <SiReact size={iconSize} />,
      },
      {
        title: "Javascript",
        icon: <SiJavascript size={iconSize} className="text-yellow-400" />,
      },
    ],

    tooltip: ["React.js", "Javascript"],
    aos_delay: 200,

    image:
      "https://res.cloudinary.com/dlshk9mf6/image/upload/v1703868727/abbasImage/yhvsujxbsvgcerk5yaiy.png",
    is_show: true,
    is_featured: true,
    params: {
      slug: "contact-app",
    },
  },
  {
    id: 4,
    title: "abbasDev Personal Website v2",
    description:
      "Personal website and portfolio built with Next Js, Javascript and Tailwind CSS",
    slug: "abbasDev-Personal-Website-v2",
    link_demo: "https://abbasdev.vercel.app/",
    link_github: "https://github.com/zidanabbas/abbasDev-v2",
    tech_stack: [
      {
        title: "Nextjs",
        icon: <SiNextdotjs size={iconSize} />,
      },
      {
        title: "TailwindCSS",
        icon: <SiTailwindcss size={iconSize} className="text-cyan-300" />,
      },
      {
        title: "Javascript",
        icon: <SiJavascript size={iconSize} className="text-yellow-400" />,
      },
      {
        title: "Framer",
        icon: <SiFramer size={iconSize} />,
      },
    ],

    tooltip: ["Next.js", "Tailwind CSS", "Javascript", "Framer Motion"],
    aos_delay: 200,

    image:
      "https://res.cloudinary.com/dlshk9mf6/image/upload/v1703868903/abbasImage/orfvc86wua68pkvhrtdu.png",
    is_show: true,
    is_featured: true,
    params: {
      slug: "abbasdev-v2",
    },
  },
  {
    id: 3,
    title: "Reservation Hotel at Krakatau Kahai Beach Resort Hotel Lampung",
    description:
      "This is a hotel reservation website that I created while working on my final project.",
    slug: "krakatau-kahai-beach-resort-hotel-lampung",
    link_demo: "https://kahaibeachresort.com/",
    link_github: "https://github.com/zidanabbas/kahai-beach-resort",
    tech_stack: [
      {
        title: "Php",
        icon: <SiPhp size={iconSize} className="text-blue-800" />,
      },
      {
        title: "Bootstrap",
        icon: <SiBootstrap size={iconSize} className="text-purple-500" />,
      },
      {
        title: "Figma",
        icon: <SiFigma size={iconSize} />,
      },
      {
        title: "Mysql",
        icon: <SiMysql size={iconSize} className="text-purple-900" />,
      },
      {
        title: null,
        icon: null,
      },
    ],

    tooltip: ["Php", "Bootstrap", "Figma"],
    aos_delay: 400,

    image:
      "https://res.cloudinary.com/dlshk9mf6/image/upload/v1703869341/abbasImage/cstvlcyzinrc5hkb8sjo.png",
    is_show: true,
    is_featured: true,
    params: {
      slug: "krakatau-kahai-beach-resort-hotel-lampung",
    },
  },
  {
    id: 2,
    title: "v1 Abbas Personal Website",
    description:
      "This is my first personal website, which I created for my personal branding needs .",
    slug: "v1-Abbas-Personal-Website",
    link_demo: "https://zidanabbas.vercel.app/",
    link_github: "https://github.com/zidanabbas/PersonalWebsite-ZidaneAbbas",
    tech_stack: [
      {
        title: "HTML",
        icon: <SiHtml5 size={iconSize} className="text-orange-500" />,
      },
      {
        title: "TailwindCSS",
        icon: <SiTailwindcss size={iconSize} className="text-cyan-300" />,
      },
      {
        title: null,
        icon: null,
      },
      {
        title: null,
        icon: null,
      },
    ],

    tooltip: ["HTML", "Tailwind CSS"],
    aos_delay: 600,
    image:
      "https://res.cloudinary.com/dlshk9mf6/image/upload/v1703869616/abbasImage/af1zusni4duafzj5y2o7.png",
    is_show: true,
    is_featured: false,
    params: {
      slug: "abbasdev-v1",
    },
  },
  {
    id: 1,
    title: "Note App",
    description:
      "This is a project notes application that I made while studying at Dicoding Academy Indonesia. Where this note project uses the React JS library and implements Crud and also has an archive feature.",
    slug: "Note-App",
    link_demo: "https://note-app-v1.vercel.app/",
    link_github: "https://github.com/zidanabbas/Note-App",
    tech_stack: [
      {
        title: "React JS",
        icon: <SiReact size={iconSize} className="text-purple-700" />,
      },
      {
        title: "Javascript",
        icon: <SiJavascript size={iconSize} className="text-yellow-400" />,
      },
      {
        title: "HTML",
        icon: <SiHtml5 size={iconSize} className="text-blue-500" />,
      },
      {
        title: "Vercel",
        icon: <SiVercel size={iconSize} />,
      },
    ],

    tooltip: ["React JS", "JavaScript", "HTML", "Vercel"],
    aos_delay: 800,
    image:
      "https://res.cloudinary.com/dlshk9mf6/image/upload/v1703870188/abbasImage/ucohfhrkgts2up6qwtga.png",
    is_show: true,
    is_featured: false,
    params: {
      slug: "note-app",
    },
  },
  {
    id: 0,
    title: "todo-list",
    description:
      "This is a project todo list application that I created while studying at Dicoding Academy Indonesia. Where this todo list project can create unread and read notes and also has a what has been done and what has not been done.",
    slug: "todo-list-abbas",
    link_demo: "https://project-todo-list-v1.vercel.app/",
    link_github: "hhttps://github.com/zidanabbas/todo-list",
    tech_stack: [
      {
        title: "React JS",
        icon: <SiReact size={iconSize} className="text-purple-700" />,
      },
      {
        title: "Javascript",
        icon: <SiJavascript size={iconSize} className="text-yellow-400" />,
      },
      {
        title: "HTML",
        icon: <SiHtml5 size={iconSize} className="text-blue-500" />,
      },
      {
        title: "Vercel",
        icon: <SiVercel size={iconSize} />,
      },
    ],

    tooltip: ["React JS", "JavaScript", "HTML", "Vercel"],
    aos_delay: 800,
    image:
      "https://res.cloudinary.com/dlshk9mf6/image/upload/v1704360297/mobile_19_tfag4s.png",
    is_show: true,
    is_featured: false,
    params: {
      slug: "todo-list",
    },
  },
];
