import { PatientInformationPaneBodyStyles } from "./PatientInformationPane.Styles";
import React, { useEffect } from "react";
import { ManagerForOutside } from "@twilio/flex-ui/src/core/Manager";
import {Channel} from "@twilio/flex-ui-core/node_modules/twilio-chat/lib/channel"

interface PatientInformationPaneProps {
  patientName: string;
  skill: string;
  manager: ManagerForOutside;
}

const PatientInformationPane = ({ patientName = '', skill, manager }: PatientInformationPaneProps ) => {


    useEffect(()=>{
        const getChannels = async () => manager.chatClient.getLocalChannels()
        const getConversation = async (channel:Channel) => {
            channel.getMessages().then(paginator => {
                paginator.items.forEach(msg=>console.log(msg.body))
            })
        }
        getChannels().then(resp => {
            resp.forEach((channel, index)=> {
                console.log(channel.friendlyName)
                console.log(channel.uniqueName)
            })
        })
    })

  return (
    <PatientInformationPaneBodyStyles>
          <p className="title">Patient Information:</p>
          <div className='info-block'>
              <div className="info-column">
                  <div className="column-value">
                      <span className="label">Mrn</span>
                      <span className="value">12 34 56</span>
                  </div>
                  <div className="column-value">
                      <span className="label">phone number</span>
                      <span className="value">256 123 4567</span>
                  </div>
                  <div className="column-value">
                      <span className="label">email</span>
                      <span className="value">mdoe@gmail.com</span>
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
