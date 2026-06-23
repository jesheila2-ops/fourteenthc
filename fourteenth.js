(function() {
  var cur = 0;
  var pages = ['p0','p1','p2','p3','p4','p5'];

  // Unlock
  document.getElementById('unlockBtn').addEventListener('click', function() {
    var password = document.getElementById('passwordInput').value;

    if (password === "the day u were born") {
      document.getElementById("bgMusic").play();
      document.getElementById('passwordPage').classList.remove('active');
      document.getElementById('p0').classList.add('active');
      document.querySelector('.page-dots').style.display = 'flex';
    } else {
      document.getElementById('passwordMessage').textContent = "Wrong password ❤️";
    }
  });

  function goTo(n) {
    document.getElementById(pages[cur]).classList.remove('active');
    document.querySelector('.dot[data-page="' + cur + '"]').classList.remove('active');
    cur = n;
    document.getElementById(pages[cur]).classList.add('active');
    document.querySelector('.dot[data-page="' + cur + '"]').classList.add('active');
  }

  // Navigation buttons
  document.getElementById('envBtn').addEventListener('click', function(){ goTo(1); });
  document.getElementById('annivNext').addEventListener('click', function(){ goTo(2); });
  document.getElementById('memoryBack').addEventListener('click', function(){ goTo(2); });
  document.getElementById('memoryNext').addEventListener('click', function(){ goTo(4); });
  document.getElementById('flowersBack').addEventListener('click', function(){ goTo(3); });
  document.getElementById('flowersNext').addEventListener('click', function(){ goTo(5); });
  document.getElementById('songBack').addEventListener('click', function(){ goTo(4); });

  document.querySelectorAll('.dot').forEach(function(d) {
    d.addEventListener('click', function() {
      goTo(parseInt(d.getAttribute('data-page')));
    });
  });

  // Petals
  var emojis = ['🌹','🌸','🌺','❤️','🩷'];
  var pc = document.getElementById('petals');

  for (var i = 0; i < 12; i++) {
    var p = document.createElement('div');
    p.className = 'petal';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = (Math.random() * 100) + 'vw';
    p.style.fontSize = (11 + Math.random() * 13) + 'px';
    p.style.animationDuration = (7 + Math.random() * 10) + 's';
    p.style.animationDelay = (Math.random() * 14) + 's';
    pc.appendChild(p);
  }

  // Floating hearts
  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💗";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (3 + Math.random() * 3) + "s";
    heart.style.fontSize = (12 + Math.random() * 20) + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 6000);
  }

  setInterval(createHeart, 400);

  // Single letter
  const letters = [
    {
      content: `<p><span class="dropcap-v2">H</span>appy birthday, baby. i know it's still a little early, but i wanted to make sure i got to give this to u. i remembered what u told me before, and i didn't want to risk missing the chance to greet u and give u something for your birthday.</p>

<p>before anything else, i hope u have a wonderful birthday. i hope today brings u happiness, peace, laughter, and the love of the people who care abt u. i hope this new year of your life becomes one of the best chapters yet.</p>

<p>i made this little website because i wanted to give u something more than just a simple greeting. i wanted to give u something that could hold a few memories, a few words, and a reminder that your birthday was never forgotten.</p>

<p>thank u for being part of my life. thank u for every conversation, every laugh, every memory, and every moment that made ordinary days feel special. thank u for the times u were patient with me. thank u for the times u made me smile without even realizing it. thank u for the times u stayed.</p>

<p>i know things haven't been easy lately, and i know i've made mistakes that hurt u. i'm truly sorry for those things. but today, i don't want this letter to be abt pain. i want it to be abt gratitude. because no matter what happens from here, i will always be grateful that i got to know u, care for u, and love u.</p>

<p>and if there's one thing i want u to know, it's that i still love u deeply. despite everything that's happened, despite the hurt, the misunderstandings, and the mistakes we've both made, my love for u never came from a place of conditions. that's why i don't carry anger in my heart toward u. i don't want to remember u with resentment. i don't want to hold on to bitterness.</p>

<p>instead, i choose to remember the person i loved and the memories we shared. if there are things that need forgiveness, then i forgive them. not because they didn't hurt, but because my love for u is greater than the pain i carry. and no matter where life takes us from here, a part of me will always be thankful that i got the chance to love someone like u.</p>

<p>u became a part of my life that i will never forget. and even though i don't know what the future holds, i sincerely hope life is kind to u. i hope u achieve your goals. i hope u find happiness. i hope u continue growing into the person u want to become. and i hope u never forget how special and valuable u are.</p>

<p>don't worry abt me. i know healing takes time, but somehow i'll get through this. for now, i just want u to enjoy your birthday.</p>

<p>happy birthday. i love u, and i always will. ❤️</p>`
    }
  ];

  let current = 0;
  const bodyEl      = document.getElementById('letter-body');
  const nextBtn     = document.getElementById('next-btn');
  const prevBtn     = document.getElementById('letterPrev');
  const indicator   = document.getElementById('page-indicator');
  const continueBtn = document.getElementById('letterContinue');
  const letterCard  = document.getElementById('letterCard');
  const bodyWrap    = document.querySelector('.letter-body-wrap-v2');

  // Prevent touch/wheel scroll inside the letter from bubbling to the page
  if (bodyWrap) {
    bodyWrap.addEventListener('wheel', function(e) {
      const atTop    = bodyWrap.scrollTop === 0;
      const atBottom = bodyWrap.scrollTop + bodyWrap.clientHeight >= bodyWrap.scrollHeight - 1;
      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) return;
      e.stopPropagation();
    }, { passive: true });

    bodyWrap.addEventListener('touchstart', function(e) {
      bodyWrap._touchStartY = e.touches[0].clientY;
    }, { passive: true });

    bodyWrap.addEventListener('touchmove', function(e) {
      const dy       = bodyWrap._touchStartY - e.touches[0].clientY;
      const atTop    = bodyWrap.scrollTop === 0;
      const atBottom = bodyWrap.scrollTop + bodyWrap.clientHeight >= bodyWrap.scrollHeight - 1;
      if ((dy < 0 && atTop) || (dy > 0 && atBottom)) return;
      e.stopPropagation();
    }, { passive: true });
  }

  function showLetter(idx) {
    letterCard.classList.add('flipping');

    setTimeout(() => {
      current = idx;
      bodyEl.innerHTML = letters[idx].content;
      // Single letter: hide nav controls, show continue
      indicator.style.display = 'none';
      nextBtn.style.display = 'none';
      prevBtn.style.display = 'none';
      continueBtn.style.display = '';

      // Reset scroll to top
      if (bodyWrap) bodyWrap.scrollTop = 0;

      letterCard.classList.remove('flipping');
    }, 260);
  }

  nextBtn.addEventListener('click', () => {
    if (current < letters.length - 1) showLetter(current + 1);
  });
  prevBtn.addEventListener('click', () => {
    if (current > 0) showLetter(current - 1);
  });

  showLetter(0);

  document.getElementById('letterContinue').addEventListener('click', function(){ goTo(3); });
  document.getElementById('letterBack').addEventListener('click', function(){ goTo(1); });

  // YouTube player with thumbnail fallback
  const SONG_VIDEO_ID = 'yq0ehdbBZow';
  const playerWrap = document.getElementById('songPlayerWrap');
  const songFallback = document.getElementById('songFallback');
  const songFallbackLink = document.getElementById('songFallbackLink');

  const showSongFallback = () => {
    playerWrap.style.display = 'none';
    songFallback.style.backgroundImage =
      `url(https://img.youtube.com/vi/${SONG_VIDEO_ID}/hqdefault.jpg)`;
    if (songFallbackLink)
      songFallbackLink.href = `https://www.youtube.com/watch?v=${SONG_VIDEO_ID}`;
    songFallback.hidden = false;
  };

  const ytTag = document.createElement('script');
  ytTag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(ytTag);

  window.onYouTubeIframeAPIReady = function () {
    new YT.Player('songPlayer', {
      width: '100%',
      height: '100',
      videoId: SONG_VIDEO_ID,
      playerVars: { rel: 0 },
      events: { onError: showSongFallback }
    });
  };

  setTimeout(() => {
    if (!window.YT || !window.YT.Player) showSongFallback();
  }, 4000);

  // Edit
  document.getElementById('editBtn').addEventListener('click', function() {
    document.getElementById('eEnvTitle').value = document.getElementById('envTitle').textContent;
    document.getElementById('eLetter').value = bodyEl.textContent;
    document.getElementById('eR1').value = document.getElementById('r1').textContent;
    document.getElementById('eR2').value = document.getElementById('r2').textContent;
    document.getElementById('eR3').value = document.getElementById('r3').textContent;
    document.getElementById('eR4').value = document.getElementById('r4').textContent;
    document.getElementById('eSongCaption').value = document.getElementById('songCaption').textContent;
    document.getElementById('editOverlay').classList.add('open');
  });

  document.getElementById('cancelEdit').addEventListener('click', function() {
    document.getElementById('editOverlay').classList.remove('open');
  });

  document.getElementById('saveEdit').addEventListener('click', function() {
    document.getElementById('envTitle').textContent =
      document.getElementById('eEnvTitle').value;

    letters[0].content =
      "<p>" + document.getElementById('eLetter').value + "</p>";

    showLetter(0);

    document.getElementById('r1').textContent = document.getElementById('eR1').value;
    document.getElementById('r2').textContent = document.getElementById('eR2').value;
    document.getElementById('r3').textContent = document.getElementById('eR3').value;
    document.getElementById('r4').textContent = document.getElementById('eR4').value;
    document.getElementById('songCaption').textContent =
      document.getElementById('eSongCaption').value;

    document.getElementById('editOverlay').classList.remove('open');
  });

})();