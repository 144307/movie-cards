import { useDispatch } from "react-redux";
import { useState } from "react";
import type { AppDispatch } from "../../store";
// import type { User } from "@supabase/supabase-js";
import { signup, uploadImage } from "../../features/user/userSlice";

function SignupForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(signup({ email, password, file }))
      .unwrap()
      .catch((error) => console.log("component error", error));
  }

  return (
    <div>
      {" "}
      <form onSubmit={handleSignup}>
        <h2>SignupForm</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <input type="submit" value={"Sign up"} />
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
          }}
        />
      </form>
      <input
        type="button"
        onClick={() => {
          // upload profile image
          if (file) {
            dispatch(uploadImage(file));
          } else {
            console.log("no file selected");
          }
        }}
        value={"Upload Profile Image"}
      />
      {file && file.name}
    </div>
  );
}

export default SignupForm;
