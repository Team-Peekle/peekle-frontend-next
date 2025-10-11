import Footer from '@common/layout/Footer/Footer.client';
import Navbar from '@common/layout/Navbar.client';
import NavBarLayout from '@common/layout/NavbarLayout/NavbarLayout.client';

const EventsLayout = ({
  children,
  eventsModal,
}: Readonly<{
  children: React.ReactNode;
  eventsModal: React.ReactNode;
}>) => {
  return (
    <NavBarLayout navComponent={<Navbar />}>
      {children}
      <Footer />
      {eventsModal}
    </NavBarLayout>
  );
};

export default EventsLayout;
