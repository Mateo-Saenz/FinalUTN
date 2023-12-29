import { useAuthStore } from '../../hooks/useAuthStore';

export const Navbar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt px-2" />
        {user.name}
      </span>

      <button className="btn btn-outline-danger" onClick={startLogout}>
        <i className="fas fa-sign-out-alt px-2" />
        <span>Salir</span>
      </button>
    </div>
  );
};
