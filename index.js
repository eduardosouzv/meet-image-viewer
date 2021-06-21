;(() => {
  const getChatViewInterval = setInterval(chatObserver, 1000)

  function chatObserver() {
    const chatView = document.querySelector(
      'c-wiz > div > div > div:nth-child(9) > div:nth-child(3) > div:nth-child(4) > div > div:nth-child(2) > div > div:nth-child(2)'
    )

    if (chatView) {
      clearInterval(getChatViewInterval)
      startObserver(chatView)
    }
  }

  function startObserver(chatView) {
    const observer = new MutationObserver(handleChatMutation)
    observer.observe(chatView, { childList: true, subtree: true })
  }

  function handleChatMutation(mutations) {
    mutations.forEach((mutation) => {
      _safeArrayFromNodeList(mutation.addedNodes).forEach((addedNode) => {
        let allAddedElements = [addedNode]

        if (addedNode.children) {
          allAddedElements = [
            ...allAddedElements,
            flattenChildrenElements(addedNode),
          ]
        }
        allAddedElements = allAddedElements.flat()

        const addedMessages = allAddedElements.filter((addedElement) =>
          addedElement.hasAttribute('data-message-text')
        )

        addedMessages.forEach((messageNode) => {
          if (
            messageNode.textContent &&
            messageNode.textContent.startsWith('https')
          ) {
            replaceMessageContent(messageNode)
          }
        })
      })
    })

    function replaceMessageContent(messageNode) {
      messageNode.innerHTML = `<img src=${messageNode.textContent} width="250">`
    }

    function _safeArrayFromNodeList(nodeList) {
      if (nodeList) {
        return Array.from(nodeList)
      }

      return []
    }

    function flattenChildrenElements(parentNode) {
      return _safeArrayFromNodeList(parentNode.children).reduce(
        (allChildren, element) => {
          allChildren.push(element)

          if (element.children) {
            allChildren.push(...flattenChildrenElements(element))
          }

          return allChildren
        },
        []
      )
    }
  }
})()
