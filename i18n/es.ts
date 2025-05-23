export default {
  common: {
    welcome: "Bienvenido/a",
    loading: "Cargando...",
    error: "Ocurrió un error",
    version: "Versión",
  },
  auth: {
    screenTitle: "Inicio de sesión - Fuerza de ventas",
    toast: {
      text1: "Error de conexión",
      text2: "No se pudo conectar al servidor",
    },
    login: {
      username: "Usuario",
      password: "Contraseña",
      button: "Iniciar sesión",
      signup: "Regístrate",
      toast: {
        text1: "Error de inicio de sesión",
        text2: "Por favor, verifica tus credenciales",
      },
      zod: {
        email: "Correo electrónico inválido",
        password: "La contraseña es obligatoria",
      },
    },
  },
  menu: {
    createTitle: "Crear",
    consultTitle: "Consultar",
    createButton: "Crear pedido",
    registerVisitButton: "Registrar visita",
    getClientsButton: "Clientes",
    recommendationsButton: "Recomendaciones",
    visitRoute: "Ruta de visitas",
  },
  createOrder: {
    screenTitle: "Crear pedido",
    subTitle: "Selecciona los productos que deseas pedir",
    noProducts: "No hay productos disponibles",
    totalLabel: "Total",
    button: "Crear pedido",
    toast: {
      success: {
        text1: "Pedido creado exitosamente",
        text2: "Ahora puedes ver el estado de tu entrega",
      },
      error: {
        text1: "Error al crear el pedido",
        text2: "Por favor, verifica tus datos",
      },
    },
  },
  recommendations: {
    screenTitle: "Recomendaciones",
    permissions: {
      title: "Permisos de cámara",
      text: "Necesitamos acceso a la cámara de tu dispositivo para ofrecerte recomendaciones personalizadas.",
      button: "Permitir acceso a la cámara",
    },
    cameraFaceChange: "Cambiar vista de cámara",
  },
  visits: {
    screenTitle: "Registro de visitas",
    subTitle: "Crea un registro de visita para el cliente seleccionado",
    noVisits: "No hay visitas disponibles",
    visitDate: "Fecha de visita",
    visitDatePlaceholder: "Selecciona una fecha...",
    visitClient: "Cliente",
    visitClientPlaceholder: "Selecciona un cliente...",
    button: "Registrar visita",
    buttonLoading: "Registrando visita...",
    comments: "Comentarios",
    commentsPlaceholder: "Escribe tus comentarios...",
    routes: {
      routeTitle: "Ruta de visitas",
      subTitle: "Ruta de visitas optimizada",
      visitSequence: "Secuencia de visitas",
      routeInfo:
        "Esta es la ruta optimizada para tus visitas. Puedes ver el orden de las visitas y los detalles de cada una.",
      selectDate: "Selecciona una fecha",
      noVisitsPlanned: "No hay visitas programadas",
      noVisitsPlannedDate: "No hay visitas programadas para el ",
    },
  },
  clients: {
    screenTitle: "Clientes registrados",
    noClients: "No hay clientes disponibles",
  },
};
