import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Landing from "../Components/Landing";
import Topbar from "../Components/Topbar";

const Home = ({ user,message }) => {
  return (
    <>
      <Topbar user={user} message={message}/>
      <Header />
      <Landing user={user} />
      <Footer />
    </>
  );
};

export default Home;
