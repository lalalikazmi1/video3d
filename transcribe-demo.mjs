import {transcribe, toCaptions} from '@remotion/install-whisper-cpp';
import path from 'path';
const r = await transcribe({inputPath: path.resolve('whisper.cpp/samples/jfk.wav'), whisperPath: path.resolve('whisper.cpp'), whisperCppVersion: '1.5.5', model: 'medium.en', tokenLevelTimestamps: true});
const {captions} = toCaptions({whisperCppOutput: r});
(await import('fs')).writeFileSync('public/demo-captions.json', JSON.stringify(captions, null, 2));
