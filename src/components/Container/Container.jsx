/* eslint-disable react/prop-types */
function Container({ children }) {
  return (
    <>
      <div className="w-full max-w-[90vw] m-auto px-4">
        {children}
      </div>
    </>
  );
}

export default Container;
