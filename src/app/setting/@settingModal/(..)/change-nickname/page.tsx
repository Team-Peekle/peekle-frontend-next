import { SearchParamsType } from '@common/types/routes';

import ChangeNicknameModal from '@features/setting/components/nickname-change/ChangeNicknameModal';

const ChangeNicknameModalPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ newNickname: string }>;
}) => {
  const newNickname = (await searchParams).newNickname;

  return <ChangeNicknameModal newNickname={newNickname} />;
};

export default ChangeNicknameModalPage;
