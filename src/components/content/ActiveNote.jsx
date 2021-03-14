export const ActiveNote = ({ screen }) => {
  let size = 0;

  if (screen < 768) {
    size = screen - 20;
  } else if (screen < 1100) {
    size = Math.floor((screen - 30) / 2);
  } else {
    size = 500;
  }
  if (size > 500) {
    size = 500;
  }
  if (size < 300) {
    size = 300;
  }

  return (
    <div
      style={{
        width: `${size}px`,
        // minWidth: "300px",
        // maxWidth: "500px",
        border: "1px solid black",
      }}
    >
      <h1>ActiveNote</h1>
    </div>
  );
};
