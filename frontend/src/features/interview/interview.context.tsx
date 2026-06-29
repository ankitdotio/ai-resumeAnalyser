import { Children, createContext, useState } from "react";

export const InterviewContext = createContext()

export const InterviewProvider = ({children})=>{
    const [Loading, setLoading] = useState(false)
    const [report, setreport] = useState(null)

    return(
        <InterviewContext.Provider value={{Loading,setLoading,report,setreport}}>
            {children}
        </InterviewContext.Provider>
    )
}