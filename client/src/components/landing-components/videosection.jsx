import React from 'react';

const VideoSection = () => {
    return (
        <div className="container flex flex-col md:flex-row justify-between min-h-full px-4 md:px-40 py-8 md:py-16">
            <div className="w-full md:max-w-[30vw] my-5 flex flex-col gap-4 md:gap-8">
                <h2 className="text-3xl md:text-5xl mb-2 md:mb-4 font-poppins font-bold text-white">Watch Our Video</h2>
                <p className="text-base md:text-lg text-gray-200">
                    Learn more about Locksync and its features by watching our introductory video. See how easy it is to sync and share your Account securely.
                </p>
            </div>
            <div className="w-full md:max-w-xl my-5 flex flex-col justify-start gap-4 md:gap-8">
                <div className="sec-right right-11">
                    <iframe 
                        className="w-full h-64 md:w-[700px] md:h-[400px]" 
                        src="https://drive.google.com/file/d/1S48JQp763WOkHk7hSOwKO3SDPBxoMDmB/preview" 
                        title="Introductory Video" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default VideoSection;
