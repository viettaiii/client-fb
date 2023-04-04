
import { Howl } from 'howler';
import loudMess from '../assets/loud.mp3';
const sound = new Howl({
    src: [loudMess]
  });
export const useSound = () => {
    return sound;
}