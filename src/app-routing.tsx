// import { createBrowserRouter } from 'react-router-dom'

// import {
//   fetchCulinaryList,
//   fetchNewsList,
//   fetchRoom,
//   fetchRoomList,
//   loginGuard,
// } from './apis/index.ts'

// import ErrorPage from './pages/ErrorPage.tsx'
// import RoomMaster from './pages/RoomMaster/RoomMaster.tsx'
// import RoomDetail from './pages/RoomDetail/RoomDetail.tsx'
// import Login from './pages/Login/Login.tsx'
// import Registration from './pages/Registration/Registration.tsx'
// import Layout from './pages/Layout/Layout.tsx'
// import Home from './pages/Home/Home.tsx'
// import MyAccount from './pages/MyAccount/MyAccount.tsx'
// import Booking from './pages/Booking/Booking.tsx'

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: '',
//         loader: async () => {
//           return Promise.all([
//             fetchNewsList(),
//             fetchCulinaryList(),
//             fetchRoomList(),
//           ])
//         },
//         element: <Home />,
//       },
//       {
//         path: '/room',
//         loader: async () => {
//           return fetchRoomList()
//         },
//         element: <RoomMaster />,
//       },
//       {
//         path: '/room/:id',
//         loader: async ({ params }) => {
//           return fetchRoom(params.id ?? '')
//         },
//         element: <RoomDetail />,
//       },
//       {
//         path: '/my-account',
//         element: <MyAccount />,
//       },
//       {
//         path: '/room/:id/booking',
//         element: <Booking />,
//       },
//       {
//         path: '/booking',
//         element: <Booking />,
//       },
//     ],
//   },
//   {
//     path: '/login',
//     loader: loginGuard,
//     element: <Login />,
//   },
//   {
//     path: '/registration',
//     loader: loginGuard,
//     element: <Registration />,
//   },
//   {
//     path: '*',
//     element: <ErrorPage />,
//   },
// ])
