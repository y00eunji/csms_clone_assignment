export default function Login() {
  return <div>Login</div>;
}

// import { usePostLogin } from '@/shared/api/usePostLogin.ts';
// import { usePostStationList } from '@/shared/api/usePostStationList.ts';
//
// export default function Index() {
//   const { mutate: asd } = usePostStationList();
//   const { mutate: login } = usePostLogin();
//
//   const handle = () => {
//     const result = asd({
//       params: {
//         descending: false,
//         page: 1,
//         rowsPerPage: 30,
//       },
//     });
//
//     console.log(result);
//   };
//
//   const temp = () => {
//     login({
//       userId: 'evd.csms.dev',
//       userPassword: 'Autocrypt123!',
//       serviceType: 'EVIQ_CSMS_PUBLIC',
//     });
//   };
//   return (
//     <div>
//       <button onClick={handle}>Index</button>
//       <button onClick={temp}>login</button>
//     </div>
//   );
// }
