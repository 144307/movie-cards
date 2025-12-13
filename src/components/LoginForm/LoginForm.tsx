import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/user/userSlice";
import type { AppDispatch } from "../../store";
import type { User } from "@supabase/supabase-js";

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  function handleLogin() {
    dispatch(login({ email, password }))
      .unwrap()
      .catch((error) => console.log("component error", error));
  }

  return (
    <form>
      <h2>LoginForm</h2>
      <input type="email" />
      <input type="password" />
      <input type="button" onClick={handleLogin} value={"Sign in"} />
    </form>
  );
}

export default LoginForm;
