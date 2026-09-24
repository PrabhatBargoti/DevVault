const useScrollToSection = () => {
  return (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
};

export default useScrollToSection;
