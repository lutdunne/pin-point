"use client"
{/*
    user pastes job description
    send text to baclend using button and parse and clean
    ai ouput
    
    match: 78
    missing skills: []
    suggestions: ""

    
*/}


export default function TargetMyCV() {
    const handleJobText = async (e) => {}

    return (
        <div className="flex flex-col w-1/2 p-6 border-r space-y-6 overflow-y-auto">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold mb-3 text-grey-600">Target My CV</h1>
                <p>Paste a job description below to analyze how well your résumé matches.</p>
            </div>

            <div className="w-full">
                <form onSubmit={handleJobText} className="space-y-4 ">
                    <label className="block text-gray-700">Paste the job description:</label>
                    <textarea className="w-full border rounded p-2 h-32" />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
                        Analyze Job Description
                    </button>
                </form>
            </div>
        </div>
    );
}



// export default function TargetMyCv() {
//   return (
//     <div className="flex flex-col flex-1  p-6 border-r space-y-6">
//       <div className="flex flex-col flex-1 justify-between">
//         <div>
//           <h1 className="text-2xl font-bold mb-3 text-grey-600">Target My CV</h1>
//           <p>Paste a job description below to analyze how well your résumé matches.</p>
//         </div>

//         <form className="space-y-4 mt-6">
//           <label className="block text-gray-700">Paste the job description:</label>
//           <textarea className="w-full border rounded p-2 h-32" />
//           <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
//             Analyze Job Description
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }