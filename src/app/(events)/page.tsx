'use client';

import ModalLayout from '@common/components/modal/ModalLayout.client';

import Navbar from '@common/layout/Navbar.client';
import NavBarLayout from '@common/layout/NavbarLayout/NavbarLayout.client';

import Filter from '@features/events/components/Filter/Filter.server';

const EventsPage = () => {
  return (
    <NavBarLayout navComponent={<Navbar />}>
      <ModalLayout>
        <Filter />
      </ModalLayout>
    </NavBarLayout>
  );
};

export default EventsPage;
