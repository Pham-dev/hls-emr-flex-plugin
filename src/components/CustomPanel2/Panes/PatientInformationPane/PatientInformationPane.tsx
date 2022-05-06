import { PatientInformationPaneBodyStyles } from "./PatientInformationPane.Styles";
import React, {useEffect, useMemo } from "react";

interface PatientInformationPaneProps {
  name:string
  patientInfo: any;
  pendingRequest:boolean
  skill: string;
}

const PatientInformationPane = ({patientInfo, pendingRequest, name, skill}:PatientInformationPaneProps ) => {

    const phone = useMemo(()=>{
        if(patientInfo && patientInfo.telecom){
            console.log(patientInfo.telecom)
            const result = patientInfo.telecom.find((item:any)=>item.use === "mobile")
            return result?.value || "N/A"
        }
        return "N/A"
    }, [patientInfo])

    const email = useMemo(()=>{
        const names = name.split(" ")
        return names.join("").concat("@gmail.com")
    }, [name])

  return (
    <PatientInformationPaneBodyStyles>
          <p className="title">Patient Information</p>
          <div className='info-block'>
              <div className="info-column">
                  <div className="column-value">
                      <span className="label">Id</span>
                      <span className="value">{pendingRequest ? "..." : patientInfo?.id || "N/A"}</span>
                  </div>
                  <div className="column-value">
                      <span className="label">phone number</span>
                      <span className="value">{pendingRequest ? "..." : phone}</span>
                  </div>
                  <div className="column-value">
                      <span className="label">email</span>
                      <span className="value">{pendingRequest ? "..." : email}</span>
                  </div>
                  <div className="column-value">
                      <span className="label">address</span>
                      <span className="value">324 Panorama Drive Broomfield CO 80020</span>
                  </div>
              </div>
              <div className="info-column right-column">
                  <div className="column-value">
                      <span className="label">primary insurance</span>
                      <span className="value">Aetna</span>
                  </div>
                  <div className="column-value">
                      <span className="label">ID #</span>
                      <span className="value">A3489 32892</span>
                  </div>
                  <div className="column-value">
                      <span className="label">group #</span>
                      <span className="value">348912 328 780541</span>
                  </div>
                  <div className="column-value">
                      <span className="label">payer #</span>
                      <span className="value">348912 5452</span>
                  </div>
              </div>
          </div>
    </PatientInformationPaneBodyStyles>
  )
}

export default PatientInformationPane;
