import data from './play.js';

const audio = document.querySelector(`audio[data-music='disney']`);
const musicPlaying = (function () {
  let isPlay = false;

  return function () {
    isPlay ? audio.pause() : audio.play();
    isPlay = !isPlay;
  };
})();
const styleChnage = music => {
  const keys = document.querySelectorAll('.key');
  const background = document.querySelectorAll('.play-cover');
  const title = document.querySelector('.play-title');
  const movie = document.querySelector('.play-movie');

  keys.forEach(item => item.classList.remove('playing'));
  background.forEach(item => (item.style.backgroundImage = `url('${music.cover}')`));
  keys[music.id].classList.add('playing');
  title.innerText = music.title;
  movie.innerText = music.movie;
};

window.addEventListener('keydown', e => {
  if (e.keyCode === 32) {
    musicPlaying();
    return;
  }

  const key = document.querySelector(`div[data-key='${e.keyCode}']`);
  if (!key) return;

  const music = data.find(data => data.id == key.dataset.id);
  const time = music.time.split(':').reduce((a, b) => Number(a) * 60 + Number(b));

  audio.currentTime = time;
  styleChnage(music);
  musicPlaying();
});
