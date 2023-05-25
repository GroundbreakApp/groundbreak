import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import axios from 'axios';


const Page = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  var loadIgnore = false;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Submit clicked")
    try {
        console.log("Making get call to zoom")

        const response = await axios.post('https://groundbreak.onrender.com/metrics/zoomm', {
          firstName: firstName,
          lastName: lastName,
          email: email,
        });

        console.log(response)
        setFirstName('');
        setLastName('');
        setEmail('');
    } catch (error) {
        console.error('Error joining Zoom webinar:', error);
    }
  };

  useEffect(() => {

    if (!loadIgnore){
        const searchParams = new URLSearchParams(location.search);
        const parameterValue = searchParams.get('clicksrc');

        var clicksrc = 'none'
        var deviceType = 'desktop'
        if (parameterValue) {
            clicksrc = parameterValue
        }
        if (isMobile) {
            deviceType = 'mobile'
        }
        console.log("Making post call")
        
        const makeCall = async () => {
            try {
                var response = await axios.post('https://groundbreak.onrender.com/metrics/tracking', {
                    deviceType: deviceType,
                    clickSrc: clicksrc,
                });
                console.log(response)
            }catch(error){
                console.error('Error making call:', error);
            }
        };
        makeCall()
        
    }
    loadIgnore = true
  }, []);

  return (
    <div>
    </div>
  );
};

export default Page;


