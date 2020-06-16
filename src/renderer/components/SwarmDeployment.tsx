/**
 * ************************************
 *
 * @module  SwarmDeployment.tsx
 * @author Kim Wysocki
 * @date 5/30/20
 * @description component to deploy a Swarm, showing deployment state, and allowing user to name their stack 
 *
 * ************************************
 */

import React, { useState, useEffect, useRef } from 'react';
import { FaUpload } from 'react-icons/fa';
import Draggable from 'react-draggable';
import { runDockerSwarmDeployment, runLeaveSwarm, runDockerSwarmDeployStack, runCheckStack } from '../../common/runShellTasks';

type Props = {
  currentFile: string,
};

const SwarmDeployment: React.FC<Props> = ({
  currentFile
}) => {
  // Create React hooks to hold onto state
  const [success, setSuccess] = useState(false);
  const [swarmExists, setSwarmExists] = useState(false);
  const [stdOutMessage, setStdOutMessage] = useState('');
  const [nodeAddress, setNodeAddress] = useState('');
  const [infoFromSwarm, setInfoFromSwarm] = useState({});
  const [swarmDeployState, setSwarmDeployState] = useState(0);
  const [popUpContent, setPopupContent] = useState(<div></div>);
  const [stackName, setStackName] = useState('');
  const [allStackNames, setAllStackNames] = useState([] as any);
  const stackNameRef = useRef(stackName);

  // if there is no active file, ask user to open a file to deploy
  // TO DO - have different message from default error message
  // currently using default, but would be best to have a 'please open a file' message
  useEffect(() => {
    if (currentFile && !swarmExists && !success) {
      setSwarmDeployState(1);
      setPopupContent(popupStartDiv);
    } else if (currentFile && swarmExists && success) {
      setSwarmDeployState(3);
      setPopupContent(successDiv);
    } else if (!currentFile && swarmExists && success) {
      setSwarmDeployState(3);
      setPopupContent(errorDiv);
    } else if (!currentFile && !swarmExists && !success) {
      setSwarmDeployState(0);
      setPopupContent(errorDiv);
    } else if (swarmExists && success) {
      setPopupContent(successDiv);
    } else if (swarmExists && !success) {
      setPopupContent(errorDiv);
    }
  }, [currentFile, swarmExists, success]);

  // Once component has mounted, check for changes in state and update component
  // depending on change
  // if there's no swarm and there is a file, show popup with input and button
  // if swarm exists and deployment was successful, render success div
  // else if swarm exists but deployment was unsuccessful, render error message
  // useEffect(() => {
  //   if (swarmExists && success) {
  //     setPopupContent(successDiv);
  //   } else if (swarmExists && !success) {
  //     setPopupContent(errorDiv);
  //   } else if (!swarmExists) {
  //     setPopupContent(popupStartDiv);
  //   }
  // }, [success, swarmExists]);

  // keep a variable for access to hidden div in order to toggle hidden/visible
  // may be better way to do this? // -> change to React best practice method of doing this
  const swarmDeployPopup: any = document.getElementById('swarm-deploy-popup');
  
  // save html code in variables for easier access later
  // the default for the pop-up div, before any interaction with swarm / after leaving swarm
  const popupStartDiv = (
    <div id="initialize-swarm">
      <label htmlFor="stack-name" id="stack-name-label">Stack Name</label>
      <input id="stack-name" name="stack-name" placeholder="Enter name...." onChange={(event) => { stackNameRef.current = event.target.value }}></input>
      <button 
        id="create-swarm" 
        onClick={() => { 
          if (currentFile) {
            console.log('stackName inside onClick: ', stackNameRef.current);
            if (swarmExists) addStackToSwarm();
            else if (!swarmExists) getNameAndDeploy();
          } else {
            setSuccess(false);
            setSwarmDeployState(0);
          }
        }}>
        Create Swarm
      </button>
    </div>);
  
  // render this div if successful joining swarm
  const successDiv = (
    <div className="success-div">
      <p className="success-p">
        <span className="swarm-spans">Success! Your swarm has been deployed!</span>
        <br></br>The current node {nodeAddress}<br></br>is now a manager
      </p>
      <br></br>

      <div id="add-stack-div">
        <label htmlFor="new-stack-name" id="new-stack-name-label">Deploy Additional Stack</label>
        <input id="new-stack-name" name="new-stack-name" placeholder="Enter name...." onChange={(event) => { stackNameRef.current = event.target.value }}></input>
        <button 
          id="add-stack-btn"
          onClick={() => addStackToSwarm()}>
            Add new stack
        </button>
      </div>
    </div>);

  // if unsuccessful / if no active file, render error dive                          
  const errorDiv = (
    <div className="error-div">
      <p className="error-p">
        Sorry, there was an issue initializing your swarm
      </p>
      <button
        className="swarm-btn" 
        onClick={() => {
          leaveSwarm();
        }}>Try Again
      </button>
    </div>);

  // change visibility of HTML element from hidden to visible or vice versa
  // used for the popup box
  const toggleVisible = (element: any): void => {
    if (element) element.style.visibility = 'visible';
  }
  const toggleHidden = (element: any): void => {
    if (element) element.style.visibility = 'hidden';
  }

  // retrieve input from user and pass it to runDockerSwarmDeployment as an argument
  // the function will return stdout from running each function, so that we have access to that information
  const getNameAndDeploy = async (): Promise<any> => {    
    // hide pop-up while running commands
    toggleHidden(swarmDeployPopup);
    setSwarmDeployState(2);
    setAllStackNames([...allStackNames, stackNameRef.current]);
    console.log('allStackNames', allStackNames);

    // await results from running dwarm deployment shell tasks 
    const returnedFromPromise = await runDockerSwarmDeployment(currentFile, stackNameRef.current);
    const infoReturned = JSON.parse(returnedFromPromise);
    setInfoFromSwarm(infoReturned);

    // if there is no error on the returned object, swarm initialisation was successful 
    if (!infoReturned.init.error) {
      setStdOutMessage(infoReturned.init.out.split('\n')[0]);
      console.log(stdOutMessage);
      console.log(infoFromSwarm);
      // the split here is to get just the 25-character node ID of the swarm
      setNodeAddress(infoReturned.init.out.split('\n')[0].split(' ')[4].replace(/[()]/g, ''));
      setSuccess(true);
      setSwarmExists(true);
      setSwarmDeployState(3);
      toggleVisible(swarmDeployPopup);
    } else {
      setSwarmExists(true);
      setSuccess(false);
      setSwarmDeployState(1);
      toggleVisible(swarmDeployPopup);
    }
  };

  const addStackToSwarm = async (): Promise<any> => {
    toggleHidden(swarmDeployPopup);
    setSwarmDeployState(2);
    setAllStackNames([...allStackNames, stackNameRef.current]);

    const nextStackResults = await runDockerSwarmDeployStack(currentFile, stackNameRef.current);
    const stackList = await runCheckStack();

    setSwarmDeployState(3);
    toggleVisible(swarmDeployPopup);

    console.log('results from adding new stack: ', nextStackResults);
    console.log('docker stack ls: ', stackList);
  }

  // function to allow the user to leave the swarm
  // called in onClicks
  const leaveSwarm = (): void => {
    toggleHidden(swarmDeployPopup);
    setSwarmExists(false);
    setSuccess(false);
    runLeaveSwarm();
    setSwarmDeployState(1);
    setNodeAddress('');
    setStackName('');
    setAllStackNames([]);
  }

  // uninitialised variable allowing the values to change depending on state
  // used for swarm deploy button in leftNav
  let swarmBtnTitle: string | undefined, swarmOnClick: any;

  if (!swarmExists || swarmExists && !success) {
    swarmBtnTitle = 'Deploy to Swarm';
    swarmOnClick = () => {
      if (swarmDeployPopup) {
        toggleVisible(swarmDeployPopup);
      }
    };
  } else if (swarmExists) {
    swarmBtnTitle = 'Leave Swarm';
    swarmOnClick = () => {
      toggleHidden(swarmDeployPopup);
      leaveSwarm();
    }
  } 

  return (
    <div className="deploy-container" > 
      <button
        className="deploy-btn"
        onClick={swarmOnClick}>
            <span><FaUpload className="deployment-button" size={24} /></span>
              {swarmBtnTitle}
        <div className='status-container'>
          <span className={`deployment-status status-healthy ${swarmDeployState === 3 ? 'status-active' : ''}`}></span>
          <span className={`deployment-status status-moderate ${swarmDeployState === 2 ? 'status-active' : ''}`}></span>
          <span className={`deployment-status status-dead ${swarmDeployState === 1 ? 'status-active' : ''}`}></span>
        </div>
      </button>

      <Draggable>
        <div id="swarm-deploy-popup">
          <div id="button-and-other-divs">
            <div id="exit-swarm-deploy-div">
              <button id="exit-swarm-deploy-box"
                onClick={() => {
                  if (swarmDeployPopup) {
                    toggleHidden(swarmDeployPopup);
                }}}>X</button> 
            </div>

            <div className="popup-content-wrapper">    
              {popUpContent}
            </div>

          </div>
        </div>
      </Draggable>
    </div>
  )
};

export default SwarmDeployment;