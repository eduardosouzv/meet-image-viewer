function startObserver() {
  let target = document.querySelector(
    'c-wiz > div > div > div:nth-child(9) > div:nth-child(3) > div:nth-child(4) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > span:nth-child(2) > div > div:nth-child(2)',
  );

  if (target) {
    clearInterval(tryGetChatElement);
    let observer = new MutationObserver(() => {
      let lastMessage = document.querySelector(
        'c-wiz > div > div > div:nth-child(9) > div:nth-child(3) > div:nth-child(4) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > span:nth-child(2) > div > div:nth-child(2) > div:last-child > div:nth-child(2) > div:last-child',
      );

      if (lastMessage.textContent.startsWith('https')) {
        lastMessage.innerHTML = `<img src=${lastMessage.textContent} width="250">`;
      }
    });

    let config = { childList: true, subtree: true };

    observer.observe(target, config);
  }
}

let tryGetChatElement = setInterval(startObserver, 1000);

console.log('by github.com/eduardosouzv');
