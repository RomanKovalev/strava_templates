const WebSiteFooter: React.FC = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Altfitx.com™
        </p>
        <div className="mt-2">
          {/*<a href="#" className="text-blue-400 hover:underline mx-2">About</a>*/}
          {/*<a href="#" className="text-blue-400 hover:underline mx-2">Privacy Policy</a>*/}
          {/*<a href="#" className="text-blue-400 hover:underline mx-2">Licensing</a>*/}
          {/*<a href="#" className="text-blue-400 hover:underline mx-2">Contact</a>*/}
        </div>
      </div>
    </footer>
  );
};

export default WebSiteFooter;
