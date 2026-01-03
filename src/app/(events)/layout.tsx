import DefaultLayout from '@common/layout/DefaultLayout.client';
import Footer from '@common/layout/Footer/Footer.client';
import Navbar from '@common/layout/Navbar.client';

const EventsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <DefaultLayout navComponent={<Navbar />}>{children}</DefaultLayout>;
};

export default EventsLayout;
