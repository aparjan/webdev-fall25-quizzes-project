'use client'
import { useState, useEffect } from "react"; 

export default function DateStateVariable() { 
    const [startDate, setStartDate] = useState<Date | null>(null); 
    
    useEffect(() => {
        setStartDate(new Date());
    }, []);
    
    const dateObjectToHtmlDateString = (date: Date) => { 
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`; 
    }; 
    
    if (!startDate) {
        return <div>Loading...</div>;
    }
    
    return ( 
        <div id="wd-date-state-variables"> 
            <h2>Date State Variables</h2> 
            <h3>{JSON.stringify(startDate)}</h3> 
            <h3>{dateObjectToHtmlDateString(startDate)}</h3> 
            <input 
                type="date" 
                className="form-control"
                value={dateObjectToHtmlDateString(startDate)} 
                onChange={(e) => setStartDate(new Date(e.target.value))} 
            /> 
            <hr/>
        </div>
    );
}