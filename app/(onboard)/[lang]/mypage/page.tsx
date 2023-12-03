import EditProfile from "./EditProfile";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./menu";
import Profile from "./profile";
import RequestList from "./RequestList";

const page = () => {
  return (
    <div>
      <Header />
      <div className="flex bg-gray-200">
        {/* LeftSide */}
        <div className="basis-1/4">
          <div className="m-8 bg-black-100 h-[300px] rounded-md p-5">
            <Profile />
          </div>
          <div className="m-8 bg-black-100 h-[250px] rounded-md p-5">
            <Menu />
          </div>
        </div>
        {/* main */}
        <div className="basis-3/4 m-8">
          {/* <EditProfile /> */}
          <RequestList />
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default page;
