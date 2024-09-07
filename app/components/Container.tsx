interface ContainerProps {
  children: React.ReactNode;
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[1920px] mx-auto xl:px-20 px-4 md:px-2 ">
      {children}
    </div>
  );
};

export default Container;
