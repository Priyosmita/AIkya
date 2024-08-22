// 'use client'
// import React, { useState } from 'react';
// import Meeting from '../../components/options/Meeting';

// const App = () => {
//   const [meetingId, setMeetingId] = useState('');
//   const [showMeeting, setShowMeeting] = useState(false);

//   const createMeeting = () => {
//     const id = Math.floor(Math.random() * 1000000).toString();
//     setMeetingId(id);
//     setShowMeeting(true);
//   };

//   return (
//     <div>
//       <h1>Video Call App</h1>
//       {!showMeeting ? (
//         <div>
//           <button onClick={createMeeting}>Create Meeting</button>
//           {meetingId && <p>Meeting ID: {meetingId}</p>}
//         </div>
//       ) : (
//         <Meeting meetingId={meetingId} />
//       )}
//     </div>
//   );
// };

// export default App;

