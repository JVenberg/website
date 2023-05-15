(() => {
  const TYPE_TIME = 7;
  const FLOWER_START_TIME = 2;
  const MOTHERS_DAY_TEXT = `Happy Mother's Day Mom! I love you so much. You're the best mom I could ever
  ask for, and I hope you had a wonderful Mother's Day!`;
  const TYPE_SPEED = TYPE_TIME / MOTHERS_DAY_TEXT.length * 1000;

  const FOREST_AUDIO = new Audio('forest.mp3');

  const FLOWERS = [
    {
      height: 300,
      leftLeafHeight: 30,
      rightLeafHeight: 50,

      innerPedalColor: '#F3F875',
      pedalColor: '#F8C475',
      outerPedalColor: '#F7BC62',

      innerPedalSize: 110,
      pedalSize: 10,
      outerPedalSize: 30,

      animationDelay: '7s',
    },
    {
      height: 200,
      leftLeafHeight: null,
      rightLeafHeight: 50,

      innerPedalColor: '#A6D6FA',
      pedalColor: '#75BFF8',
      outerPedalColor: '#62B6F7',

      innerPedalSize: 40,
      pedalSize: 30,
      outerPedalSize: 10,

      animationDelay: '8s',
    },
    {
      height: 250,
      leftLeafHeight: 40,
      rightLeafHeight: null,

      innerPedalColor: '#F8C475',
      pedalColor: '#F87575',
      outerPedalColor: '#F76262',

      innerPedalSize: 80,
      pedalSize: 5,
      outerPedalSize: 15,
    },
    {
      height: 290,
      leftLeafHeight: 40,
      rightLeafHeight: 60,

      innerPedalColor: '#F87575',
      pedalColor: '#F98888',
      outerPedalColor: '#F7BC62',

      innerPedalSize: 20,
      pedalSize: 5,
      outerPedalSize: 40,
    },
    {
      height: 320,
      leftLeafHeight: 40,
      rightLeafHeight: null,

      innerPedalColor: '#75BFF8',
      pedalColor: '#A6D6FA',
      outerPedalColor: '#92CDF9',

      innerPedalSize: 60,
      pedalSize: 25,
      outerPedalSize: 15,
    },
    {
      height: 230,
      leftLeafHeight: 30,
      rightLeafHeight: 60,

      innerPedalColor: '#D9ABFF',
      pedalColor: '#E2BFFF',
      outerPedalColor: '#FF75A6',

      innerPedalSize: 50,
      pedalSize: 10,
      outerPedalSize: 25,
    },
  ]

  window.addEventListener('load', () => {
    writeText(MOTHERS_DAY_TEXT, document.getElementById('intro'), 0, TYPE_SPEED);
    for (let i = 0; i < FLOWERS.length; i++) {
      const flowerData = FLOWERS[i];
      createFlower(document.getElementById('flower-template'), flowerData, FLOWER_START_TIME + i);
    }

    FOREST_AUDIO.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);

    document.getElementById('music-control').addEventListener('click', function (event) {
      const icon = this.firstElementChild;
      if (icon.textContent.trim() === 'pause') {
        icon.textContent = 'play_arrow';
        FOREST_AUDIO.pause();
      } else {
        icon.textContent = 'pause';
        FOREST_AUDIO.play();
      }
    });
  });

  /**
   * Writes text to an element
   * @param {*} text - The text to write
   * @param {*} ele - The element to write to
   * @param {*} index - The index of the text to write
   * @param {*} typeSpeed - The speed to write the text
   */
  function writeText(text, ele, index, typeSpeed) {
    if (index < text.length) {
      ele.textContent += text.charAt(index);
      setTimeout(writeText, typeSpeed, text, ele, index + 1, typeSpeed);
    } else {
      document.getElementById('cursor').classList.add('blinking-cursor');
    }
  }

  /**
   * Creates a flower based on the flower template and flower data
   * @param {*} flowerTemplate - The template for the flower
   * @param {*} flowerData - The data for the flower
   */
  function createFlower(flowerTemplate, flowerData, delay) {
    const flower = flowerTemplate.content.firstElementChild.cloneNode(true);
    flower.style.height = `${flowerData.height}px`;
    flower.style.width = `${flowerData.innerPedalSize + flowerData.pedalSize * 2 + flowerData.outerPedalSize * 2}px`;

    if (flowerData.leftLeafHeight === null) {
      flower.querySelector('.leaf.left').style.display = 'none';
    } else {
      flower.querySelector('.leaf.left').style.top = `${flowerData.leftLeafHeight}%`;
      flower.querySelector('.leaf.left').style.animationDelay = `${delay + 1}s`;
    }
    if (flowerData.rightLeafHeight === null) {
      flower.querySelector('.leaf.right').style.display = 'none';
    } else {
      flower.querySelector('.leaf.right').style.top = `${flowerData.rightLeafHeight}%`;
      flower.querySelector('.leaf.right').style.animationDelay = `${delay + 1}s`;
    }
    flower.style.animationDelay = `${delay}s`;

    flower.querySelector('.pedals').style.top = `-${flowerData.innerPedalSize / 2 + flowerData.pedalSize}px`;
    flower.querySelector('.pedals').style.left = `${flowerData.outerPedalSize}px`;
    flower.querySelector('.pedals').style.height = `${flowerData.innerPedalSize}px`;
    flower.querySelector('.pedals').style.width = `${flowerData.innerPedalSize}px`;
    flower.querySelector('.pedals').style.backgroundColor = flowerData.innerPedalColor;
    flower.querySelector('.pedals').style.border = `${flowerData.pedalSize}px solid ${flowerData.pedalColor}`;
    flower.querySelector('.pedals').style.boxShadow = `0 0 0 ${flowerData.outerPedalSize}px ${flowerData.outerPedalColor}`;

    document.querySelector('.flowers').appendChild(flower);
  }
})();
