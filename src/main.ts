import kaplay from 'kaplay';
import './ui';
import { loadAssets } from './load-assets';
import { CharacterFactory } from './character/character.factory';

const canvas = document.getElementById('game-container') as HTMLCanvasElement;

const k = kaplay({
  background: '#97D3D3',
  width: 800,
  height: 600,
  canvas,
});

loadAssets(k);

const characterFactory = new CharacterFactory(k);

characterFactory.create('default', k.vec2(200, 300));
