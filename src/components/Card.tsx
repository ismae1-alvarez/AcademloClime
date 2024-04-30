import React, {  ReactNode } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

interface CardProps {}

interface CardState {}

class Card extends React.Component<CardProps, CardState> {
  eventLogger = (e: DraggableEvent, data: DraggableData) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  handleStart = (e: DraggableEvent, data: DraggableData) => {
    console.log('Drag Start Event: ', e);
    console.log('Drag Start Data: ', data);
  };

  handleDrag = (e: DraggableEvent, data: DraggableData) => {
    console.log('Drag Event: ', e);
    console.log('Drag Data: ', data);
  };

  handleStop = (e: DraggableEvent, data: DraggableData) => {
    console.log('Drag Stop Event: ', e);
    console.log('Drag Stop Data: ', data);
  };

  render(): ReactNode {
    return (
      <Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        // position={null}
        grid={[25, 25]}
        scale={1}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
      >

        < section className='bg-gradient-to-r from-[#00c1ff] to-[#009eff] w-fit h-fit rounded px-8 py-3 text-white font-thin flex mx-auto relative overflow-hidden space-x-10 handle  p-2   border-none text-xl cursor-pointer  bg-opacity-25'>
            


            <article className='space-y-2'>
                <h2 className='text-8xl font-light '>
                20°
                </h2>

                <div className='flex space-x-2 items-center '>
                    <img src="/img/cloud.svg" alt="cloud" className='h-5 w-5' />
                    <p className='text-2xl'>Mostly Cloudy</p>
                </div>
                <hr className='rounded' />
                <div className='text-lg'>
                    <p className='flex gap-2'>
                        <span>Precipitation:</span>
                        <span>20%</span>
                    </p>
                    <p className='flex gap-2'>
                        <span>Wind:</span>
                        <span>3mph</span>
                    </p>
                </div>

            </article>
            
            <article className=' relative w-[300px] h-fit  '>
                {/* Fondo */}
                <div className='relative' >
                    <div className='bg-gradient-to-r from-[#01b9ff]  to-[#0077ff] w-[400px] h-[400px] rounded-full absolute -right-28 -top-20'>
                    </div>

                    <div className='bg-[#475766] w-[150px] h-[150px] rounded-full absolute right-5 top-5'>
                        <img src="/img/cloud.svg" alt="clime" className='p-10' />
                    </div>

                </div>
            </article>        
        </section>
        
      </Draggable>
    );
  }
}

export default Card;
