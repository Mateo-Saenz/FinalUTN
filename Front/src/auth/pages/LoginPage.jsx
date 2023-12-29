import { useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';
import Swal from 'sweetalert2';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
};

export const LoginPage = () => {
  const { startLogin, startRegister, errorMessage } = useAuthStore();

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  const registerSubmit = (event) => {
    event.preventDefault();
    if (registerPassword !== registerPassword2) {
      Swal.fire('Error en el registro', 'Las contraseñas no son iguales', 'error');
      return;
    }

    if (registerPassword.length < 6 || registerPassword2.length < 6) {
      Swal.fire(
        'Error en el registro',
        'La contraseña debe ser tener al menos 6 caracteres',
        'error',
      );
      return;
    }
    startRegister({
      email: registerEmail,
      password: registerPassword,
      name: registerName,
    });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error al iniciar sesión', errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <div className="container position-absolute top-50 start-50 translate-middle">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3 className="mb-4">Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2 form-floating">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
              <label>Mail</label>
            </div>
            <div className="form-group mb-4 form-floating">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
              <label>Contraseña</label>
            </div>
            <div className="form-group mb-2 text-center">
              <input
                type="submit"
                className="btnSubmit rounded-5 p-3 fs-5"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3 className="mb-4">Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2 form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
              <label>Nombre</label>
            </div>
            <div className="form-group mb-2 form-floating">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
              <label>Mail</label>
            </div>
            <div className="form-group mb-2 form-floating">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
              <label>Contraseña</label>
            </div>

            <div className="form-group mb-4 form-floating">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
              <label>Repita la contraseña</label>
            </div>

            <div className="form-group mb-2 text-center">
              <input
                type="submit"
                className="btnSubmit rounded-5 p-3 fs-5"
                value="Crear cuenta"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
