import data from './play.js';

const audio = document.querySelector(`audio[data-music='disney']`);

const musicControl = (function () {
  let isPlay = false;
  return function (isControl) {
    isControl === undefined ? (isPlay = !isPlay) : (isPlay = isControl);
    isPlay ? audio.play() : audio.pause();
  };
})();
const currentMusic = (function () {
  let musicId = 0;
  return {
    setCurrentMusic(musicId) {
      this.musicId = musicId;
    },
    getCurrentMusic() {
      return this.musicId;
    },
  };
})();
const musicChange = musicId => {
  const music = data.find(data => data.id == musicId);
  const time = music.time.split(':').reduce((a, b) => Number(a) * 60 + Number(b));

  const keys = document.querySelectorAll('.key');
  const background = document.querySelectorAll('.play-cover');
  const title = document.querySelector('.play-title');
  const movie = document.querySelector('.play-movie');

  keys.forEach(item => item.classList.remove('playing'));
  keys[musicId].classList.add('playing');
  background.forEach(item => (item.style.backgroundImage = `url('${music.cover}')`));
  title.innerText = music.title;
  movie.innerText = music.movie;

  audio.currentTime = time;
};

window.addEventListener('keydown', e => {
  if (e.keyCode === 32) {
    musicControl();
    return;
  }

  const key = document.querySelector(`div[data-key='${e.keyCode}']`);
  if (!key) return;

  currentMusic.setCurrentMusic(key.dataset.id);
  musicChange(key.dataset.id);
  musicControl(true);
});

audio.addEventListener('timeupdate', e => {
  const id = currentMusic.getCurrentMusic();

  if (id == data.length - 1) return;

  const nextMusic = data.find(data => data.id == Number(id) + 1);
  const time = nextMusic.time.split(':').reduce((a, b) => Number(a) * 60 + Number(b));

  if (audio.currentTime >= time - 1) {
    musicControl(false);
  }
});
