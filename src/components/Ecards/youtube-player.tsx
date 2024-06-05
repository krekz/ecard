'use client'
import React, { useEffect, useRef } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

interface YouTubePlayerProps {
  videoId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
  const playerRef = useRef<any>(null);

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
    // Attempt to play the video
    event.target.playVideo();
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      if (playerRef.current) {
        playerRef.current.playVideo();
      }
      // Remove the event listeners once the interaction is done
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '380',
    playerVars: {
      autoplay: 1, // Auto-play the video on load
    },
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />;
};

export default YouTubePlayer;
