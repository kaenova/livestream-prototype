import React, { useState, useEffect } from 'react';
import axios from 'axios'
import VideoPlayer from '../hls-player';

function HomeSec() {

  const [StreamKey, setStreamKey] = useState("");
  const [StreamID, setStreamID] = useState("");
  const [StreamActive, setStreamActive] = useState()


  const handleGenerateKey = async () => {
    try {
      let data = await axios.get("/api/generate")
      setStreamKey(data.data["stream_key"])
      setStreamID(data.data["stream_id"])
    } catch (e) {
      console.log(e)
      setStreamKey("Failed")
    }
  }

  const checkStream = async () => {
    try {
      let data = await axios.get(`/live/${StreamID}.m3u8`)
      setStreamActive(true)
    } catch (e) {
      setStreamActive(false)
    }
  }

  useEffect(() => {
    if (StreamID != "" && !StreamActive){
      setInterval(() => {
        checkStream()
      }, 10000)
    }
  }, [StreamID])
  

  return (
    <div className='grid grid-flow-col p-2'>
      <div className=''>
        <h1 className='text-xl font-bold'>Livestream Prototype</h1>
        <div className='w-max justify-start text-left'>
          <h2 className='text-lg'>Procedure:</h2>

          <ol className='list-disc'>
            <li>
              1. Generate Stream key: {" "}
              {
                (StreamID == "") &&
                <button onClick={handleGenerateKey} className='bg-black text-white p-1 rounded-md'> Generate Stream Key</button>
              }
            </li>

            {
              (StreamKey == "Failed") ? (
                <>
                  <li className='flex flex-col'>
                    Failed to fetch stream key
                  </li>
                </>
              ) : (StreamKey == "") ? <></> : (
                <>
                  <li className='flex flex-col'>
                    <p>2. Copy this settings to OBS Stream Settings</p>
                    <div className='bg-gray-400 p-2 rounded-md'>
                      <p>Server: rtmp://localhost:1935/live</p>
                      <p>Streamkey: {StreamKey}</p>
                    </div>
                  </li>

                  <li className='flex flex-col'>
                    <p>3. Start the stream</p>
                  </li>
                </>
              )
            }

          </ol>
        </div>
      </div>

      <div>
        {
          ((StreamID != "") && (StreamActive)) ?
          <VideoPlayer src={`/live/${StreamID}.m3u8`} />
          :
          <p>Stream is Offline</p>
        }
      </div>
    </div>);
}

export default HomeSec;
