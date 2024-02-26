const getState = ({ getStore, getActions, setStore }) => {
  
  return {
    store: {
      message: null,
      demo: [
        { title: "FIRST", background: "white", initial: "white" },
        { title: "SECOND", background: "white", initial: "white" }
      ],
    },
    actions: {
      signup: async (email, password, navigate) => {
        try {
          const response = await fetch('https://vigilant-enigma-wr7v5vg9w74wc95q5-3000.app.github.dev/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Origin': 'https://vigilant-enigma-wr7v5vg9w74wc95q5-3000.app.github.dev/',
            },
            mode: 'cors',
            body: JSON.stringify({ email, password }),
          });

          if (response.status === 200) {
            // Registro exitoso, redirige a la vista de inicio de sesión
            navigate('/login');
          } else {
            const data = await response.json();
            alert(data.error || 'Error en el servidor');
          }
        } catch (error) {
          alert('Error de red');
        }
      },

      login: async (email, password) => {
        try {
          const response = await fetch('https://vigilant-enigma-wr7v5vg9w74wc95q5-3000.app.github.dev/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem('token', data.token);
            navigate('/private');
          } else {
            const data = await response.json();
            alert(data.error || 'Error en el servidor');
          }
        } catch (error) {
          console.error('Error de red:', error);
          alert('Error de red');
        }
      },

      logout: () => {
        sessionStorage.removeItem('token');
        navigate('/');
      },

      getMessage: async () => {
        try {
          const resp = await fetch('https://vigilant-enigma-wr7v5vg9w74wc95q5-3001.app.github.dev/api/hello');
          if (!resp.ok) {
            throw new Error("Error al obtener el mensaje");
          }

          const data = await resp.json();
          setStore({ message: data.message });

          return data;
        } catch (error) {
          console.log("Error al cargar el mensaje desde el backend", error);
          throw error;
        }
      },
    },
  };
};

export default getState;