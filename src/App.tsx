import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Stories from './pages/Stories'
import StoryDetail from './pages/StoryDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import ReflectionGuide from './pages/ReflectionGuide'
import ContentGuidelines from './pages/ContentGuidelines'
import Resources from './pages/Resources'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:slug" element={<StoryDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reflection-guide" element={<ReflectionGuide />} />
          <Route path="/content-guidelines" element={<ContentGuidelines />} />
          <Route path="/unlinked-resources" element={<Resources />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
