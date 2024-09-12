import { Footer } from 'flowbite-react';

const WebSiteFooter = () => {
  return (
    <footer className="w-full">
      <Footer container={true}>
        <div className="w-full text-center">
          <Footer.Copyright href="#" by="Altfitx.com™" year={2024} />
          <Footer.LinkGroup>
            {/*<Footer.Link href="#">About</Footer.Link>*/}
            {/*<Footer.Link href="#">Privacy Policy</Footer.Link>*/}
            {/*<Footer.Link href="#">Licensing</Footer.Link>*/}
            {/*<Footer.Link href="#">Contact</Footer.Link>*/}
          </Footer.LinkGroup>
        </div>
      </Footer>
    </footer>
  );
};

export default WebSiteFooter;
