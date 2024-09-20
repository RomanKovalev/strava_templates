import powered_by_strava from '../assets/api_logo_pwrdBy_strava_horiz_gray.png'

const WebSiteFooter: React.FC = () => {
  return (
      <footer className="w-full bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center flex items-center justify-center space-x-2">
              <img src={powered_by_strava as string} alt="Powered by Strava" className="h-6"/>
              <p className="text-sm">
                  &copy; {new Date().getFullYear()} Altfitx.com
              </p>
              <a href="/support" className="text-blue-400 text-sm hover:underline mx-2">Support</a>
          </div>
      </footer>

  );
};

export default WebSiteFooter;
