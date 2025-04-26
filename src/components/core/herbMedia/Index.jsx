import React, { useEffect, useState } from 'react'
import { Tooltip as ReactTooltip } from "react-tooltip";

// importing loader css
import '../../common/loader.css';

// icons
import { CiImageOn } from "react-icons/ci";
import { MdOutlineOndemandVideo, Md3dRotation } from "react-icons/md";

// components
import HerbImage from './HerbImage';
import HerbVideo from './HerbVideo';
import ModelViewer from '../../common/ModelViewer';


const HerbMedia = ({herb}) => {

  // components data corresponding to menu bar
  const menuBarItems = [
    {
        name: "Image",
        icon: <CiImageOn/>,
        component: <HerbImage image={herb?.image}/>,
        id: 0,
    },
    {
        name: "Video",
        icon: <MdOutlineOndemandVideo/>,
        component: <HerbVideo video={herb?.video}/>,
        id: 1,
    },
    {
        name: "3d Model",
        icon: <Md3dRotation/>,
        component: <ModelViewer model={herb?.model}/>,
        id: 2,
    },
  ]

  const [activeComponent, setActiveComponent] = useState(menuBarItems[0]);

  return (
    <section className='w-full flex flex-col gap-4 items-center'>
        {/* active component */}
        <div 
          className={`h-[calc(100vh-160px)] w-full rounded-lg overflow-hidden
            ${activeComponent.name === '3d Model' ? 'bg-[#DDDDDD]' : ''}
          `}
        >
          {activeComponent.component}
        </div>

        {/* menu bar for components */}
        <div className='z-40 flex gap-4'>
            {
                menuBarItems.map((item, index) => (
                  <div 
                      key={item.id}
                      onClick={() => setActiveComponent(item)}
                      data-tooltip-id={`my-tooltip-${index}`}
                      className={`${activeComponent.id === index ? 'bg-yellow-50' : 'bg-richblack-50'} 
                      text-3xl cursor-pointer p-2 rounded-full hover:bg-yellow-50 transition-all duration-200`}
                  >
                    {item.icon}
                  </div>
                ))
            }
        </div>
        
        {/* tool tips for menu icons */}
        <>
          <ReactTooltip
            id="my-tooltip-0"
            variant="info"
            content="View Image"
          />
          <ReactTooltip
            id="my-tooltip-1"
            variant="info"
            content="View Video"
          />
          <ReactTooltip
            id="my-tooltip-2"
            variant="info"
            content="View in 3D"
          />
        </>

    </section>
  )
}

export default HerbMedia;