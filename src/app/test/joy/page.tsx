'use client';

import { ScrapLineColorType, WriteType } from '@common/types/btn';
import { ChipType } from '@common/types/chip';
import { DropdownType } from '@common/types/dropdown';
import { PopupType } from '@common/types/popup';

import Category from '@common/components/CategoryMenu/CategoryMenu.client';
import Chip from '@common/components/Chip/Chip.server';
import DropdownBar from '@common/components/DropdownBar/DropdownBar.client';
import Popup from '@common/components/Popup.server';
import Sort from '@common/components/SortMenu/SortMenu.client';
import Terms from '@common/components/Terms/Terms.client';
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

import Footer from '@common/layout/Footer/Footer.server';

const JoyTestPage = () => {
  const handleClick = () => {
    alert('버튼 클릭됨');
  };

  return (
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
      <Terms />
      <Chip text="text" type={ChipType.DEFAULT} />
      <Chip text="text" type={ChipType.VAR1} />
      <Chip text="text" type={ChipType.VAR2} />
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
        isBookmarked={true}
        onStateChange={(newState, bookmarked) => {
          console.log('새상태:', newState, '이전상태:', bookmarked);
        }}
      />
      <Sort />
      <Category />
      <DropdownBar />
      <Footer />
    </div>
  );
};

export default JoyTestPage;
