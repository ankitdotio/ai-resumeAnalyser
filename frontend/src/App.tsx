import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.js"
import { InterviewProvider } from "./features/interview/interview.context.js"
function App() {
  

  return (
    <>
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
      
    </AuthProvider>
    </>
  )
}

export default App
