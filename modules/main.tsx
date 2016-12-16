import { GatherModule } from './gather';
import { createRenderer } from './ui';

const modules = [
  GatherModule
];

export const start = () => {
  console.log('started...');
  const renderer = createRenderer();
  renderer(modules);
};