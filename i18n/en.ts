// This file contains the English translations for the application.
export default {
  common: {
    welcome: "Welcome",
    loading: "Loading...",
    error: "An error occurred",
    version: "Version",
  },
  auth: {
    screenTitle: "Login - sales force",
    toast: {
      text1: "Connection error",
      text2: "Could not connect to the server",
    },
    login: {
      username: "Username",
      password: "Password",
      button: "Login",
      signup: "Sign up",
      toast: {
        text1: "Login error",
        text2: "Please check your credentials",
      },
      zod: {
        email: "Invalid email",
        password: "Password is required",
      },
    },
  },
  menu: {
    createTitle: "Create",
    consultTitle: "Consult",
    createButton: "Create order",
    registerVisitButton: "Register visit",
    getClientsButton: "Clients",
    recommendationsButton: "Recommendations",
    visitRoute: "Visit route",
  },
  createOrder: {
    screenTitle: "Create order",
    subTitle: "Select the products you want to order",
    noProducts: "No products available",
    totalLabel: "Total",
    button: "Create order",
    toast: {
      success: {
        text1: "Order created successfully",
        text2: "You can now view your orders",
      },
      error: {
        text1: "Error creating order",
        text2: "Please check your data",
      },
    },
  },
  recommendations: {
    screenTitle: "Recommendations",
    permissions: {
      title: "Camera access",
      text: "We need your permission to access the camera and offer you customized recommendations",
      button: "Allow camera access",
    },
    cameraFaceChange: "Change camera view",
  },
  visits: {
    screenTitle: "Register visits",
    subTitle: "Create a new visit",
    noVisits: "No visits available",
    visitDate: "Visit date",
    visitDatePlaceholder: "Select a date...",
    visitClient: "Client",
    visitClientPlaceholder: "Select a client...",
    button: "Register visit",
    buttonLoading: "Registering visit...",
    comments: "Comments",
    commentsPlaceholder: "Write your comments...",
    visitsHistory: "Visit history",
    routes: {
      routeTitle: "Visits route",
      subTitle: "Optimized route for your visits",
      visitSequence: "Visit sequence",
      routeInfo:
        "This route has been optimized for you to minimize travel time and maximize the number of visits.",
      selectDate: "Select a date",
      noVisitsPlanned: "No visits planned",
      noVisitsPlannedDate: "No visits planned for ",
    },
  },
  clients: {
    screenTitle: "Registered clients",
    noClients: "No clients available",
  },
};
