import { Box, Button, VStack, Text, Image, useColorModeValue } from '@chakra-ui/react';
import { FaPlay, FaPause, FaUpload } from 'react-icons/fa';
import React, { useState, useRef } from 'react';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const uploadFileHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      audioRef.current.src = URL.createObjectURL(file);
      audioRef.current.load();
      setIsPlaying(false);
    }
  };

  return (
    <VStack spacing={8} p={5} align="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Text fontSize="2xl" fontWeight="bold">Welcome to GPT Engineer Music Player</Text>
      <Image src="/images/album-cover.jpg" alt="Example Album Cover" boxSize="300px" />
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)}>
        <source src="" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <Button leftIcon={isPlaying ? <FaPause /> : <FaPlay />} onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
      <Button leftIcon={<FaUpload />} as="label">
        Upload Track
        <input type="file" hidden accept="audio/*" onChange={uploadFileHandler} />
      </Button>
    </VStack>
  );
};

export default Index;