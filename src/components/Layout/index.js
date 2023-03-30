import Header from "../Header";
import LeftBar from "../LeftBar";
import RightBar from "../RightBar";

import './layout.scss';
  
  const Layout = ({children}) => {
  
    return (
      <div >
      <Header />
      <div className={`main`} >
      <LeftBar />
        <div className='home'>{children}</div>
        <RightBar />
      </div>
    </div>
    )
  };

  export default Layout;