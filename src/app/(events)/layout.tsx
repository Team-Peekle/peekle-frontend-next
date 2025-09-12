const EventsLayout = ({
  children,
  eventsModal,
}: Readonly<{
  children: React.ReactNode;
  eventsModal: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      {eventsModal}
    </>
  );
};

export default EventsLayout;
