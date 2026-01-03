'use client';

import { Suspense } from 'react';

import { ScrapLineColorType, WriteType } from '@common/types/btn';
import { ChipType } from '@common/types/chip';
import { DropdownType } from '@common/types/dropdown';
import { PopupType } from '@common/types/popup';

import Footer from '@common/layout/Footer/Footer.client';

import Category from '@common/components/CategoryMenu/CategoryMenu.client';
import Chip from '@common/components/Chip/Chip.client';
import Popup from '@common/components/Popup.server';
import Bookmark from '@common/components/btn/Bookmark/Bookmark.client';
import Cta from '@common/components/btn/Cta/Cta.client';
import Dropdown from '@common/components/btn/Dropdown/Dropdown.client';
import Heart from '@common/components/btn/Heart/Heart.client';
import Post from '@common/components/btn/Post/Post.client';
import Scrap from '@common/components/btn/Scrap/Scrap.client';
import ScrapFilled from '@common/components/btn/ScrapFilled/ScrapFilled.client';
import ScrapLine from '@common/components/btn/ScrapLine/ScrapLine.client';
import Select from '@common/components/btn/Select/Select.client';
import Share from '@common/components/btn/Share/Share.client';
import Write from '@common/components/btn/Write/Write.client';
import Tabs from '@common/components/tabs/Tabs.client';

import TermsAgreementModal from '@features/sign/components/TermsAgreementModal';

const JoyTestClientPage = () => {
  const handleClick = () => {
    alert('버튼 클릭됨');
  };

  return (
    <Suspense>
      <div className="p-10pxr gap-10pxr flex flex-col bg-[#009A04]">
        <Cta text="text" onClick={handleClick} />
        <Cta text="text" disabled onClick={handleClick} />
        <Write writeType={WriteType.V1} onClick={handleClick} />
        <Write writeType={WriteType.V2} onClick={handleClick} />
        <Select
          text="title"
          isSelected={true}
          onStateChange={(newState, text, oldState) => {
            console.log('새상태:', newState, '텍스트:', text, '이전상태:', oldState);
          }}
        />
        <ScrapFilled
          isScrapped={false}
          onStateChange={(newState, oldState) => {
            console.log('새상태:', newState, '이전상태:', oldState);
          }}
        />
        <ScrapLine
          isScrapped={false}
          color={ScrapLineColorType.GRAY}
          onStateChange={(newState, oldState) => {
            console.log('새상태:', newState, '이전상태:', oldState);
          }}
        />
        <ScrapLine
          isScrapped={false}
          color={ScrapLineColorType.WHITE}
          onStateChange={(newState, oldState) => {
            console.log('새상태:', newState, '이전상태:', oldState);
          }}
        />
        <Scrap
          isScrapped={false}
          onStateChange={(newState, oldState) => {
            console.log('새상태:', newState, '이전상태:', oldState);
          }}
        />
        <Post disabled onClick={handleClick} />
        <Post onClick={handleClick} />
        <Heart
          isLiked={true}
          likeCount={1}
          onStateChange={(newState, liked, likeCnt) => {
            console.log('새상태:', newState, '이전상태:', liked, '좋아요 개수:', likeCnt);
          }}
        />
        <Heart
          isLiked={true}
          onStateChange={(newState, liked, likeCnt) => {
            console.log('새상태:', newState, '이전상태:', liked, '좋아요 개수:', likeCnt);
          }}
        />
        <Popup
          type={PopupType.VAR1}
          title="content"
          leftText="text1"
          rightText="text2"
          onLeft={() => console.log('왼쪽 클릭')}
          onRight={() => console.log('오른쪽 클릭')}
        />
        <Chip text="text" chipType={ChipType.DEFAULT} />
        <Chip text="text" chipType={ChipType.VAR1} />
        <Chip text="text" chipType={ChipType.VAR2} />
        <Dropdown
          dropdownType={DropdownType.VAR1}
          text="text"
          onClick={() => {
            console.log('드롭다운 클릭');
          }}
        />
        <Dropdown
          dropdownType={DropdownType.VAR2}
          text="text"
          onClick={() => {
            console.log('드롭다운 클릭');
          }}
        />
        <Dropdown
          dropdownType={DropdownType.VAR4}
          text="text"
          onClick={() => {
            console.log('드롭다운 클릭');
          }}
        />
        <Dropdown
          dropdownType={DropdownType.VAR5}
          text="text"
          onClick={() => {
            console.log('드롭다운 클릭');
          }}
        />
        <Dropdown
          dropdownType={DropdownType.VAR6}
          text="text"
          onClick={() => {
            console.log('드롭다운 클릭');
          }}
        />
        <Share link="dummyLink" />
        <Bookmark
          isBookmarked={false}
          onStateChange={(newState) => {
            console.log('새상태:', newState);
          }}
        />
        <Category />
        <div className="w-200pxr">
          <Tabs
            defaultValue={'all'}
            option="커뮤니티 탭"
            listClassName="bg-blue-100"
            panelClassName="bg-blue-200"
          >
            <Tabs.List>
              <Tabs.Trigger value={'all'} label="전체글" />
              <Tabs.Trigger value={'bookmarked'} label="내가 찜한 글" />
              <Tabs.Trigger value={'written'} label="내가 작성한 글" />
              <Tabs.Trigger value={'commented'} label="댓글" />
            </Tabs.List>
            <Tabs.Panel value={'all'}>
              <div>내용1</div>
            </Tabs.Panel>
            <Tabs.Panel value={'bookmarked'}>
              <div>내용2</div>
            </Tabs.Panel>
            <Tabs.Panel value={'written'}>
              <div>내용3</div>
            </Tabs.Panel>
            <Tabs.Panel value={'commented'}>
              <div>내용4</div>
            </Tabs.Panel>
          </Tabs>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
};

export default JoyTestClientPage;
