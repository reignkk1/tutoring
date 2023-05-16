import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import MyPage from "./pages/MyPage";
import Notice from "./pages/Notice";
import TeacherDetail from "./pages/TeacherDetail";
import StudentDetail from "./pages/StudentDetail";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import NotFound from "./pages/NotFound";
import GlobalStyles from "./styles/GlobalStyles";
import FindPage from "./pages/FindPage";
import Write from "./pages/Write";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/view/:me",
          element: <MyPage />,
        },
        {
          path: "/teachers",
          element: <FindPage category="teachers" />,
        },
        {
          path: "/students",
          element: <FindPage category="students" />,
        },
        {
          path: "/notice",
          element: <Notice />,
        },
        {
          path: "/view/teachers/:id",
          element: <TeacherDetail />,
        },
        {
          path: "/view/students/:id",
          element: <StudentDetail />,
        },
        {
          path: "/teachers/write",
          element: <Write />,
        },
        {
          path: "/students/write",
          element: <Write />,
        },
        {
          path: "/notice/write",
          element: <Write />,
        },
      ],
    },
  ]);

  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
