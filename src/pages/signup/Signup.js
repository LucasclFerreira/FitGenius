import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

// styles
import "./Signup.css";

export default function Signup() {
  const { signup, error, isPending } = useSignup();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    setThumbnailError(null);

    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError("Please select an image");
      return;
    }

    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }

    if (selected.size > 10000000) {
      setThumbnailError("Image file size must be less than 10Mb");
      return;
    }

    setThumbnail(selected);
    console.log("thumbnail state setted!");
  };

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Display name:</span>
          <input
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            required
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </label>
        <label>
          <span>Thumbnail:</span>
          <input type="file" onChange={handleFileChange} required />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
        {!isPending && <button className="btn">Submit</button>}
        {isPending && (
          <button className="btn" disabled>
            Loading...
          </button>
        )}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
