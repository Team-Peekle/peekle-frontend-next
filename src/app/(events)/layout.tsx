import Footer from '@common/layout/Footer/Footer.client';
import Navbar from '@common/layout/Navbar.client';
import NavBarLayout from '@common/layout/NavbarLayout/NavbarLayout.client';

const EventsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <NavBarLayout navComponent={<Navbar />}>
      {children}
      <Footer />
    </NavBarLayout>
  );
};

export default EventsLayout;
