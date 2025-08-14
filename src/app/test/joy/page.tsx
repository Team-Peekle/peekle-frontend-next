'use client';

import { ScrapLineColorType, WriteType } from '@common/types/btn';

import Cta from '@common/components/btn/Cta/Cta.client';
import Heart from '@common/components/btn/Heart/Heart.client';
import Post from '@common/components/btn/Post/Post.client';
import Scrap from '@common/components/btn/Scrap/Scrap.client';
import ScrapFilled from '@common/components/btn/ScrapFilled/ScrapFilled.client';
import ScrapLine from '@common/components/btn/ScrapLine/ScrapLine.client';
import Select from '@common/components/btn/Select/Select.client';
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
        likeCount={2}
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
      <Footer />
    </div>
  );
};

export default JoyTestPage;
