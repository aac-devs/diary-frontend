import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startAuth, startRegister } from "../../actions/auth.actions";
import { useForm } from "../../hooks/useForm";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useForm({
    name: "Andres Arana C",
    email: "andres@mail.com",
    pass1: "123456",
    pass2: "123456",
  });
  const { name, email, pass1, pass2 } = formValues;

  console.log("----------------Renderiza Register Page");

  const submitRegister = (e) => {
    e.preventDefault();
    if (pass1 !== pass2) {
      alert("Las contraseñas no coinciden");
      return;
    }
    dispatch(startAuth("register", email, pass1, name));
  };

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={submitRegister}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <br />
        <label htmlFor="pass1">Password 1:</label>
        <input
          type="password"
          name="pass1"
          value={pass1}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <br />
        <label htmlFor="pass2">Password 2:</label>
        <input
          type="password"
          name="pass2"
          value={pass2}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <br />
        <input type="submit" value="Send" />
      </form>
      <Link className="link" to="/auth">
        Already registered
      </Link>
    </div>
  );
};
