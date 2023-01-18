import "./Avatar.css";

export default function Avatar({ src }) {
  return (
    <div>
      <img src={src} alt="avatar" />
    </div>
  );
}
