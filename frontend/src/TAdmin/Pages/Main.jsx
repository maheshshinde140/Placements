import Content from '../Components/Content';
import DashboardData from '../Components/DashboardData';

const Main = () => {
  return (
    <div className="relative flex flex-col flex-1 bg-[#A3B5C0] min-h-screen rounded-l-[35px]">
      <h1 className="text-[28px] font-bold p-2 mt-5 mb-3 ml-7 text-[rgb(22,22,59)]">
        Dashboard
      </h1>
      {/* <Header/> */}
      <Content />
      <DashboardData/>
    </div>
  );
};

export default Main;
