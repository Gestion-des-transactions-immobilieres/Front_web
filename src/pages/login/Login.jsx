import { useState ,useEffect} from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../../context/ContextProvider";
//import { useUser  } from "../../context/UserProvider";

const Login = () => {
  const [users, setUsers] = useState([]);
  const {  setUser} = useStateContext();
  //const { setUser } = useUser();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3002/utilisateurs");
       // setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (email === "admin@gmail.com" && password === "admin") {
      setErrorMessage("");
      localStorage.setItem('ADMIN', JSON.stringify({email: email, password: password}));
      navigate("/admin");
    }
    try {
      const response=await axios.post("http://localhost:3002/utilisateurs/login",{email,password})
      setUser(response.data);
      if(response.data){
        console.log(response.data);
        navigate("/intermediaire");
      }    
    }
    catch(err){
      console.log(err)
    }
 
    // users.forEach((user) => {
      
    // });
  
    // // Vérification pour l'utilisateur administrateur en dehors de la boucle forEach
    // if (email === "admin@gmail.com" && password === "admin2001") {
    //   setErrorMessage("");
    //   navigate("/admin");
  
    //   // Mise à jour de l'utilisateur courant pour l'administrateur dans le contexte
    //   isUserFound = true;
    // }
  
    // // Si aucun utilisateur correspondant n'est trouvé
    // if (!isUserFound) {
    //   setErrorMessage("Identifiants incorrects");
    // }
  };
  
  

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 login-container">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-10 text-center text-3xl font-extrabold text-gray-900">
          Connectez-vous à votre compte
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10 shadow-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Erreur!</strong>
                <span className="block sm:inline"> {errorMessage}</span>
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Adresse e-mail
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Mot de passe oublié?
                </a>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Se connecter
              </button>
            </div>
          </form>
          {/* <div className="mt-6">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Ou connectez-vous avec
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Connectez-vous avec Facebook</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm2.29 5.71a.75.75 0 011.06 1.06l-.7.7h.01l1.42 1.42a.75.75 0 01-1.06 1.06l-1.42-1.42v-.01l-.71.7a.75.75 0 01-1.06-1.06l.7-.7v-.01l-1.42-1.42a.75.75 0 011.06-1.06l1.42 1.42v.01l.71-.7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Connectez-vous avec Twitter</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm-1.5 13.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm6.364-6.636a.5.5 0 00-.707-.707l-2.828 2.828a.5.5 0 00-.146.354v1.414a.5.5 0 01-.5.5h-.5a.5.5 0 01-.5-.5v-2a.5.5 0 00-.5-.5h-.5a.5.5 0 00-.5.5v2a1.5 1.5 0 001.5 1.5h.5a1.5 1.5 0 001.5-1.5v-1.414l2.828-2.828z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Connectez-vous avec GitHub</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1C4.477 1 0 5.477 0 11c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.338-3.369-1.338-.455-1.155-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.004.07 1.531 1.03 1.531 1.03.89 1.524 2.338 1.084 2.905.829.091-.645.35-1.084.636-1.334-2.22-.252-4.555-1.11-4.555-4.937 0-1.09.39-1.984 1.03-2.682-.104-.253-.448-1.268.098-2.642 0 0 .84-.268 2.75 1.022a9.57 9.57 0 012.492-.336c.847 0 1.698.114 2.492.336 1.91-1.29 2.75-1.022 2.75-1.022.546 1.374.202 2.39.1 2.642.64.698 1.03 1.592 1.03 2.682 0 3.837-2.337 4.682-4.567 4.927.359.308.678.916.678 1.846 0 1.334-.012 2.408-.012 2.732 0 .267.18.578.688.48C17.138 19.165 20 15.418 20 11c0-5.523-4.477-10-10-10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div> */}
          {/* <div className="mt-6">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Vous n'avez pas de compte?
                </span>
              </div>
            </div>

            <div className="mt-2">
              <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Créer un compte
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
