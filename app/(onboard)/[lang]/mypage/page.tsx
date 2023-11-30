import EditProfile from "./EditProfile";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./menu";
import Profile from "./profile";

const page = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        {/* LeftSide */}
        <div className="basis-1/4">
          <div className="m-10 bg-pink-200 h-[300px]">
            <Profile />
          </div>
          <div className="m-10 bg-pink-200 h-[250px]">
            <Menu />
          </div>
        </div>
        {/* main */}
        <div className="basis-3/4 m-10">
          <EditProfile />
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default page;
