function Box({ children, className }) {
  return (
    <article className={`box border--rounded ${className}`}>{children}</article>
  );
}

export default Box;
