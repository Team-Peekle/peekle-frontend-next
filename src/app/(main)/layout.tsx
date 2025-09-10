const EventsLayout = async ({
  children,
  EventsModal,
}: Readonly<{
  children: React.ReactNode;
  EventsModal: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      {EventsModal}
    </>
  );
};

export default EventsLayout;
