import data from './play.js';

const audio = document.querySelector(`audio[data-music='disney']`);
const musicPlaying = (function () {
  let isPlay = false;

  return function () {
    isPlay ? audio.pause() : audio.play();
    isPlay = !isPlay;
  };
})();
const styleChnage = (bg, id) => {
  const keys = document.querySelectorAll('.key');
  const background = document.querySelectorAll('.play-cover');

  keys.forEach(item => item.classList.remove('playing'));
  background.forEach(item => (item.style.backgroundImage = `url('${bg}')`));
  keys[id].classList.add('playing');
};

window.addEventListener('keydown', e => {
  console.log('🚀 ~ e', e);
  if (e.keyCode === 32) {
    musicPlaying();
    return;
  }

  const key = document.querySelector(`div[data-key='${e.keyCode}']`);
  if (!key) return;

  const music = data.find(data => data.id == key.dataset.id);
  const time = music.time.split(':').reduce((a, b) => Number(a) * 60 + Number(b));

  audio.currentTime = time;
  styleChnage(music.cover, music.id);
  musicPlaying();
});
