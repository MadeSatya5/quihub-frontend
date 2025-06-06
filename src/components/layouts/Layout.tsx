import Footer from "./Footer";
import Navbar from "./Navbar";

function MainLayout({
  children,
  withNavbar,
  withFooter,
  classname,
}: {
  children: React.ReactNode;
  withNavbar: boolean;
  withFooter: boolean;
  classname?: string;
}) {
  return (
    <main className={classname}>
      {withNavbar && <Navbar />}
      {children}
      {withFooter && <Footer />}
    </main>
  );
}

export default MainLayout;
