import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DarkModeProvider } from './DarkModeContext'
import Nav from './components/Nav'
import AnimationMuseum from './AnimationMuseum'
import About from './pages/About'
import Connect from './pages/Connect'

export default function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<AnimationMuseum />} />
          <Route path="/about" element={<About />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  )
}
