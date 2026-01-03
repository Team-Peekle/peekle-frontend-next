import DefaultNavbar from '@common/layout/DefaultNavbar.client';
import Footer from '@common/layout/Footer/Footer.client';
import NavBarLayout from '@common/layout/NavbarLayout/NavbarLayout.client';

const EventsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <NavBarLayout navComponent={<DefaultNavbar />}>
      {children}
      <Footer />
    </NavBarLayout>
  );
};

export default EventsLayout;
