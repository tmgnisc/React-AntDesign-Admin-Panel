import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="bg-white p-4 flex shadow-md">
      <img src={logo} alt="Logo" className="h-10 w-auto" />
    </header>
  );
};

export default Header;
