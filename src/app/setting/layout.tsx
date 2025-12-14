import DefaultNavbar from '@common/layout/DefaultNavbar.client';
import Footer from '@common/layout/Footer/Footer.client';
import NavBarLayout from '@common/layout/NavbarLayout/NavbarLayout.client';

const EventsLayout = ({
  children,
  settingModal,
}: Readonly<{
  children: React.ReactNode;
  settingModal: React.ReactNode;
}>) => {
  return (
    <NavBarLayout navComponent={<DefaultNavbar />}>
      {children}
      <Footer />
      {settingModal}
    </NavBarLayout>
  );
};

export default EventsLayout;
