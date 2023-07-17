import MainLayout from "./layouts/MainLayout/MainLayout"
import Home from "./pages/Home/Home"
import {Routes , Route} from 'react-router-dom'
function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </MainLayout>
  )
}
export default App
