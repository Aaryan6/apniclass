import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Landing from "../Components/Landing";
import Topbar from "../Components/Topbar";

const Home = ({ user }) => {
  return (
    <>
      <Topbar user={user}/>
      <Header user={user} />
      <Landing />
      <Footer />
    </>
  );
};

export default Home;
