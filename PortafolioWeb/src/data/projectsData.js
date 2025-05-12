import lavacaImg from '../assets/IMG/lavaca.png';
import arcoImg from '../assets/IMG/ARCO.png';
import sypImg from '../assets/IMG/SYP.jpg';
import deudAppImg from '../assets/IMG/deudapp.jpg';
import gonzaloBurgerImg from '../assets/IMG/tareacomida.jpg';
import tareaCrudImg from '../assets/IMG/tareacrud.jpg';

export const projects = [
  {
    id: 1,
    title: "LaVaca",
    description: "Aplicación bancaria comunitaria que permite a usuarios crear metas de ahorro grupales, realizar seguimiento de aportes y gestionar objetivos financieros compartidos.",
    tags: ["React", "CSS", "Supabase"],
    image: lavacaImg,
    demoLink: "https://lavaca.netlify.app/",
    codeLink: "https://github.com/hurtadx/LaVacaReact"
  },
  {
    id: 2, 
    title: "ARCO",
    description: "Aplicación de escritorio para registro y seguimiento de objetos e inventario, desarrollada con React y Electron para proporcionar una experiencia de usuario nativa.",
    tags: ["React", "Electron", "CSS", "Bootstrap"],
    image: arcoImg,
    demoLink: "#",
    codeLink: "https://github.com/hurtadx/Arco_Project"
  },
  {
    id: 3,
    title: "SyP",
    description: "Aplicación móvil personal que funciona como un espacio digital compartido para parejas, con notificaciones personalizadas, mapas de lugares visitados e integración con Spotify.",
    tags: ["React Native", "Expo", "Supabase"],
    image: sypImg,
    demoLink: "#",
    codeLink: "https://github.com/hurtadx/SyP"
  },
  {
    id: 4,
    title: "DeudApp",
    description: "Aplicación web para gestión de deudas personales y familiares que facilita el seguimiento de préstamos, pagos y balances financieros de manera intuitiva y eficiente.",
    tags: ["React", "Vite", "CSS", "LocalStorage"],
    image: deudAppImg,
    demoLink: "https://deudapp.netlify.app",
    codeLink: "https://github.com/hurtadx/DoubtsApp"
  },
  {
    id: 5,
    title: "Gonzalo Burger",
    description: "Aplicación web interactiva para una hamburguesería que permite a los usuarios personalizar y ordenar hamburguesas según sus preferencias, con carrito de compras persistente.",
    tags: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
    image: gonzaloBurgerImg,
    demoLink: "https://gonzaloburger.netlify.app/",
    codeLink: "https://github.com/hurtadx/TareaComida"
  },
  {
    id: 6,
    title: "TareaCrud",
    description: "Aplicación web de gestión de inventario con funcionalidades CRUD completas, estadísticas en tiempo real y exportación a PDF, desarrollada con tecnologías web estándar.",
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "LocalStorage"],
    image: tareaCrudImg,
    demoLink: "https://crudhomework.netlify.app/",
    codeLink: "https://github.com/hurtadx/TareaCrud"
  }
];

export const skillsData = [
  { 
    category: "Lenguajes", 
    skills: ["JavaScript", "HTML", "CSS", "Python", "Java", "Go (Aprendiendo)"] 
  },
  { 
    category: "Frontend", 
    skills: ["React", "Bootstrap", "Responsive Design"] 
  },
  { 
    category: "Backend", 
    skills: ["Node.js", "Express", "Supabase"] 
  },
  { 
    category: "Herramientas", 
    skills: ["Git", "GitHub", "VS Code", "Vite", "Codepen", "Electron"] 
  }
];
