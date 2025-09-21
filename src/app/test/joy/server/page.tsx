import { getEventsServer } from '@features/events/apis/get/getEventsServer';

const JoyTestServerPage = async () => {
  const events = await getEventsServer({
    searchParams: { limit: 30, sort: 'date', order: 'desc' },
  });

  console.log(events);

  return <p>서버에서 fetcher 호출해 데이터 가져오기</p>;
};

export default JoyTestServerPage;
