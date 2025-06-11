import ItemsFooter from "./itemFooter";

const Footer = () => {
  return (
    <footer className="bg-default-300 text-muted mt-auto">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <ItemsFooter />
        </div>
        <hr className="border-muted/20" />
        <div className="py-6">
          <p className="text-center text-muted">
            © TOSMOC. Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
