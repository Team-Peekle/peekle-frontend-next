import DefaultLayout from '@common/layout/DefaultLayout.client';
import DefaultNavbar from '@common/layout/DefaultNavbar.client';

const EventsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <DefaultLayout navComponent={<DefaultNavbar />}>{children}</DefaultLayout>;
};

export default EventsLayout;
