import MainLayout from "./layouts/MainLayout/MainLayout"
import Home from "./pages/Home/Home"
import {Routes , Route} from 'react-router-dom'
import UrlList from "./pages/UrlList/UrlList"
import UrlItem from "./pages/UrlItem/UrlItem"
function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/urls" element={<UrlList/>}/>
        <Route path="/urls/:id" element={<UrlItem/>}/>
      </Routes>
    </MainLayout>
  )
}
export default App
