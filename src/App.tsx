import MainLayout from "./layouts/MainLayout/MainLayout"
import Home from "./pages/Home/Home"
import {Routes , Route} from 'react-router-dom'
import UrlList from "./pages/UrlList/UrlList"
function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/urls" element={<UrlList/>}/>
      </Routes>
    </MainLayout>
  )
}
export default App
