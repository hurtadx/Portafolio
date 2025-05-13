import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const extendedDetails = {
  "LaVaca": {
    description: `LaVaca es una página bancaria comunitaria que permite:
      • Crear metas de ahorro grupales entre amigos
      • Seguimiento de aportes individuales
      • Visualización del progreso hacia objetivos financieros
      • Gestión de fechas límite
      • Sistema de invitaciones para nuevos participantes`,
    features: [
      "Autenticación completa (Login/Registro/Verificación)",
      "Interfaz mejorada con diseño responsivo",
      "Dashboard interactivo con visualización de vacas",
      "Sistema de alerta para próximos pagos",
      "Dashboard inteligente que muestra la última vaca visitada"
    ],
    technologies: [
      "React",
      "CSS avanzado con efectos",
      "Supabase (Base de datos y Autenticación)",
      "Vite para desarrollo"
    ]
  },
  "ARCO": {
    description: `ARCO es una aplicación de escritorio para registro de objetos que permite:
      • Gestionar inventario de equipos informáticos
      • Documentar movimientos y cambios de equipamiento
      • Almacenar datos en archivos Excel
      • Interfaz adaptable con modo claro/oscuro
      • Generación de reportes de movimientos`,
    features: [
      "Gestión de cambios de equipamiento",
      "Inventario y seguimiento de equipos",
      "Exportación de datos a Excel",
      "Personalización con temas claro/oscuro",
      "Aplicación nativa para Windows"
    ],
    technologies: [
      "React",
      "Electron",
      "Bootstrap",
      "CSS",
      "Vite"
    ]
  },
  "SyP": {
    description: `Sal y Pimienta (SyP) es una aplicación personal creada como un espacio digital para parejas que permite:
      • Enviar notificaciones personalizadas
      • Marcar y recordar lugares visitados juntos
      • Integración con Spotify para guardar canciones significativas
      • Ruleta interactiva para decisiones aleatorias
      • Galería de momentos compartidos con fotos de recuerdos`,
    features: [
      "Notificaciones personalizadas entre parejas",
      "Mapas interactivos para marcar lugares significativos",
      "Integración completa con API de Spotify",
      "Ruleta de la fortuna para decisiones aleatorias",
      "Galería de recuerdos con imágenes compartidas"
    ],
    technologies: [
      "React Native con Expo",
      "Supabase para backend",
      "React Navigation",
      "React Native Maps",
      "Spotify Web API & Remote",
      "React Native Snap Carousel",
      "React Native Reanimated"
    ],
    note: "Proyecto en pausa hasta adquirir licencia de Apple Developer para despliegue en iOS"
  },
  "DeudApp": {
    description: `DeudApp es una aplicación web para el seguimiento de deudas personales que permite:
      • Registrar préstamos y deudas con familiares y amigos
      • Hacer seguimiento de pagos parciales o completos
      • Visualizar resúmenes financieros con totales prestados y pendientes
      • Filtrar deudas por estado (pendientes/pagadas)
      • Gestionar la información financiera familiar de forma organizada`,
    features: [
      "Registro intuitivo de deudas con descripción, monto y fecha",
      "Sistema de seguimiento de pagos parciales y completos",
      "Panel de resumen financiero con estadísticas",
      "Interfaz adaptativa para todos los dispositivos",
      "Almacenamiento local persistente sin necesidad de registro"
    ],
    technologies: [
      "React",
      "Vite",
      "CSS personalizado",
      "LocalStorage para persistencia de datos",
      "Arquitectura de componentes reutilizables"
    ],
    note: "Proyecto desarrollado para una necesidad familiar real, actualmente en proceso de añadir sincronización entre dispositivos"
  },
  "Gonzalo Burger": {
    description: `Gonzalo Burger es una aplicación web interactiva para una hamburguesería que permite a los usuarios:
      • Personalizar completamente sus hamburguesas seleccionando ingredientes
      • Visualizar en tiempo real su creación con imágenes representativas
      • Calcular automáticamente el precio según las selecciones
      • Gestionar un carrito de compras con persistencia entre sesiones
      • Elegir entre hamburguesas predefinidas o crear su propia combinación`,
    features: [
      "Sistema de personalización modular con selección de pan, carne, quesos, vegetales y salsas",
      "Carrito de compras avanzado con persistencia en localStorage",
      "Cálculo dinámico de precios con formateo en moneda colombiana",
      "Diseño responsive optimizado para móviles, tablets y escritorio",
      "Notificaciones visuales con animaciones para mejorar la experiencia de usuario"
    ],
    technologies: [
      "HTML5 semántico",
      "CSS3 avanzado con variables, flexbox y grid",
      "JavaScript vanilla ES6+ sin frameworks",
      "LocalStorage API para persistencia de datos",
      "Arquitectura modular con patrones de diseño optimizados"
    ],
    note: "Proyecto desarrollado como aplicación web completa con enfoque en la experiencia de usuario y optimizaciones de rendimiento para dispositivos móviles"
  },
  "TareaCrud": {
    description: `TareaCrud es una aplicación web de gestión de inventario que permite:
      • Administrar productos con operaciones CRUD completas
      • Filtrar productos por nombre o precio 
      • Exportar inventario a formato PDF
      • Visualizar estadísticas en tiempo real
      • Alternar entre modo claro y oscuro`,
    features: [
      "Formulario completo para añadir y editar productos",
      "Tabla de visualización con opciones de edición y eliminación",
      "Sistema de filtrado para búsquedas rápidas",
      "Dashboard con estadísticas de productos y valor total",
      "Generación de reportes en PDF del inventario actual",
      "Almacenamiento persistente con localStorage"
    ],
    technologies: [
      "HTML5 semántico",
      "CSS3 con variables personalizadas",
      "JavaScript ES6+",
      "Bootstrap 5.3.3 para interfaz responsive",
      "Font Awesome para iconos",
      "jsPDF para generación de reportes",
      "Google Fonts (Poppins)"
    ],
    note: "Proyecto desarrollado para evaluación en mi clase de frontend II, implementando patrones de diseño y manejo de estado en aplicaciones web"
  }
};

const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const hasExtendedDetails = project.title in extendedDetails;
  const details = hasExtendedDetails ? extendedDetails[project.title] : null;
  
  const imageHeight = window.innerWidth < 480 ? '160px' : 
                      window.innerWidth < 768 ? '180px' : '200px';
  
  const handleImageError = () => {
    console.error(`Failed to load image: ${project.image}`);
    setImageError(true);
    
    if (project.image.startsWith('/src/assets/')) {
      const img = document.createElement('img');
      img.src = "https://via.placeholder.com/800x450?text=Imagen+no+disponible";
      img.alt = project.title;
      img.onload = () => setImageLoaded(true);
      img.className = "fallback-image";
      document.querySelector(`[alt="${project.title}"]`)?.parentNode.appendChild(img);
    }
  };
  
  const toggleDetails = () => setShowDetails(!showDetails);
  
  return (
    <motion.div 
      className="project-card"
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="project-image" style={{ height: imageHeight }}>
        {!imageLoaded && !imageError && (
          <div className="image-placeholder">
            <div className="loading-spinner"></div>
          </div>
        )}
        
        <img 
          src={project.image} 
          alt={project.title}
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          style={{ 
            opacity: imageLoaded && !imageError ? 1 : 0,
            display: imageError ? 'none' : 'block'
          }}
        />
        
        <div className="project-links">
          {project.demoLink !== "#" && (
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer">Demo</a>
          )}
          {project.codeLink !== "#" && (
            <a href={project.codeLink} target="_blank" rel="noopener noreferrer">Código</a>
          )}
        </div>
      </div>
      
      <div className="project-info">
        <h3>{project.title}</h3>
        
        {hasExtendedDetails && showDetails ? (
          <div className="extended-details">
            <p>{details.description}</p>
            
            <div className="detail-section">
              <h4>Características</h4>
              <ul>
                {details.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="detail-section">
              <h4>Tecnologías</h4>
              <ul>
                {details.technologies.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </div>
            
            {details.note && (
              <div className="detail-section project-note">
                <p><strong>Nota:</strong> {details.note}</p>
              </div>
            )}
            
            <button 
              className="details-toggle"
              onClick={toggleDetails}
            >
              Ver menos
            </button>
          </div>
        ) : (
          <>
            <p>{project.description}</p>
            {hasExtendedDetails && (
              <button 
                className="details-toggle"
                onClick={toggleDetails}
              >
                Ver más detalles
              </button>
            )}
          </>
        )}
        
        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
